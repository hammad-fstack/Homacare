const { Server } = require('socket.io');

let io;

const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: ['http://localhost:5173', 'http://localhost:5174', ' http://localhost:5175'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('Socket connected:', socket.id);

        // appointmentId ko "room" ki tarah use karte hain — dono (doctor+patient) isi room mein join hote hain
        socket.on('join-consultation', ({ appointmentId, role }) => {
            socket.join(appointmentId);
            socket.data.appointmentId = appointmentId;
            socket.data.role = role;

            // Doosre participant ko batao ke ye banda join hua
            socket.to(appointmentId).emit(role === 'doctor' ? 'doctor-joined' : 'patient-joined');
        });

        // WebRTC offer/answer/ice-candidate — sirf signaling, actual audio/video WebRTC khud handle karta hai
        socket.on('offer', ({ appointmentId, offer }) => {
            socket.to(appointmentId).emit('offer', { offer });
        });

        socket.on('answer', ({ appointmentId, answer }) => {
            socket.to(appointmentId).emit('answer', { answer });
        });

        socket.on('ice-candidate', ({ appointmentId, candidate }) => {
            socket.to(appointmentId).emit('ice-candidate', { candidate });
        });

        socket.on('leave-consultation', ({ appointmentId }) => {
            socket.to(appointmentId).emit('consultation-ended');
            socket.leave(appointmentId);
        });

        socket.on('disconnect', () => {
            const { appointmentId } = socket.data;
            if (appointmentId) {
                socket.to(appointmentId).emit('consultation-ended');
            }
            console.log('Socket disconnected:', socket.id);
        });
    });

    return io;
};

module.exports = { initSocket };