import { useState } from 'react';

// Controlled Component Pattern — har field React state se control hoti hai
const PaymentForm = ({ onPay, onChangeTime }) => {
  const [form, setForm] = useState({ fullName: '', billingAddress: '', cardNumber: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Write Name';
    if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card no should be 16-digit';
    if (!/^\d{2}\/\d{4}$/.test(form.expiry)) newErrors.expiry = 'MM/YYYY format';
    if (!/^\d{3,4}$/.test(form.cvv)) newErrors.cvv = 'Not a Valid CVV';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onPay(form);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-gray-900">Confirm Your Doctor Consultation</h3>
      <p className="text-xs text-gray-400">Enter your payment to schedule your Consultation</p>

      <p className="text-sm font-semibold text-gray-800 pt-2">Payment Information</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500">Full Name</label>
          <input value={form.fullName} onChange={update('fullName')} placeholder="Ahmed"
            className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-400" />
          {errors.fullName && <p className="text-[10px] text-red-500 mt-1">{errors.fullName}</p>}
        </div>
        <div>
          <label className="text-xs text-gray-500">Billing address</label>
          <input value={form.billingAddress} onChange={update('billingAddress')} placeholder="e.g. Apartment 3B, 2nd floor"
            className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-400" />
        </div>
        <div>
          <label className="text-xs text-gray-500">Card Number</label>
          <input value={form.cardNumber} onChange={update('cardNumber')} placeholder="Enter card number"
            className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-400" />
          {errors.cardNumber && <p className="text-[10px] text-red-500 mt-1">{errors.cardNumber}</p>}
        </div>
        <div>
          <label className="text-xs text-gray-500">Expiry Date</label>
          <input value={form.expiry} onChange={update('expiry')} placeholder="MM/YYYY"
            className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-400" />
          {errors.expiry && <p className="text-[10px] text-red-500 mt-1">{errors.expiry}</p>}
        </div>
        <div>
          <label className="text-xs text-gray-500">CVV</label>
          <input value={form.cvv} onChange={update('cvv')} placeholder="Enter CVV"
            className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-400" />
          {errors.cvv && <p className="text-[10px] text-red-500 mt-1">{errors.cvv}</p>}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onChangeTime} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg">
          Change Time
        </button>
        <button onClick={handleSubmit} className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg">
          Accept &amp; Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;