import React from 'react';
import { Student, LeaveRequest, Notice, AttendanceRecord } from '../types/index.ts';

interface DashboardProps {
  students: Student[];
  leaves: LeaveRequest[];
  notices: Notice[];
  attendance: AttendanceRecord[];
  onSelectTab: (tab: string) => void;
  onOpenAddStudent: () => void;
  onOpenAddNotice: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  students,
  leaves,
  notices,
  attendance,
  onSelectTab,
  onOpenAddStudent,
  onOpenAddNotice
}) => {
  const totalStudents = students.length;
  
  // Calculate attendance numbers for today
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date === todayStr);
  
  const presentCount = todayAttendance.length > 0
    ? todayAttendance.filter(a => a.status === 'present').length
    : Math.round(totalStudents * 0.92); // Simulated high attendance if not yet marked today

  const absentCount = todayAttendance.length > 0
    ? todayAttendance.filter(a => a.status === 'absent').length
    : totalStudents - presentCount;

  const pendingLeaves = leaves.filter(l => l.status === 'pending');
  const recentNotices = notices.slice(0, 3);

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1E5AA8] via-[#1A4F93] to-[#143F77] text-white p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute left-1/2 bottom-0 w-48 h-48 bg-[#F5C400]/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs text-[#F5C400] font-semibold mb-3 border border-white/10">
              <i className="lucide-shield-check"></i>
              <span>Official Management Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Darul Irshad School of Excellence
            </h2>
            <p className="text-blue-100 text-sm mt-1 max-w-xl">
              Internal Administration & Faculty Operations Hub. Track student progress, manage daily attendance, review leave applications, and publish announcements.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 self-start md:self-auto">
            <div className="text-center px-2">
              <div className="text-xs text-blue-200 uppercase tracking-wider font-medium">Academic Year</div>
              <div className="text-lg font-bold text-white">2026-2027</div>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="text-center px-2">
              <div className="text-xs text-blue-200 uppercase tracking-wider font-medium">Status</div>
              <div className="text-sm font-bold text-[#F5C400] flex items-center justify-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Active Term</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Students Card */}
        <div className="glass-card p-5 rounded-2xl transition hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Total Students
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white mt-1">
                {totalStudents}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-[#1E5AA8] dark:text-blue-400 flex items-center justify-center text-xl font-bold">
              <i className="lucide-users"></i>
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <i className="lucide-trending-up mr-1"></i>
            <span>Active Enrolled Students</span>
          </div>
        </div>

        {/* Present Today Card */}
        <div className="glass-card p-5 rounded-2xl transition hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Present Today
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                {presentCount}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xl font-bold">
              <i className="lucide-user-check"></i>
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
            {totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0}% Attendance Rate
          </div>
        </div>

        {/* Absent Today Card */}
        <div className="glass-card p-5 rounded-2xl transition hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Absent Today
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-rose-500 dark:text-rose-400 mt-1">
                {absentCount}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-xl font-bold">
              <i className="lucide-user-x"></i>
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
            Includes medical & sanctioned leaves
          </div>
        </div>

        {/* Pending Leave Requests Card */}
        <div
          onClick={() => onSelectTab('leave')}
          className="glass-card p-5 rounded-2xl transition hover:shadow-lg cursor-pointer border-amber-200/50 dark:border-amber-900/40"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Pending Leaves
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
                {pendingLeaves.length}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-xl font-bold">
              <i className="lucide-clock"></i>
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs text-amber-700 dark:text-amber-300 font-semibold">
            <span>Requires Review</span>
            <i className="lucide-arrow-right text-xs ml-1"></i>
          </div>
        </div>

      </div>

      {/* Quick Action Buttons Row */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
          <i className="lucide-zap text-[#F5C400]"></i>
          <span>Quick Actions</span>
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={onOpenAddStudent}
            className="flex items-center justify-center space-x-2 p-3.5 rounded-xl bg-gradient-to-r from-[#1E5AA8] to-[#2B6EC7] text-white font-medium text-xs sm:text-sm shadow-md hover:brightness-110 transition active:scale-95"
          >
            <i className="lucide-user-plus text-base"></i>
            <span>Add Student</span>
          </button>

          <button
            onClick={() => onSelectTab('attendance')}
            className="flex items-center justify-center space-x-2 p-3.5 rounded-xl bg-slate-800 dark:bg-slate-700 text-white font-medium text-xs sm:text-sm shadow-md hover:bg-slate-700 transition active:scale-95"
          >
            <i className="lucide-calendar-check text-base text-[#F5C400]"></i>
            <span>Mark Attendance</span>
          </button>

          <button
            onClick={onOpenAddNotice}
            className="flex items-center justify-center space-x-2 p-3.5 rounded-xl bg-amber-500 text-slate-900 font-bold text-xs sm:text-sm shadow-md hover:bg-amber-400 transition active:scale-95"
          >
            <i className="lucide-megaphone text-base"></i>
            <span>Post Notice</span>
          </button>

          <button
            onClick={() => onSelectTab('leave')}
            className="flex items-center justify-center space-x-2 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium text-xs sm:text-sm shadow-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition active:scale-95"
          >
            <i className="lucide-clipboard-list text-base text-[#1E5AA8]"></i>
            <span>Review Leaves</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Recent Notices & Attendance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Notices Board Widget */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                <i className="lucide-bell text-[#1E5AA8] dark:text-blue-400"></i>
                <span>Recent Circulars & Notices</span>
              </h3>
              <button
                onClick={() => onSelectTab('notices')}
                className="text-xs font-semibold text-[#1E5AA8] dark:text-blue-400 hover:underline flex items-center space-x-1"
              >
                <span>View All</span>
                <i className="lucide-chevron-right text-xs"></i>
              </button>
            </div>

            <div className="space-y-3">
              {recentNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-[#1E5AA8]/40 transition"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                      notice.priority === 'high'
                        ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                        : 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                    }`}>
                      {notice.category}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                      {notice.date}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                    {notice.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                    {notice.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Class Attendance Breakdown */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4 flex items-center space-x-2">
              <i className="lucide-bar-chart-3 text-emerald-500"></i>
              <span>Class Attendance Overview</span>
            </h3>

            <div className="space-y-4">
              {[
                { name: 'Class 10-A', present: 96, total: 30 },
                { name: 'Class 10-B', present: 90, total: 28 },
                { name: 'Class 9-A', present: 94, total: 32 },
                { name: 'Class 8-A', present: 88, total: 31 }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">{item.name}</span>
                    <span className="text-slate-500 dark:text-slate-400">{item.present}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#1E5AA8] to-emerald-500 rounded-full"
                      style={{ width: `${item.present}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
            <button
              onClick={() => onSelectTab('attendance')}
              className="w-full py-2 px-3 rounded-xl text-xs font-bold text-[#1E5AA8] dark:text-blue-400 bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 transition"
            >
              Generate Full Monthly Report
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
