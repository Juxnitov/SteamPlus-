"use client";
import { useState } from 'react';
import { apiFetch } from '../lib/apiClient';

export const useChargeCatalog = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const chargeCatalog = async () => {
        try {
            setLoading(true);
            setError(null);
            setData(null);

            const response = await apiFetch('/api/games/catalogo', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Error al cargar el catálogo');
            }

            const dataJson = await response.json();
            
            const games = dataJson.data || [];
            setData(games);
            return games; 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { chargeCatalog, loading, error, data };
};