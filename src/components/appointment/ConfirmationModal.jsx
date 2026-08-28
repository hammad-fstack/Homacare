import { CheckCircle } from 'lucide-react';

// Ye modal payment ke baad dikhega, doctor ka naam dynamically show karega
const ConfirmationModal = ({ doctorName, onOkay }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-emerald-500" />
      </div>
      <h3 className="font-bold text-gray-900 text-lg">Appointment Confirmed</h3>
      <p className="text-sm text-gray-500">
        Your consultation with <span className="font-semibold text-gray-800">{doctorName}</span> has been successfully booked.
      </p>
      <button
        onClick={onOkay}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-2.5 rounded-lg"
      >
        Okay
      </button>
    </div>
  </div>
);

export default ConfirmationModal;