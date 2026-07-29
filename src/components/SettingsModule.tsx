import React, { useState } from 'react';
import { SchoolSettings } from '../types/index.ts';

interface SettingsModuleProps {
  settings: SchoolSettings;
  onSaveSettings: (settings: SchoolSettings) => void;
}

export const SettingsModule: React.FC<SettingsModuleProps> = ({ settings, onSaveSettings }) => {
  const [formData, setFormData] = useState<SchoolSettings>({ ...settings });
  const [newClassInput, setNewClassInput] = useState('');
  const [newSubjectInput, setNewSubjectInput] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
  };

  const addClass = () => {
    if (!newClassInput.trim()) return;
    if (!formData.classes.includes(newClassInput.trim())) {
      setFormData({
        ...formData,
        classes: [...formData.classes, newClassInput.trim()]
      });
    }
    setNewClassInput('');
  };

  const removeClass = (cls: string) => {
    setFormData({
      ...formData,
      classes: formData.classes.filter((c) => c !== cls)
    });
  };

  const addSubject = () => {
    if (!newSubjectInput.trim()) return;
    if (!formData.subjects.includes(newSubjectInput.trim())) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, newSubjectInput.trim()]
      });
    }
    setNewSubjectInput('');
  };

  const removeSubject = (subj: string) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter((s) => s !== subj)
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center space-x-2">
          <i className="lucide-settings text-[#1E5AA8] dark:text-blue-400"></i>
          <span>Academic & System Settings</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure active academic session years, class grades, section divisions, subjects, and institutional information.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Academic Session & Institution Card */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center space-x-2 border-b border-slate-200 dark:border-slate-700 pb-3">
            <i className="lucide-building text-[#1E5AA8]"></i>
            <span>Institutional Profile & Session Configuration</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Academic Year Session
              </label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Institution Name
              </label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                School Affiliation Code
              </label>
              <input
                type="text"
                value={formData.schoolCode}
                onChange={(e) => setFormData({ ...formData, schoolCode: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Official Phone Contact
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Classes & Sections Setup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Class Grades Manager */}
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center space-x-2 border-b border-slate-200 dark:border-slate-700 pb-3">
              <i className="lucide-graduation-cap text-[#1E5AA8]"></i>
              <span>Class Grades List</span>
            </h3>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="e.g. Class 13"
                value={newClassInput}
                onChange={(e) => setNewClassInput(e.target.value)}
                className="flex-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white"
              />
              <button
                type="button"
                onClick={addClass}
                className="px-3 py-2 bg-[#1E5AA8] text-white font-bold text-xs rounded-xl shadow"
              >
                Add Class
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {formData.classes.map((cls) => (
                <span
                  key={cls}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-700"
                >
                  <span>{cls}</span>
                  <button
                    type="button"
                    onClick={() => removeClass(cls)}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <i className="lucide-x text-xs"></i>
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Subjects Manager */}
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center space-x-2 border-b border-slate-200 dark:border-slate-700 pb-3">
              <i className="lucide-book-open text-[#1E5AA8]"></i>
              <span>Curriculum Subjects</span>
            </h3>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="e.g. Computer Science"
                value={newSubjectInput}
                onChange={(e) => setNewSubjectInput(e.target.value)}
                className="flex-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white"
              />
              <button
                type="button"
                onClick={addSubject}
                className="px-3 py-2 bg-[#1E5AA8] text-white font-bold text-xs rounded-xl shadow"
              >
                Add Subject
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {formData.subjects.map((subj) => (
                <span
                  key={subj}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-700"
                >
                  <span>{subj}</span>
                  <button
                    type="button"
                    onClick={() => removeSubject(subj)}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <i className="lucide-x text-xs"></i>
                  </button>
                </span>
              ))}
            </div>
          </div>

        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#1E5AA8] hover:bg-[#143F77] text-white font-bold text-sm rounded-xl shadow-lg transition"
          >
            Save System Configurations
          </button>
        </div>

      </form>

    </div>
  );
};
