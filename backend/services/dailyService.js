const DAILY_API_KEY = process.env.DAILY_API_KEY;
const DAILY_BASE = 'https://api.daily.co/v1';

const createRoom = async (roomName) => {
  const res = await fetch(`${DAILY_BASE}/rooms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DAILY_API_KEY}`,
    },
    body: JSON.stringify({
      name: roomName,
      properties: {
        enable_chat: false,
        eject_at_room_exp: true,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 3,
      },
    }),
  });

  if (res.status === 400) {
    const existing = await fetch(`${DAILY_BASE}/rooms/${roomName}`, {
      headers: { Authorization: `Bearer ${DAILY_API_KEY}` },
    });
    if (existing.ok) return existing.json();
  }

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Daily room creation failed: ${errText}`);
  }
  return res.json();
};

module.exports = { createRoom };