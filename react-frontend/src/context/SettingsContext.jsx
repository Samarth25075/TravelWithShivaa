import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [siteLogo, setSiteLogo] = useState('/logo.png');
    const [loading, setLoading] = useState(true);

    const getImageUrl = (image) => {
        if (!image) return '/logo.png';
        if (image.startsWith('http')) return image;
        if (image.startsWith('/')) return image;
        return `/api/uploads/${image}`;
    };

    const fetchSettings = async () => {
        try {
            const logoRes = await axios.get('settings/logo');
            if (logoRes.data && logoRes.data.logo_url) {
                setSiteLogo(getImageUrl(logoRes.data.logo_url));
            }
        } catch (err) {
            console.error('Error fetching settings:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    useEffect(() => {
        if (siteLogo) {
            const favicon = document.getElementById('favicon');
            if (favicon) {
                favicon.href = siteLogo;
            } else {
                // Fallback for older browsers or if ID is missing
                const link = document.querySelector("link[rel~='icon']");
                if (link) link.href = siteLogo;
            }
        }
    }, [siteLogo]);

    return (
        <SettingsContext.Provider value={{ siteLogo, refreshSettings: fetchSettings, loading, getImageUrl }}>
            {children}
        </SettingsContext.Provider>
    );
};
