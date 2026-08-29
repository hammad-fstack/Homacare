const DoctorGridCard = ({ doctor, isSelected, onSelect }) => (
  <div
    className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition bg-gray-100 ${
      isSelected ? 'border-emerald-500' : 'border-transparent'
    }`}
    onClick={() => onSelect(doctor.id)}
  >
    <img
      src={doctor.avatar}
      alt={doctor.name}
      className="w-full h-32 object-cover"
      style={{ objectPosition: 'center 20%' }}
    />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
      <p className="text-white text-xs font-semibold leading-tight">{doctor.name}</p>
      <p className="text-white/70 text-[10px]">{doctor.specialty}</p>
    </div>

    {isSelected ? (
      <div className="absolute bottom-0 left-0 right-0 bg-emerald-500 text-white text-[10px] font-medium text-center py-1.5">
        Selected
      </div>
    ) : (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect(doctor.id);
        }}
        className="absolute bottom-0 left-0 right-0 bg-white/90 hover:bg-white text-gray-800 text-[10px] font-medium text-center py-1.5"
      >
        Select Doctor
      </button>
    )}
  </div>
);

export default DoctorGridCard;