import { Link } from 'react-router-dom';
import PublicNavbar from '../components/common/PublicNavbar';
import heroImage from '../components/assets/hero.png';

const Landing = () => (
  <div className="min-h-screen relative">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    />
    <div className="absolute inset-0 bg-black/10" />

    <div className="relative z-10">
      <PublicNavbar />

      <div className="px-6 md:px-12 mt-32 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          We make sensitive health topics simple, safe, and private
        </h1>
        <p className="text-white/90 text-sm md:text-base mt-4">
          HomaCare offers modern digital care for fertility, sexual health, and hormonal balance
          for both men and women. Private, trusted, and personalized care delivered to you.
        </p>
        <Link to="/signup" className="inline-block mt-6 bg-white hover:bg-gray-100 text-gray-900 text-sm font-semibold px-6 py-3 rounded-full">
          Get Start Today
        </Link>
      </div>
    </div>
  </div>
);

export default Landing;