import { useState, useEffect, useRef } from 'react';
import { PhoneOff, Phone } from 'lucide-react';
import DailyIframe from '@daily-co/daily-js';
import { useConsultationMessages } from '../../hooks/useConsultationMessages';
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
  const { callActive, roomUrl, startCall, endCall } = useCallSession(appointment.id);
  const videoContainerRef = useRef(null);
  const callFrameRef = useRef(null);

  useEffect(() => {
    if (callActive && roomUrl && videoContainerRef.current && !callFrameRef.current) {
      const frame = DailyIframe.createFrame(videoContainerRef.current, {
        iframeStyle: { width: '100%', height: '100%', border: '0', borderRadius: '16px' },
        showLeaveButton: false,
      });
      frame.join({ url: roomUrl });
      callFrameRef.current = frame;
    }
    if (!callActive && callFrameRef.current) {
      callFrameRef.current.destroy();
      callFrameRef.current = null;
    }
    return () => {
      if (callFrameRef.current) {
        callFrameRef.current.destroy();
        callFrameRef.current = null;
      }
    };
  }, [callActive, roomUrl]);

  const handleSend = () => {
    sendMessage(messageText);
    setMessageText('');
  };

  const handleLeaveCall = async () => {
    if (callFrameRef.current) callFrameRef.current.leave();
    await endCall();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 h-[calc(100vh-140px)]">
      <div className="relative bg-gray-300 rounded-2xl overflow-hidden flex flex-col items-center justify-center">
        {!callActive ? (
          <div className="text-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-gray-400 flex items-center justify-center text-white text-4xl font-semibold mx-auto">
              {patientInitial}
            </div>
            <p className="text-gray-700 text-sm font-medium">Ready to start your consultation?</p>
            <button
              onClick={startCall}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
            >
              <Phone className="w-4 h-4" /> Join Call
            </button>
          </div>
        ) : (
          <>
            <div ref={videoContainerRef} className="w-full h-full" />
            <button
              onClick={handleLeaveCall}
              className="absolute bottom-4 w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white"
            >
              <PhoneOff className="w-5 h-5" />
            </button>
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