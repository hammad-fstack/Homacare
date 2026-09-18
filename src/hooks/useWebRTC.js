import { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

// STUN server — production mein TURN server bhi add karna hoga (paid ya self-hosted)
const ICE_SERVERS = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export const useWebRTC = (appointmentId, role) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [connected, setConnected] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const socketRef = useRef(null);
  const peerRef = useRef(null);

  const cleanup = useCallback(() => {
    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }
    if (localStream) {
      localStream.getTracks().forEach((t) => t.stop());
    }
    setLocalStream(null);
    setRemoteStream(null);
    setConnected(false);
  }, [localStream]);

  const createPeerConnection = useCallback((stream) => {
    const peer = new RTCPeerConnection(ICE_SERVERS);

    stream.getTracks().forEach((track) => peer.addTrack(track, stream));

    peer.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
      setConnected(true);
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit('ice-candidate', { appointmentId, candidate: event.candidate });
      }
    };

    return peer;
  }, [appointmentId]);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);

    const socket = io(SOCKET_URL, { withCredentials: true });
    socketRef.current = socket;

    socket.emit('join-consultation', { appointmentId, role });

    const peer = createPeerConnection(stream);
    peerRef.current = peer;

    // Doctor "offer" banata hai, patient "answer" deta hai (convention)
    const initiateOffer = async () => {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      socket.emit('offer', { appointmentId, offer });
    };

    if (role === 'doctor') {
      socket.on('patient-joined', initiateOffer);
    }

    socket.on('doctor-joined', () => {
      // patient side: doctor join hone par wait karta hai offer ka, kuch nahi karna
    });

    socket.on('offer', async ({ offer }) => {
      await peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      socket.emit('answer', { appointmentId, answer });
    });

    socket.on('answer', async ({ answer }) => {
      await peer.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on('ice-candidate', async ({ candidate }) => {
      try {
        await peer.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (err) {
        console.error('Error adding ICE candidate', err);
      }
    });

    socket.on('consultation-ended', () => {
      cleanup();
    });
  };

  const leaveCall = () => {
    if (socketRef.current) {
      socketRef.current.emit('leave-consultation', { appointmentId });
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    cleanup();
  };

  const toggleMic = () => {
    if (!localStream) return;
    localStream.getAudioTracks().forEach((t) => (t.enabled = !t.enabled));
    setMicOn((prev) => !prev);
  };

  const toggleCamera = () => {
    if (!localStream) return;
    localStream.getVideoTracks().forEach((t) => (t.enabled = !t.enabled));
    setCameraOn((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { localStream, remoteStream, connected, micOn, cameraOn, startCall, leaveCall, toggleMic, toggleCamera };
};