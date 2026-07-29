import React, { useState } from 'react';
import { LeaveRequest, Student } from '../types/index.ts';

interface LeaveManagementProps {
  leaves: LeaveRequest[];
  students: Student[];
  onSaveLeave: (leave: LeaveRequest) => void;
  role: 'admin' | 'teacher';
}

export const LeaveManagement: React.FC<LeaveManagementProps> = ({
  leaves,
  students,
  onSaveLeave,
  role
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [reviewingLeave, setReviewingLeave] = useState<LeaveRequest | null>(null);
  const [adminCommentInput, setAdminCommentInput] = useState('');

  // New leave form state
  const [newLeave, setNewLeave] = useState({
    studentId: students[0]?.id || '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    reason: '',
    attachmentName: ''
  });

  const filteredLeaves = leaves.filter((l) => filterStatus === 'all' || l.status === filterStatus);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find((s) => s.id === newLeave.studentId) || students[0];

    const appliedLeave: LeaveRequest = {
      id: `lv-${Date.now()}`,
      studentId: st ? st.id : 'st-101',
      studentName: st ? st.name : 'Student',
      class: st ? st.class : 'Class 10',
      section: st ? st.section : 'A',
      startDate: newLeave.startDate,
      endDate: newLeave.endDate,
      daysCount: 1,
      reason: newLeave.reason || 'Medical / Personal Reasons',
      attachmentName: newLeave.attachmentName || undefined,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };

    onSaveLeave(appliedLeave);
    setShowApplyModal(false);
  };

  const handleAction = (status: 'approved' | 'rejected') => {
    if (!reviewingLeave) return;
    const updated: LeaveRequest = {
      ...reviewingLeave,
      status,
      adminComment: adminCommentInput || (status === 'approved' ? 'Leave Approved by Admin' : 'Request Declined')
    };
    onSaveLeave(updated);
    setReviewingLeave(null);
    setAdminCommentInput('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center space-x-2">
            <i className="lucide-clipboard-list text-[#1E5AA8] dark:text-blue-400"></i>
            <span>Student Leave Management</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Submit leave applications, view medical attachments, and manage administrator approval workflows.
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="flex items-center justify-center space-x-2 bg-[#1E5AA8] hover:bg-[#143F77] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition active:scale-95 self-start sm:self-auto"
        >
          <i className="lucide-plus-circle text-base"></i>
          <span>Submit Leave Request</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="glass-card p-4 rounded-2xl flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Status Filter:</span>
          {(['all', 'pending', 'approved', 'rejected'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                filterStatus === st
                  ? 'bg-[#1E5AA8] text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-800 dark:text-white">{filteredLeaves.length}</span> Requests
        </div>
      </div>

      {/* Leave List Table */}
      <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/80 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                <th className="p-4">Student & Class</th>
                <th className="p-4">Leave Duration</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Attachment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-700/60 text-xs sm:text-sm">
              {filteredLeaves.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 dark:text-slate-400">
                    No leave requests found in this view.
                  </td>
                </tr>
              ) : (
                filteredLeaves.map((lv) => (
                  <tr key={lv.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    <td className="p-4">
                      <div className="font-bold text-slate-800 dark:text-white">{lv.studentName}</div>
                      <div className="text-xs text-slate-400 font-medium">{lv.class} - {lv.section}</div>
                    </td>

                    <td className="p-4">
                      <div className="font-medium text-slate-700 dark:text-slate-200">
                        {lv.startDate} {lv.startDate !== lv.endDate && `to ${lv.endDate}`}
                      </div>
                      <span className="text-[11px] text-slate-400">Applied: {lv.appliedDate}</span>
                    </td>

                    <td className="p-4 max-w-xs truncate text-slate-600 dark:text-slate-300">
                      {lv.reason}
                    </td>

                    <td className="p-4">
                      {lv.attachmentName ? (
                        <span className="inline-flex items-center space-x-1 text-xs text-[#1E5AA8] dark:text-blue-400 font-semibold bg-blue-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
                          <i className="lucide-paperclip text-xs"></i>
                          <span className="truncate max-w-[100px]">{lv.attachmentName}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">None</span>
                      )}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          lv.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : lv.status === 'rejected'
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}
                      >
                        {lv.status}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => setReviewingLeave(lv)}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-[#1E5AA8] hover:text-white dark:hover:bg-[#1E5AA8] text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition"
                      >
                        {role === 'admin' ? 'Review Application' : 'View Details'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="glass-modal w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Submit Leave Request</h3>
              <button
                onClick={() => setShowApplyModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <i className="lucide-x text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Select Student
                </label>
                <select
                  value={newLeave.studentId}
                  onChange={(e) => setNewLeave({ ...newLeave, studentId: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E5AA8]"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.class}-{s.section})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={newLeave.startDate}
                    onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={newLeave.endDate}
                    onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Reason for Leave</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Medical reason, family emergency, etc."
                  value={newLeave.reason}
                  onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 text-slate-800 dark:text-white"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Attachment (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. medical_certificate.pdf"
                  value={newLeave.attachmentName}
                  onChange={(e) => setNewLeave({ ...newLeave, attachmentName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 text-slate-800 dark:text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1E5AA8] text-white font-bold shadow-md"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review / Admin Action Modal */}
      {reviewingLeave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="glass-modal w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Leave Application Details</h3>
              <button
                onClick={() => setReviewingLeave(null)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <i className="lucide-x text-lg"></i>
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <span className="text-slate-400 block font-medium">Student Name & Class</span>
                <span className="font-bold text-slate-800 dark:text-white text-base">
                  {reviewingLeave.studentName} ({reviewingLeave.class})
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <span className="text-slate-400 block font-medium">Leave Reason</span>
                <p className="font-medium text-slate-700 dark:text-slate-200 mt-1">{reviewingLeave.reason}</p>
              </div>

              {reviewingLeave.adminComment && (
                <div className="p-3 bg-blue-50 dark:bg-slate-800/80 rounded-xl border border-blue-200 dark:border-slate-700">
                  <span className="text-[#1E5AA8] dark:text-blue-400 block font-bold">Admin Remark:</span>
                  <p className="text-slate-700 dark:text-slate-300 mt-1">{reviewingLeave.adminComment}</p>
                </div>
              )}

              {role === 'admin' && reviewingLeave.status === 'pending' && (
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Add Administrator Remark
                  </label>
                  <input
                    type="text"
                    placeholder="Approval or refusal note..."
                    value={adminCommentInput}
                    onChange={(e) => setAdminCommentInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-700">
              {role === 'admin' && reviewingLeave.status === 'pending' ? (
                <>
                  <button
                    onClick={() => handleAction('rejected')}
                    className="px-4 py-2 bg-rose-500 text-white font-bold text-xs rounded-xl hover:bg-rose-600 transition"
                  >
                    Reject Application
                  </button>
                  <button
                    onClick={() => handleAction('approved')}
                    className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition"
                  >
                    Approve Application
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setReviewingLeave(null)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs rounded-xl"
                >
                  Close Window
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
