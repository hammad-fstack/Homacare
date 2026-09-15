// Strategy Pattern (config-driven) — role ke against redirect path ka
// lookup table. Naya role add karna ho to sirf yahan entry add karo,
// kahin bhi if/else likhne ki zaroorat nahi.
export const ROLE_REDIRECTS = {
  patient: '/dashboard',
  doctor: '/doctor/dashboard',
  admin: '/admin/dashboard',
};

export const getRedirectForRole = (role) => ROLE_REDIRECTS[role] || '/signin';