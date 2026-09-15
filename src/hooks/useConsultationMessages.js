import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config/api';

// Simple polling-based chat — har 4 second mein naye messages check karta hai
export const useConsultationMessages = (appointmentId, myRole) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/messages/${appointmentId}`, { credentials: 'include' });
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [appointmentId]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 4000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    try {
      const res = await fetch(`${API_BASE_URL}/messages/${appointmentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, data.message]);
    } catch (err) {
      console.error(err);
    }
  };

  return { messages, loading, sendMessage, myRole };
};