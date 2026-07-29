import React, { useState } from 'react';
import { Notice, NoticePriority, NoticeTarget } from '../types/index.ts';

interface NoticeBoardProps {
  notices: Notice[];
  onSaveNotice: (notice: Notice) => void;
  onDeleteNotice: (id: string) => void;
  role: 'admin' | 'teacher';
  isAddModalOpen: boolean;
  onCloseAddModal: () => void;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({
  notices,
  onSaveNotice,
  onDeleteNotice,
  role,
  isAddModalOpen,
  onCloseAddModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);

  const [formData, setFormData] = useState<Partial<Notice>>({
    title: '',
    content: '',
    category: 'Academic',
    targetRole: 'all',
    priority: 'medium',
    isPinned: false
  });

  const categories = ['All', 'Academic', 'Administrative', 'Event', 'Exam', 'Emergency'];

  const filteredNotices = notices.filter(
    (n) => selectedCategory === 'All' || n.category === selectedCategory
  );

  const openNewNoticeForm = () => {
    setEditingNotice(null);
    setFormData({
      title: '',
      content: '',
      category: 'Academic',
      targetRole: 'all',
      priority: 'medium',
      isPinned: false
    });
    setShowModal(true);
  };

  const openEditNoticeForm = (n: Notice) => {
    setEditingNotice(n);
    setFormData({ ...n });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    const noticeToSave: Notice = {
      id: editingNotice ? editingNotice.id : `nt-${Date.now()}`,
      title: formData.title,
      content: formData.content,
      category: (formData.category as Notice['category']) || 'Academic',
      targetRole: (formData.targetRole as NoticeTarget) || 'all',
      author: role === 'admin' ? 'Principal Office' : 'Faculty Member',
      date: editingNotice ? editingNotice.date : new Date().toISOString().split('T')[0],
      priority: (formData.priority as NoticePriority) || 'medium',
      isPinned: !!formData.isPinned
    };

    onSaveNotice(noticeToSave);
    setShowModal(false);
    onCloseAddModal();
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center space-x-2">
            <i className="lucide-megaphone text-[#1E5AA8] dark:text-blue-400"></i>
            <span>Notice Board & Announcements</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Official school circulars, academic notifications, exam timetables, and administrative news.
          </p>
        </div>

        {role === 'admin' && (
          <button
            onClick={openNewNoticeForm}
            className="flex items-center justify-center space-x-2 bg-[#1E5AA8] hover:bg-[#143F77] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition active:scale-95 self-start sm:self-auto"
          >
            <i className="lucide-plus-circle text-base"></i>
            <span>Post New Circular</span>
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="glass-card p-4 rounded-2xl flex items-center space-x-2 overflow-x-auto">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
          Category Filter:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#1E5AA8] text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notice Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotices.length === 0 ? (
          <div className="col-span-full glass-card p-12 text-center text-slate-500 dark:text-slate-400 rounded-2xl">
            <i className="lucide-bell-off text-4xl mb-3 block"></i>
            <p className="font-semibold text-sm">No notices available under category "{selectedCategory}".</p>
          </div>
        ) : (
          filteredNotices.map((nt) => (
            <div
              key={nt.id}
              className={`glass-card p-5 rounded-2xl flex flex-col justify-between transition hover:shadow-lg relative border-l-4 ${
                nt.priority === 'high'
                  ? 'border-l-rose-500'
                  : nt.priority === 'medium'
                  ? 'border-l-[#1E5AA8]'
                  : 'border-l-amber-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {nt.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{nt.date}</span>
                </div>

                <h3 className="text-base font-bold text-slate-800 dark:text-white leading-snug mb-2">
                  {nt.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {nt.content}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400">
                  <i className="lucide-user text-xs"></i>
                  <span className="font-medium">{nt.author}</span>
                </div>

                {role === 'admin' && (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => openEditNoticeForm(nt)}
                      className="p-1 rounded text-slate-500 hover:text-[#1E5AA8]"
                      title="Edit Notice"
                    >
                      <i className="lucide-edit-3 text-sm"></i>
                    </button>
                    <button
                      onClick={() => onDeleteNotice(nt.id)}
                      className="p-1 rounded text-rose-500 hover:text-rose-700"
                      title="Delete Notice"
                    >
                      <i className="lucide-trash-2 text-sm"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Notice Modal */}
      {(showModal || isAddModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="glass-modal w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {editingNotice ? 'Edit Circular / Notice' : 'Post New Notice'}
              </h3>
              <button
                onClick={() => { setShowModal(false); onCloseAddModal(); }}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <i className="lucide-x text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mid-Term Examination Schedule"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={formData.category || 'Academic'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Notice['category'] })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 text-slate-800 dark:text-white"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Administrative">Administrative</option>
                    <option value="Event">Event</option>
                    <option value="Exam">Exam</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                  <select
                    value={formData.priority || 'medium'}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as NoticePriority })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 text-slate-800 dark:text-white"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Normal Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Notice Content *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detailed announcement text..."
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 text-slate-800 dark:text-white"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); onCloseAddModal(); }}
                  className="px-4 py-2 text-slate-600 dark:text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1E5AA8] text-white font-bold rounded-xl shadow-md"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
