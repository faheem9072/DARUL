import React, { useState } from 'react';
import { TimetableSlot } from '../types/index.ts';

interface TimetableModuleProps {
  timetableSlots: TimetableSlot[];
  classesList: string[];
}

export const TimetableModule: React.FC<TimetableModuleProps> = ({ timetableSlots, classesList }) => {
  const [viewType, setViewType] = useState<'class' | 'teacher'>('class');
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedTeacher, setSelectedTeacher] = useState('Prof. Rashid Ahmed');
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'>('Monday');

  const days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday')[] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const teachersList = Array.from(new Set(timetableSlots.map((t) => t.teacherName)));

  const filteredSlots = timetableSlots.filter((slot) => {
    const matchesDay = slot.day === selectedDay;
    if (viewType === 'class') {
      return matchesDay && slot.className === selectedClass;
    } else {
      return matchesDay && slot.teacherName === selectedTeacher;
    }
  });

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center space-x-2">
            <i className="lucide-clock text-[#1E5AA8] dark:text-blue-400"></i>
            <span>Academic Timetable Matrix</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            View period allocations, subject schedules, assigned faculty, and room locations.
          </p>
        </div>

        {/* View Toggle: Class-wise vs Teacher-wise */}
        <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setViewType('class')}
            className={`px-4 py-2 rounded-lg transition ${
              viewType === 'class'
                ? 'bg-[#1E5AA8] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Class Schedule
          </button>
          <button
            onClick={() => setViewType('teacher')}
            className={`px-4 py-2 rounded-lg transition ${
              viewType === 'teacher'
                ? 'bg-[#1E5AA8] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Teacher Schedule
          </button>
        </div>
      </div>

      {/* Control Bar & Day Tabs */}
      <div className="glass-card p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Selector Dropdown */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {viewType === 'class' ? (
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Select Class Grade</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-white focus:outline-none"
              >
                {classesList.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Select Teacher Faculty</label>
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-white focus:outline-none"
              >
                {teachersList.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Day Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedDay === day
                  ? 'bg-[#1E5AA8] text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

      </div>

      {/* Period Schedule Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7].map((periodNum) => {
          const slot = filteredSlots.find((s) => s.period === periodNum);
          return (
            <div
              key={periodNum}
              className={`glass-card p-5 rounded-2xl flex flex-col justify-between border-t-4 transition ${
                slot
                  ? 'border-t-[#1E5AA8] hover:shadow-lg'
                  : 'border-t-slate-300 dark:border-t-slate-700 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-extrabold text-slate-400 uppercase tracking-wider">
                    Period #{periodNum}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 font-semibold">
                    {slot ? `${slot.startTime} - ${slot.endTime}` : '45 Mins'}
                  </span>
                </div>

                {slot ? (
                  <>
                    <h3 className="text-base font-extrabold text-slate-800 dark:text-white mt-1">
                      {slot.subject}
                    </h3>
                    <div className="mt-2 text-xs space-y-1 text-slate-600 dark:text-slate-300 font-medium">
                      <div className="flex items-center space-x-1.5">
                        <i className="lucide-user text-xs text-[#1E5AA8]"></i>
                        <span>{slot.teacherName}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <i className="lucide-map-pin text-xs text-amber-500"></i>
                        <span>{slot.room} ({slot.className})</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-6 text-center text-xs text-slate-400 font-medium">
                    <i className="lucide-coffee text-xl block mb-1"></i>
                    Library / Self Study / Recess
                  </div>
                )}
              </div>

              {slot && (
                <div className="mt-4 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    Scheduled
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
