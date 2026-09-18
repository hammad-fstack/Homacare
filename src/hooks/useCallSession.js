import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config/api';

export const useCallSession = (appointmentId) => {
    const [callActive, setCallActive] = useState(false);

    const checkStatus = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/calls/${appointmentId}/status`, { credentials: 'include' });
            const data = await res.json();
            setCallActive(data.active || false);
        } catch (err) {
            console.error(err);
        }
    }, [appointmentId]);

    useEffect(() => {
        checkStatus();
        const interval = setInterval(checkStatus, 3000);
        return () => clearInterval(interval);
    }, [checkStatus]);

    const notifyCallStart = async () => {
        await fetch(`${API_BASE_URL}/calls/${appointmentId}/start`, { method: 'POST', credentials: 'include' });
        setCallActive(true);
    };

    const notifyCallEnd = async () => {
        await fetch(`${API_BASE_URL}/calls/${appointmentId}/end`, { method: 'POST', credentials: 'include' });
        setCallActive(false);
    };

    return { callActive, notifyCallStart, notifyCallEnd };
};