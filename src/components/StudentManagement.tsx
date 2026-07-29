import React, { useState, useMemo } from 'react';
import { Student } from '../types/index.ts';

interface StudentManagementProps {
  students: Student[];
  onSaveStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
  classesList: string[];
  isAddModalOpen: boolean;
  onCloseAddModal: () => void;
}

export const StudentManagement: React.FC<StudentManagementProps> = ({
  students,
  onSaveStudent,
  onDeleteStudent,
  classesList,
  isAddModalOpen,
  onCloseAddModal
}) => {
  // Filters & State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Selected Student for Modals
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingProfile, setViewingProfile] = useState<Student | null>(null);
  const [viewingIdCard, setViewingIdCard] = useState<Student | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<Student>>({
    name: '',
    class: 'Class 10',
    section: 'A',
    rollNo: 1,
    gender: 'Male',
    dob: '2010-01-01',
    parentName: '',
    parentPhone: '',
    email: '',
    address: '',
    status: 'Active'
  });

  const [formError, setFormError] = useState('');

  // Handle Add/Edit modal triggering from props or internal buttons
  const openNewForm = () => {
    setFormData({
      studentId: `DISE-2026-${String(students.length + 1).padStart(3, '0')}`,
      name: '',
      class: 'Class 10',
      section: 'A',
      rollNo: students.length + 1,
      gender: 'Male',
      dob: '2010-01-01',
      parentName: '',
      parentPhone: '',
      email: '',
      address: '',
      status: 'Active'
    });
    setEditingStudent(null);
    setFormError('');
    setShowFormModal(true);
  };

  const openEditForm = (st: Student) => {
    setEditingStudent(st);
    setFormData({ ...st });
    setFormError('');
    setShowFormModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.parentName || !formData.parentPhone) {
      setFormError('Please fill out all required fields (Student Name, Parent Name, Parent Phone).');
      return;
    }

    const studentToSave: Student = {
      id: editingStudent ? editingStudent.id : `st-${Date.now()}`,
      studentId: formData.studentId || `DISE-2026-${String(students.length + 1).padStart(3, '0')}`,
      name: formData.name || '',
      class: formData.class || 'Class 10',
      section: formData.section || 'A',
      rollNo: Number(formData.rollNo) || 1,
      gender: (formData.gender as 'Male' | 'Female') || 'Male',
      dob: formData.dob || '2010-01-01',
      parentName: formData.parentName || '',
      parentPhone: formData.parentPhone || '',
      email: formData.email || '',
      address: formData.address || '',
      status: (formData.status as 'Active' | 'Inactive') || 'Active',
      admissionDate: editingStudent ? editingStudent.admissionDate : new Date().toISOString().split('T')[0]
    };

    onSaveStudent(studentToSave);
    setShowFormModal(false);
    onCloseAddModal();
  };

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((st) => {
      const matchesSearch =
        st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        st.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        st.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        st.parentPhone.includes(searchTerm);

      const matchesClass = selectedClass === 'All' || st.class === selectedClass;

      return matchesSearch && matchesClass;
    });
  }, [students, searchTerm, selectedClass]);

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(start, start + itemsPerPage);
  }, [filteredStudents, currentPage]);

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center space-x-2">
            <i className="lucide-users text-[#1E5AA8] dark:text-blue-400"></i>
            <span>Student Management</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage student directory, profile records, class allocations, and generate digital ID cards.
          </p>
        </div>

        <button
          onClick={openNewForm}
          className="flex items-center justify-center space-x-2 bg-[#1E5AA8] hover:bg-[#143F77] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition active:scale-95 self-start sm:self-auto"
        >
          <i className="lucide-user-plus text-base"></i>
          <span>Add New Student</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <i className="lucide-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          <input
            type="text"
            placeholder="Search by Name, ID, Parent..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E5AA8]"
          />
        </div>

        {/* Class Filter Pills */}
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
            Filter Class:
          </span>
          <button
            onClick={() => { setSelectedClass('All'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedClass === 'All'
                ? 'bg-[#1E5AA8] text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Classes
          </button>
          {classesList.slice(0, 5).map((cls) => (
            <button
              key={cls}
              onClick={() => { setSelectedClass(cls); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedClass === cls
                  ? 'bg-[#1E5AA8] text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>

      </div>

      {/* Student Directory Grid / Table */}
      <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/80 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                <th className="p-4">Student ID & Name</th>
                <th className="p-4">Class & Section</th>
                <th className="p-4">Parent Details</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-700/60 text-xs sm:text-sm">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 dark:text-slate-400">
                    <i className="lucide-search-x text-3xl mb-2 block"></i>
                    No students match your search criteria.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1E5AA8] to-blue-400 text-white font-bold flex items-center justify-center text-sm shadow">
                          {st.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 dark:text-white">{st.name}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{st.studentId}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {st.class} - {st.section}
                      </span>
                      <span className="text-xs text-slate-400 block font-normal">Roll No: #{st.rollNo}</span>
                    </td>

                    <td className="p-4">
                      <div className="text-slate-800 dark:text-white font-medium">{st.parentName}</div>
                      <div className="text-xs text-slate-400">Guardian</div>
                    </td>

                    <td className="p-4 font-mono text-slate-600 dark:text-slate-300">
                      {st.parentPhone}
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        st.status === 'Active'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {st.status}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => setViewingProfile(st)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800"
                          title="View Profile"
                        >
                          <i className="lucide-eye text-base"></i>
                        </button>

                        <button
                          onClick={() => setViewingIdCard(st)}
                          className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800"
                          title="Generate Student ID Card"
                        >
                          <i className="lucide-id-card text-base"></i>
                        </button>

                        <button
                          onClick={() => openEditForm(st)}
                          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="Edit Student"
                        >
                          <i className="lucide-edit-3 text-base"></i>
                        </button>

                        <button
                          onClick={() => onDeleteStudent(st.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          title="Delete Student"
                        >
                          <i className="lucide-trash-2 text-base"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div>
            Showing <span className="font-bold">{paginatedStudents.length}</span> of{' '}
            <span className="font-bold">{filteredStudents.length}</span> Students
          </div>

          <div className="flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Previous
            </button>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Form Modal */}
      {(showFormModal || isAddModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="glass-modal w-full max-w-xl rounded-2xl p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                <i className="lucide-user-cog text-[#1E5AA8]"></i>
                <span>{editingStudent ? 'Edit Student Record' : 'Register New Student'}</span>
              </h3>
              <button
                onClick={() => { setShowFormModal(false); onCloseAddModal(); }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <i className="lucide-x text-lg"></i>
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 text-rose-600 dark:text-rose-300 text-xs rounded-xl">
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E5AA8]"
                    placeholder="e.g. Muhammad Zaid"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Student ID Code
                  </label>
                  <input
                    type="text"
                    value={formData.studentId || ''}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E5AA8]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Class Grade
                  </label>
                  <select
                    value={formData.class || 'Class 10'}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E5AA8]"
                  >
                    {classesList.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Section
                  </label>
                  <input
                    type="text"
                    value={formData.section || 'A'}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E5AA8]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.parentName || ''}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E5AA8]"
                    placeholder="e.g. Ibrahim Kutty"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Parent Contact Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.parentPhone || ''}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E5AA8]"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Residential Address
                </label>
                <textarea
                  rows={2}
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E5AA8]"
                  placeholder="Street, City, Postal Code"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => { setShowFormModal(false); onCloseAddModal(); }}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1E5AA8] hover:bg-[#143F77] text-white font-bold shadow-md"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Profile Modal */}
      {viewingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="glass-modal w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Student Profile Card</h3>
              <button
                onClick={() => setViewingProfile(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <i className="lucide-x text-lg"></i>
              </button>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1E5AA8] to-blue-400 text-white font-extrabold flex items-center justify-center text-2xl shadow-lg">
                {viewingProfile.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800 dark:text-white">{viewingProfile.name}</h4>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">{viewingProfile.studentId}</div>
                <div className="mt-1 text-xs font-semibold text-[#1E5AA8] dark:text-blue-400">
                  {viewingProfile.class} - Section {viewingProfile.section} (Roll #{viewingProfile.rollNo})
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-slate-400 block font-medium">Parent Name</span>
                <span className="font-bold text-slate-800 dark:text-white">{viewingProfile.parentName}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-slate-400 block font-medium">Contact Phone</span>
                <span className="font-bold text-slate-800 dark:text-white font-mono">{viewingProfile.parentPhone}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-slate-400 block font-medium">Date of Birth</span>
                <span className="font-bold text-slate-800 dark:text-white">{viewingProfile.dob}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-slate-400 block font-medium">Status</span>
                <span className="font-bold text-emerald-600">{viewingProfile.status}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs">
              <span className="text-slate-400 block font-medium">Residential Address</span>
              <span className="font-medium text-slate-800 dark:text-white">{viewingProfile.address || 'N/A'}</span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setViewingProfile(null)}
                className="px-4 py-2 bg-[#1E5AA8] text-white font-bold text-xs rounded-xl"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Student ID Badge Card Preview */}
      {viewingIdCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="glass-modal w-full max-w-sm rounded-3xl p-6 shadow-2xl text-center space-y-4 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F5C400]/20 rounded-full blur-xl pointer-events-none"></div>

            <div className="bg-[#1E5AA8] text-white p-4 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <i className="lucide-graduation-cap text-[#F5C400] text-xl"></i>
                <span className="font-bold text-sm tracking-wide">DARUL IRSHAD</span>
              </div>
              <p className="text-[10px] text-blue-200 uppercase font-semibold tracking-wider">
                School of Excellence • Student ID
              </p>

              <div className="w-20 h-20 mx-auto my-3 rounded-2xl bg-white text-[#1E5AA8] font-black text-3xl flex items-center justify-center border-4 border-[#F5C400] shadow-md">
                {viewingIdCard.name.charAt(0)}
              </div>

              <h4 className="font-extrabold text-base tracking-tight">{viewingIdCard.name}</h4>
              <p className="text-xs text-[#F5C400] font-bold font-mono">{viewingIdCard.studentId}</p>

              <div className="mt-3 py-1.5 px-3 bg-white/10 rounded-xl text-xs flex justify-between font-medium">
                <span>Class: {viewingIdCard.class}-{viewingIdCard.section}</span>
                <span>Roll: #{viewingIdCard.rollNo}</span>
              </div>
            </div>

            <div className="text-left text-xs space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>Parent:</strong> {viewingIdCard.parentName}</p>
              <p><strong>Emergency Contact:</strong> {viewingIdCard.parentPhone}</p>
            </div>

            <div className="pt-2 flex justify-center space-x-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#F5C400] text-slate-900 font-bold text-xs rounded-xl shadow hover:bg-amber-400 flex items-center space-x-1"
              >
                <i className="lucide-printer text-sm"></i>
                <span>Print ID Badge</span>
              </button>
              <button
                onClick={() => setViewingIdCard(null)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
