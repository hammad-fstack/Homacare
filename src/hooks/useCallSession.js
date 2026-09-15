import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config/api';

export const useCallSession = (appointmentId) => {
    const [callActive, setCallActive] = useState(false);
    const [roomUrl, setRoomUrl] = useState(null);

    const checkStatus = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/calls/${appointmentId}/status`, { credentials: 'include' });
            const data = await res.json();
            setCallActive(data.active || false);
            setRoomUrl(data.roomUrl || null);
        } catch (err) {
            console.error(err);
        }
    }, [appointmentId]);

    useEffect(() => {
        checkStatus();
        const interval = setInterval(checkStatus, 3000);
        return () => clearInterval(interval);
    }, [checkStatus]);

    const startCall = async () => {
        const res = await fetch(`${API_BASE_URL}/calls/${appointmentId}/start`, { method: 'POST', credentials: 'include' });
        const data = await res.json();
        setRoomUrl(data.roomUrl);
        setCallActive(true);
        return data.roomUrl;
    };

    const endCall = async () => {
        await fetch(`${API_BASE_URL}/calls/${appointmentId}/end`, { method: 'POST', credentials: 'include' });
        setCallActive(false);
    };

    return { callActive, roomUrl, startCall, endCall };
};