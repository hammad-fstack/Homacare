import { useState, useEffect, useRef } from 'react';
import { PhoneOff, Phone, Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { useConsultationMessages } from '../../hooks/useConsultationMessages';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useCallSession } from '../../hooks/useCallSession';

const ROLE_TABS = {
  doctor: ['Messages', 'Notes', 'Prescriptions', 'Lab Order'],
  patient: ['Messages', 'Prescriptions', 'Lab Order'],
};

const ConsultationRoom = ({ appointment, role, patientInitial }) => {
  const tabs = ROLE_TABS[role] || ROLE_TABS.patient;
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { messages, sendMessage } = useConsultationMessages(appointment.id, role);
  const [messageText, setMessageText] = useState('');

  const {
    localStream, remoteStream, connected, micOn, cameraOn,
    startCall, leaveCall, toggleMic, toggleCamera,
  } = useWebRTC(appointment.id, role);

  const { notifyCallStart, notifyCallEnd } = useCallSession(appointment.id);

  const [callStarted, setCallStarted] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const handleSend = () => {
    sendMessage(messageText);
    setMessageText('');
  };

  const handleStart = async () => {
    setCallStarted(true);
    await startCall();
    await notifyCallStart();
  };

  const handleLeave = () => {
    leaveCall();
    notifyCallEnd();
    setCallStarted(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 h-[calc(100vh-140px)]">
      <div className="relative bg-gray-300 rounded-2xl overflow-hidden flex flex-col items-center justify-center">
        {!callStarted ? (
          <div className="text-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-gray-400 flex items-center justify-center text-white text-4xl font-semibold mx-auto">
              {patientInitial}
            </div>
            <p className="text-gray-700 text-sm font-medium">Ready to start your consultation?</p>
            <button
              onClick={handleStart}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
            >
              <Phone className="w-4 h-4" /> Join Call
            </button>
          </div>
        ) : (
          <>
            {/* Remote video — poori jagah fill karta hai */}
            {remoteStream ? (
              <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-400 flex items-center justify-center text-white text-4xl font-semibold mx-auto">
                  {patientInitial}
                </div>
                <p className="text-white/90 text-sm font-medium mt-4">
                  Please wait, while your {role === 'doctor' ? 'patient' : 'doctor'} is joining...
                </p>
              </div>
            )}

            {/* Local video — chhota preview corner mein */}
            <div className="absolute bottom-24 right-4 w-32 h-24 rounded-xl overflow-hidden border-2 border-white bg-gray-500">
              <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              <div className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">You</div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 bg-black/40 rounded-full px-3 py-2 flex items-center gap-2">
              <button onClick={toggleMic} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white">
                {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>
              <button onClick={toggleCamera} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white">
                {cameraOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>
              <button onClick={handleLeave} className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white">
                <PhoneOff className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 flex flex-col overflow-hidden relative">
        <div className="flex border-b border-gray-100 px-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium px-3 py-3 ${activeTab === tab ? 'text-emerald-600 border-b-2 border-emerald-500' : 'text-gray-400'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'Messages' && (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender_role === role ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${m.sender_role === role ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      {m.message}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 border-t border-gray-100 pt-3 mt-3">
                <input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message"
                  className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 outline-none"
                />
                <button onClick={handleSend} className="text-emerald-600 font-medium text-sm">Send</button>
              </div>
            </div>
          )}

          {activeTab === 'Notes' && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="font-bold text-gray-900">No SOAP Note</p>
              <p className="text-xs text-gray-400 mt-1 mb-4">Create a SOAP note to document this consultation.</p>
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg">Create SOAP Note</button>
            </div>
          )}

          {activeTab === 'Prescriptions' && (
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Prescriptions</h3>
              <p className="text-center text-xs text-gray-400 py-10">No prescriptions found</p>
            </div>
          )}

          {activeTab === 'Lab Order' && (
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Lab Orders</h3>
              <p className="text-center text-xs text-gray-400 py-10">No lab orders yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationRoom;