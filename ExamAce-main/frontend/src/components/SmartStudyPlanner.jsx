import React from 'react';

const SmartStudyPlanner = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
    <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl p-10 border border-white/20 shadow-xl">
      <h1 className="text-3xl font-bold text-blue-400 mb-4">Smart Study Planner</h1>
      <p className="text-lg text-gray-200 mb-8">
        AI creates optimal study schedules based on your goals, current level, and available time.
      </p>
      <div className="text-gray-400 text-center">
        <em>Feature coming soon: Interactive AI-powered study planner!</em>
      </div>
    </div>
  </div>
);

export default SmartStudyPlanner; 