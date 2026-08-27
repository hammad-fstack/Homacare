const AssignedSpecialist = ({ doctor }) => (
  <div className="rounded-2xl overflow-hidden relative h-full min-h-[420px]">
    <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover absolute inset-0" />
    <div className="absolute top-4 left-4 flex gap-2">
      <span className="text-[10px] bg-white/90 text-gray-700 px-2.5 py-1 rounded-full font-medium">
        {doctor.specialty}
      </span>
      <span className="text-[10px] bg-white/90 text-gray-700 px-2.5 py-1 rounded-full font-medium">
        {doctor.experience}
      </span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
      <h3 className="text-white font-bold text-lg">{doctor.name}</h3>
      <p className="text-white/80 text-xs mt-1 leading-relaxed">{doctor.bio}</p>
    </div>
  </div>
);

export default AssignedSpecialist;