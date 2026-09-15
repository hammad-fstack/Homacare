import { AlertTriangle } from 'lucide-react';

const FieldTooltipError = ({ message }) => {
  if (!message) return null;

  return (
    <div className="absolute top-full left-0 mt-1.5 z-20 w-max max-w-xs">
      <div className="absolute -top-1.5 left-4 w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45" />
      <div className="relative bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 flex items-center gap-2">
        <div className="w-4 h-4 rounded-sm bg-amber-500 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-2.5 h-2.5 text-white" fill="white" />
        </div>
        <p className="text-xs text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default FieldTooltipError;