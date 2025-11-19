// c:\Users\juxni\Documents\u\frameworks\parcial\src\hooks\useChargeCatalog.js
"use client";
import { useState, useCallback } from 'react'; // Importa useCallback
import { apiFetch } from '../lib/apiClient';

export const useChargeCatalog = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    // Envuelve la función en useCallback
    const chargeCatalog = useCallback(async () => {
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
    }, []); // Array de dependencias vacío para que la función no se vuelva a crear

    return { chargeCatalog, loading, error, data };
};