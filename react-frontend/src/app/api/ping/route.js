/**
 * TravelBookShiva — Backend Health Ping Endpoint
 * 
 * Route: GET /api/ping
 * 
 * Returns a simple JSON health check so external services
 * (cron-job.org, UptimeRobot, etc.) can ping this URL to keep
 * the Render free-tier backend warm and alive.
 * 
 * You can point any free cron service to:
 *   https://travelbookshiva.in/api/ping
 * set to run every 20 minutes.
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';     // never cache this route
export const revalidate = 0;

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, '')
    : 'https://travelwithshivaa.onrender.com';

  let backendStatus = 'unknown';
  let backendResponseMs = null;

  try {
    const start = Date.now();
    const res = await fetch(`${backendUrl}/`, {
      method: 'GET',
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),   // 10s timeout
    });
    backendResponseMs = Date.now() - start;
    backendStatus = res.ok ? 'alive' : `http_${res.status}`;
  } catch (err) {
    backendStatus = `error: ${err.message || 'unreachable'}`;
  }

  return NextResponse.json({
    status: 'ok',
    service: 'TravelBookShiva',
    timestamp: new Date().toISOString(),
    backend: {
      url: backendUrl,
      status: backendStatus,
      responseMs: backendResponseMs,
    },
  });
}
