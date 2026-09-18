import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config/api';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications/my`, { credentials: 'include' });
      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const markAsRead = async (id) => {
    await fetch(`${API_BASE_URL}/notifications/${id}/read`, { method: 'PATCH', credentials: 'include' });
    fetchNotifications();
  };

  const markAllAsRead = async () => {
    await fetch(`${API_BASE_URL}/notifications/read-all`, { method: 'PATCH', credentials: 'include' });
    fetchNotifications();
  };

  return { notifications, unreadCount, loading, markAsRead, markAllAsRead };
};