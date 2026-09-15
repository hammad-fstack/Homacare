import maleDoctorImg from '../components/assets/doctors/homacare.jpg';
import femaleDoctorImg from '../components/assets/doctors/homacar2.png';

const FEMALE_NAME_HINTS = ['sara', 'layla', 'ayesha', 'farha', 'zainab', 'mariam', 'hina', 'fatima', 'amina', 'emily'];

export const getDoctorAvatar = (doctor) => {
  if (doctor?.avatar) return doctor.avatar;
  const nameLower = (doctor?.name || '').toLowerCase();
  const isFemale = FEMALE_NAME_HINTS.some((hint) => nameLower.includes(hint));
  return isFemale ? femaleDoctorImg : maleDoctorImg;
};