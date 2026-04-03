import { motion } from 'framer-motion';

const About = () => {
  return (
    <main>
      <section style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '120px 0 80px' }}>
        <div className="container">
          <h1 style={{ fontSize: '56px', fontWeight: 800, marginBottom: '20px' }}>About <span style={{ color: 'var(--primary)' }}>Shiv Travel</span></h1>
          <p style={{ fontSize: '20px', opacity: 0.8 }}>Crafting unforgettable experiences since 2010.</p>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 0 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
            <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '30px' }}>Our Mission</h2>
            <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '20px' }}>
              At Shiv Travel, our mission is simple: to inspire wanderlust and facilitate the discovery of the world's most beautiful corners. We believe that travel is more than just visiting a place; it's about the stories, the people, and the memories you create along the way.
            </p>
            <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              From luxury escapes to rugged adventures, we curate each package with meticulous attention to detail, ensuring that every traveler experiences the best of their chosen destination.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}>
            <img src="/uploads/about-image.png" alt="Travel team" style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow)' }} />
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;
