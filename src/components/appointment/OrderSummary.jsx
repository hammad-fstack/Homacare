const TAX_RATE = 0.15;

const OrderSummary = ({ service, onConfirm }) => {
  const subtotal = service.price;
  const tax = +(subtotal * TAX_RATE).toFixed(1);
  const total = +(subtotal + tax).toFixed(1);

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-gray-900">Order Summary</h3>

      <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <span className="text-sm text-gray-800">{service.title}</span>
        </div>
        <span className="text-sm font-semibold text-emerald-600">SAR {service.price}</span>
      </div>

      <div className="space-y-1 text-sm text-gray-600 border-t border-gray-100 pt-3">
        <div className="flex justify-between"><span>Subtotal</span><span>SAR {subtotal}</span></div>
        <div className="flex justify-between"><span>Tax</span><span>SAR {tax}</span></div>
        <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
          <span>Total</span><span>SAR {total}</span>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-3 rounded-lg"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default OrderSummary;