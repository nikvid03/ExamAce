import React from 'react';

const WeaknessDetector = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
    <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl p-10 border border-white/20 shadow-xl">
      <h1 className="text-3xl font-bold text-pink-400 mb-4">Weakness Detector</h1>
      <p className="text-lg text-gray-200 mb-8">
        Machine learning identifies your weak areas and suggests targeted practice.
      </p>
      <div className="text-gray-400 text-center">
        <em>Feature coming soon: Personalized weakness analysis and recommendations!</em>
      </div>
    </div>
  </div>
);

export default WeaknessDetector; 