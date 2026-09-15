import { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

// Reusable Toast — kahin bhi (schedule save, profile update, waghera) success message dikhane ke liye
const Toast = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-6 right-6 z-[100] bg-white border border-gray-100 rounded-xl shadow-lg px-5 py-4 flex items-center gap-3 min-w-[280px] animate-[slideIn_0.3s_ease-out]">
      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="w-4 h-4 text-white" />
      </div>
      <p className="text-sm font-medium text-gray-800 flex-1">{message}</p>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X className="w-4 h-4" />
      </button>
      <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 rounded-b-xl animate-[shrink_3s_linear]" />
    </div>
  );
};

export default Toast;