import { useState } from 'react';
import { CreditCard } from 'lucide-react';

const PaymentForm = ({ onPay }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const validate = () => {
    const newErrors = {};
    const rawCardNumber = cardNumber.replace(/\s/g, '');

    if (!/^\d{16}$/.test(rawCardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!cardName.trim()) {
      newErrors.cardName = 'Please enter the card holder name';
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      newErrors.expiry = 'Enter expiry in MM/YY format';
    } else {
      const [mm, yy] = expiry.split('/').map(Number);
      const now = new Date();
      const currentYear = now.getFullYear() % 100;
      const currentMonth = now.getMonth() + 1;

      if (mm < 1 || mm > 12) {
        newErrors.expiry = 'Month must be between 01-12';
      } else if (yy < currentYear || (yy === currentYear && mm < currentMonth)) {
        newErrors.expiry = 'This card has expired';
      }
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onPay({ cardNumber, cardName, expiry, cvv });
  };

  return (
    <div className="space-y-4 max-w-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-10 h-10 rounded-lg bg-gray-800 text-white flex items-center justify-center">
          <CreditCard className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">Pay with Card</p>
          <p className="text-[10px] text-gray-400">Credit or Debit card payment</p>
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-500">Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          placeholder="1234 5678 9012 3456"
          className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-400"
        />
        {errors.cardNumber && <p className="text-[10px] text-red-500 mt-1">{errors.cardNumber}</p>}
      </div>

      <div>
        <label className="text-xs text-gray-500">Card Holder Name</label>
        <input
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="Ahmed Hassan"
          className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-400"
        />
        {errors.cardName && <p className="text-[10px] text-red-500 mt-1">{errors.cardName}</p>}
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="text-xs text-gray-500">Expiry Date</label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            placeholder="MM/YY"
            className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-400"
          />
          {errors.expiry && <p className="text-[10px] text-red-500 mt-1">{errors.expiry}</p>}
        </div>

        <div className="flex-1">
          <label className="text-xs text-gray-500">CVV</label>
          <input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
            placeholder="123"
            className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-400"
          />
          {errors.cvv && <p className="text-[10px] text-red-500 mt-1">{errors.cvv}</p>}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-2.5 rounded-lg"
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default PaymentForm;