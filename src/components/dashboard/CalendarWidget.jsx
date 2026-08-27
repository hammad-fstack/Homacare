const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const generateCalendarGrid = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const grid = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    grid.push({ date: daysInPrevMonth - i, currentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    grid.push({ date: d, currentMonth: true });
  }
  while (grid.length % 7 !== 0) {
    grid.push({ date: grid.length - daysInMonth - firstDay + 1, currentMonth: false });
  }

  return grid;
};

const CalendarWidget = ({ year = 2025, month = 8, monthLabel = 'September 2025', selectedDate = 12 }) => {
  const grid = generateCalendarGrid(year, month);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-gray-800 text-sm">{monthLabel}</h4>
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <button className="hover:text-gray-600">&lt;</button>
          <button className="hover:text-gray-600">&gt;</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-gray-400 font-medium">
        {DAYS.map((d, i) => <span key={i}>{d}</span>)}
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center text-xs text-gray-700">
        {grid.map((cell, i) => (
          <span
            key={i}
            className={`py-1 ${!cell.currentMonth ? 'text-gray-300' : ''} ${
              cell.currentMonth && cell.date === selectedDate
                ? 'bg-emerald-500 text-white rounded-full font-bold w-6 h-6 flex items-center justify-center mx-auto'
                : ''
            }`}
          >
            {String(cell.date).padStart(2, '0')}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;