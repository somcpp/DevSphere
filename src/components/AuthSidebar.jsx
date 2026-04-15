import React from 'react';
import backgroundImage from '../assets/onboarding-bg.png';

const AuthSidebar = () => {
  return (
    <div
      className="relative hidden lg:flex flex-[1.2] flex-col justify-center p-16 bg-cover bg-center text-white overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/70 to-blue-800/60 z-0"></div>

      <div className="relative z-10 space-y-8 max-w-xl">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-200">The Collaborative Nexus</p>
        <h1 className="text-6xl font-extrabold leading-[1.1]">
          Build your <span className="text-blue-100">network</span> before you graduate.
        </h1>
        <p className="text-blue-100 text-lg leading-relaxed">
          Connect with like-minded students, find co-founders, collaborate on projects, and launch your ideas.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 mt-12">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition">
            <p className="text-5xl font-black text-blue-200">2.4k+</p>
            <p className="text-xs font-bold uppercase mt-2 text-white/60 tracking-widest">Active Projects</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition">
            <p className="text-5xl font-black text-blue-200">150+</p>
            <p className="text-xs font-bold uppercase mt-2 text-white/60 tracking-widest">Partner Hubs</p>
          </div>
        </div>

        {/* Features */}
        <div className="pt-8 space-y-3 italic text-blue-100">
          <p>✨ Find your perfect co-founder match</p>
          <p>🚀 Collaborate on exciting projects</p>
          <p>🤝 Build lasting professional relationships</p>
        </div>
      </div>
    </div>
  );
};

export default AuthSidebar;