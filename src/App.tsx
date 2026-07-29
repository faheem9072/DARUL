import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { DISEDataStore } from './services/firebase.ts';

import { Navbar } from './components/Navbar.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { StudentManagement } from './components/StudentManagement.tsx';
import { AttendanceModule } from './components/AttendanceModule.tsx';
import { LeaveManagement } from './components/LeaveManagement.tsx';
import { NoticeBoard } from './components/NoticeBoard.tsx';
import { TimetableModule } from './components/TimetableModule.tsx';
import { DocumentRepository } from './components/DocumentRepository.tsx';
import { SettingsModule } from './components/SettingsModule.tsx';
import { FutureModules } from './components/FutureModules.tsx';
import { LoginModal } from './components/LoginModal.tsx';
import { ToastContainer, ToastMessage } from './components/Toast.tsx';

import {
  Student, LeaveRequest, Notice, AttendanceRecord,
  TimetableSlot, DocumentItem, SchoolSettings
} from './types/index.ts';

export const MainLayout: React.FC = () => {
  const { user, isAuthenticated, role } = useAuth();
  
  // Navigation & Drawer State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Application Data State
  const [students, setStudents] = useState<Student[]>([]);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [timetable, setTimetable] = useState<TimetableSlot[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [settings, setSettings] = useState<SchoolSettings>(DISEDataStore.getSettings());

  // Modal Shortcuts
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState(false);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Initial Load from DISE Storage Service
  useEffect(() => {
    setStudents(DISEDataStore.getStudents());
    setLeaves(DISEDataStore.getLeaves());
    setNotices(DISEDataStore.getNotices());
    setAttendance(DISEDataStore.getAllAttendance());
    setTimetable(DISEDataStore.getTimetable());
    setDocuments(DISEDataStore.getDocuments());
    setSettings(DISEDataStore.getSettings());
  }, []);

  // Handlers for Data Mutations
  const handleSaveStudent = (st: Student) => {
    const updated = DISEDataStore.saveStudent(st);
    setStudents(updated);
    addToast('success', 'Student Saved', `${st.name} record updated successfully.`);
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      const updated = DISEDataStore.deleteStudent(id);
      setStudents(updated);
      addToast('info', 'Student Deleted', 'Student record removed from system.');
    }
  };

  const handleSaveAttendance = (records: AttendanceRecord[]) => {
    const updated = DISEDataStore.saveAttendance(records);
    setAttendance(updated);
    addToast('success', 'Attendance Saved', `Daily register recorded for ${records.length} students.`);
  };

  const handleSaveLeave = (leave: LeaveRequest) => {
    const updated = DISEDataStore.saveLeave(leave);
    setLeaves(updated);
    addToast('success', 'Leave Updated', `Leave request for ${leave.studentName} updated.`);
  };

  const handleSaveNotice = (notice: Notice) => {
    const updated = DISEDataStore.saveNotice(notice);
    setNotices(updated);
    addToast('success', 'Notice Published', `Notice "${notice.title}" updated on board.`);
  };

  const handleDeleteNotice = (id: string) => {
    const updated = DISEDataStore.deleteNotice(id);
    setNotices(updated);
    addToast('info', 'Notice Deleted', 'Circular notice removed.');
  };

  const handleSaveDocument = (doc: DocumentItem) => {
    const updated = DISEDataStore.saveDocument(doc);
    setDocuments(updated);
    addToast('success', 'Document Uploaded', `${doc.title} added to vault.`);
  };

  const handleSaveSettings = (newSettings: SchoolSettings) => {
    const updated = DISEDataStore.saveSettings(newSettings);
    setSettings(updated);
    addToast('success', 'Settings Saved', 'System configurations updated.');
  };

  if (!isAuthenticated) {
    return <LoginModal />;
  }

  return (
    <div className="min-w-full min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans">
      
      {/* Top Header Navigation */}
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Body Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
        />

        {/* Dynamic Content Views */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 min-w-0 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              students={students}
              leaves={leaves}
              notices={notices}
              attendance={attendance}
              onSelectTab={setActiveTab}
              onOpenAddStudent={() => { setActiveTab('students'); setIsAddStudentOpen(true); }}
              onOpenAddNotice={() => { setActiveTab('notices'); setIsAddNoticeOpen(true); }}
            />
          )}

          {activeTab === 'students' && (
            <StudentManagement
              students={students}
              onSaveStudent={handleSaveStudent}
              onDeleteStudent={handleDeleteStudent}
              classesList={settings.classes}
              isAddModalOpen={isAddStudentOpen}
              onCloseAddModal={() => setIsAddStudentOpen(false)}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceModule
              students={students}
              attendanceRecords={attendance}
              onSaveAttendance={handleSaveAttendance}
              classesList={settings.classes}
              currentUser={user?.name || 'Faculty Member'}
            />
          )}

          {activeTab === 'leave' && (
            <LeaveManagement
              leaves={leaves}
              students={students}
              onSaveLeave={handleSaveLeave}
              role={role}
            />
          )}

          {activeTab === 'notices' && (
            <NoticeBoard
              notices={notices}
              onSaveNotice={handleSaveNotice}
              onDeleteNotice={handleDeleteNotice}
              role={role}
              isAddModalOpen={isAddNoticeOpen}
              onCloseAddModal={() => setIsAddNoticeOpen(false)}
            />
          )}

          {activeTab === 'timetable' && (
            <TimetableModule
              timetableSlots={timetable}
              classesList={settings.classes}
            />
          )}

          {activeTab === 'documents' && (
            <DocumentRepository
              documents={documents}
              onSaveDocument={handleSaveDocument}
              classesList={settings.classes}
              subjectsList={settings.subjects}
              currentUser={user?.name || 'Faculty Member'}
            />
          )}

          {activeTab === 'settings' && role === 'admin' && (
            <SettingsModule
              settings={settings}
              onSaveSettings={handleSaveSettings}
            />
          )}

          {activeTab === 'future' && <FutureModules />}
        </main>

      </div>

      {/* Floating Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
