import { getDoctorAvatar } from '../../utils/doctorAvatarFallback';

const AssignedSpecialist = ({ doctor }) => (
  <div className="rounded-2xl overflow-hidden relative h-[560px] bg-gray-100">
    <img
      src={getDoctorAvatar(doctor)}
      alt={doctor.name}
      className="w-full h-full object-cover absolute inset-0"
      style={{ objectPosition: 'center 20%' }}
    />
    <div className="absolute top-5 left-5 flex gap-2">
      <span className="text-xs bg-white/95 text-gray-700 px-3 py-1.5 rounded-full font-medium">
        {doctor.specialty}
      </span>
      <span className="text-xs bg-white/95 text-gray-700 px-3 py-1.5 rounded-full font-medium">
        {doctor.experience}
      </span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6">
      <h3 className="text-white font-bold text-xl mb-1.5">{doctor.name}</h3>
      <p className="text-white/85 text-sm leading-relaxed">{doctor.bio}</p>
    </div>
  </div>
);

export default AssignedSpecialist;