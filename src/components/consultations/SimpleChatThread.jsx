import { useState } from 'react';
import { useConsultationMessages } from '../../hooks/useConsultationMessages';

const SimpleChatThread = ({ appointment, role, otherPartyName }) => {
  const { messages, sendMessage } = useConsultationMessages(appointment.id, role);
  const [text, setText] = useState('');

  const handleSend = () => {
    sendMessage(text);
    setText('');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full p-5">
      <h3 className="font-bold text-gray-900 mb-3">{otherPartyName}</h3>
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender_role === role ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${m.sender_role === role ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
              {m.message}
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-xs text-gray-400 text-center py-10">No messages yet</p>}
      </div>
      <div className="flex items-center gap-2 border-t border-gray-100 pt-3 mt-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message"
          className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 outline-none"
        />
        <button onClick={handleSend} className="text-emerald-600 font-medium text-sm">Send</button>
      </div>
    </div>
  );
};

export default SimpleChatThread;