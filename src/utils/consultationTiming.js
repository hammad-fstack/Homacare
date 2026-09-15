export const isJoinable = (appointment) => {
    if (appointment.status !== 'scheduled') return false;
    const start = new Date(`${appointment.appointment_date.split('T')[0]}T${appointment.start_time}`);
    const end = new Date(`${appointment.appointment_date.split('T')[0]}T${appointment.end_time}`);
    const now = new Date();
    const joinWindowStart = new Date(start.getTime() - 10 * 60000);
    return now >= joinWindowStart && now <= end;
};