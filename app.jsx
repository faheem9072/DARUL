// Darul Irshad School of Excellence (DISE) Single Bundle Application
// Standard React 18 & Babel Standalone Browser Compatibility

const { useState, useEffect, createContext, useContext, useMemo } = React;

// Firebase Configuration for Darul Irshad School of Excellence (DISE)
const firebaseConfig = {
  apiKey: "AIzaSyCQNSXvfnwR_RsrMHA92dQLGPJzV6fMDcc",
  authDomain: "darul-c3dcd.firebaseapp.com",
  databaseURL: "https://darul-c3dcd-default-rtdb.firebaseio.com",
  projectId: "darul-c3dcd",
  storageBucket: "darul-c3dcd.firebasestorage.app",
  messagingSenderId: "876406440535",
  appId: "1:876406440535:web:1b822d18b7222f7f155912",
  measurementId: "G-GG1SYD3KGL"
};

if (typeof firebase !== 'undefined' && firebase.initializeApp) {
  if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    if (firebase.analytics) {
      firebase.analytics();
    }
  }
}

// ==========================================
// 1. DATA MODELS & SEEDED DATA ENGINE
// ==========================================

const INITIAL_SETTINGS = {
  academicYear: '2026 - 2027',
  schoolName: 'Darul Irshad School of Excellence',
  schoolCode: 'DISE-EDU-8821',
  phone: '+91 98765 43210',
  email: 'info@darulirshad.edu.in',
  address: 'DISE Campus, Knowledge City Road, Calicut, Kerala',
  classes: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
  sections: ['A', 'B', 'C', 'D'],
  subjects: ['Islamic Studies', 'Arabic Language', 'Mathematics', 'Science', 'English Literature', 'Social Science', 'Computer Science', 'Physics', 'Chemistry', 'Biology']
};

const INITIAL_STUDENTS = [
  {
    id: 'st-101',
    studentId: 'DISE-2026-001',
    name: 'Muhammad Ayan',
    class: 'Class 10',
    section: 'A',
    rollNo: 1,
    gender: 'Male',
    dob: '2010-04-15',
    parentName: 'Ibrahim Kutty',
    parentPhone: '+91 98470 12345',
    email: 'ayan.m@darulirshad.edu.in',
    address: 'Green Valley Villa 12, Calicut',
    status: 'Active',
    admissionDate: '2020-06-01'
  },
  {
    id: 'st-102',
    studentId: 'DISE-2026-002',
    name: 'Fatima Nusha',
    class: 'Class 10',
    section: 'A',
    rollNo: 2,
    gender: 'Female',
    dob: '2010-08-22',
    parentName: 'Abdul Salam',
    parentPhone: '+91 98471 23456',
    email: 'fatima.n@darulirshad.edu.in',
    address: 'Al-Noor House, Feroke',
    status: 'Active',
    admissionDate: '2020-06-01'
  },
  {
    id: 'st-103',
    studentId: 'DISE-2026-003',
    name: 'Zayd Hamdan',
    class: 'Class 10',
    section: 'B',
    rollNo: 3,
    gender: 'Male',
    dob: '2010-02-10',
    parentName: 'Hamdan Ali',
    parentPhone: '+91 98472 34567',
    email: 'zayd.h@darulirshad.edu.in',
    address: 'Palm Grove Apartments, Ramanattukara',
    status: 'Active',
    admissionDate: '2020-06-02'
  },
  {
    id: 'st-104',
    studentId: 'DISE-2026-004',
    name: 'Aisha Rifa',
    class: 'Class 9',
    section: 'A',
    rollNo: 1,
    gender: 'Female',
    dob: '2011-11-05',
    parentName: 'Musthafa K.P',
    parentPhone: '+91 98473 45678',
    email: 'aisha.r@darulirshad.edu.in',
    address: 'Madina Cottage, Kondotty',
    status: 'Active',
    admissionDate: '2021-06-01'
  },
  {
    id: 'st-105',
    studentId: 'DISE-2026-005',
    name: 'Omar Farooq',
    class: 'Class 10',
    section: 'A',
    rollNo: 4,
    gender: 'Male',
    dob: '2010-01-30',
    parentName: 'Usman Ghani',
    parentPhone: '+91 98474 56789',
    email: 'omar.f@darulirshad.edu.in',
    address: 'Baitul Hikmah, Malappuram',
    status: 'Active',
    admissionDate: '2020-06-01'
  },
  {
    id: 'st-106',
    studentId: 'DISE-2026-006',
    name: 'Hadiya Maryam',
    class: 'Class 8',
    section: 'A',
    rollNo: 1,
    gender: 'Female',
    dob: '2012-05-19',
    parentName: 'Shafi Rahman',
    parentPhone: '+91 98475 67890',
    email: 'hadiya.m@darulirshad.edu.in',
    address: 'Rose Manor, Calicut',
    status: 'Active',
    admissionDate: '2022-06-01'
  }
];

const INITIAL_NOTICES = [
  {
    id: 'nt-1',
    title: 'First Term Examination Schedule 2026-27',
    content: 'The First Term Examinations for Classes 5 to 12 will commence on August 18, 2026. Hall tickets will be issued by class teachers from August 12.',
    category: 'Exam',
    targetRole: 'all',
    author: 'Principal Office',
    date: '2026-07-25',
    priority: 'high',
    isPinned: true
  },
  {
    id: 'nt-2',
    title: 'Staff Meeting & Curriculum Planning Session',
    content: 'All faculty members are requested to attend the mandatory curriculum review meeting in the Conference Hall on Saturday at 2:30 PM.',
    category: 'Administrative',
    targetRole: 'teachers',
    author: 'Academic Coordinator',
    date: '2026-07-26',
    priority: 'medium',
    isPinned: false
  },
  {
    id: 'nt-3',
    title: 'Annual Sports Day Selection Trials',
    content: 'Selection trials for inter-house track and field events will take place this Thursday at the main athletic ground from 3:30 PM onwards.',
    category: 'Event',
    targetRole: 'all',
    author: 'Physical Education Dept',
    date: '2026-07-27',
    priority: 'low',
    isPinned: false
  }
];

const INITIAL_LEAVES = [
  {
    id: 'lv-1',
    studentId: 'st-103',
    studentName: 'Zayd Hamdan',
    class: 'Class 10',
    section: 'B',
    startDate: '2026-07-28',
    endDate: '2026-07-30',
    daysCount: 3,
    reason: 'Medical Leave - High fever and doctor recommended rest.',
    attachmentName: 'medical_certificate_zayd.pdf',
    status: 'pending',
    appliedDate: '2026-07-27'
  },
  {
    id: 'lv-2',
    studentId: 'st-102',
    studentName: 'Fatima Nusha',
    class: 'Class 10',
    section: 'A',
    startDate: '2026-07-29',
    endDate: '2026-07-29',
    daysCount: 1,
    reason: 'Family Event - Attending family wedding ceremony.',
    status: 'approved',
    adminComment: 'Approved by Vice Principal. Ensure homework submission on return.',
    appliedDate: '2026-07-24'
  }
];

const INITIAL_TIMETABLE = [
  { id: 'tt-1', className: 'Class 10', section: 'A', day: 'Monday', period: 1, subject: 'Mathematics', teacherName: 'Prof. Rashid Ahmed', room: 'Room 301', startTime: '09:00 AM', endTime: '09:45 AM' },
  { id: 'tt-2', className: 'Class 10', section: 'A', day: 'Monday', period: 2, subject: 'Physics', teacherName: 'Dr. Sameer Khan', room: 'Physics Lab', startTime: '09:45 AM', endTime: '10:30 AM' },
  { id: 'tt-3', className: 'Class 10', section: 'A', day: 'Monday', period: 3, subject: 'Islamic Studies', teacherName: 'Usthad Abdullah', room: 'Room 301', startTime: '10:45 AM', endTime: '11:30 AM' },
  { id: 'tt-4', className: 'Class 10', section: 'A', day: 'Monday', period: 4, subject: 'English Literature', teacherName: 'Mrs. Shabana Parveen', room: 'Room 301', startTime: '11:30 AM', endTime: '12:15 PM' },
  { id: 'tt-5', className: 'Class 10', section: 'A', day: 'Tuesday', period: 1, subject: 'Arabic Language', teacherName: 'Usthad Abdullah', room: 'Room 301', startTime: '09:00 AM', endTime: '09:45 AM' },
  { id: 'tt-6', className: 'Class 10', section: 'A', day: 'Tuesday', period: 2, subject: 'Chemistry', teacherName: 'Mrs. Fathima Farha', room: 'Chem Lab', startTime: '09:45 AM', endTime: '10:30 AM' }
];

const INITIAL_DOCUMENTS = [
  {
    id: 'doc-1',
    title: 'Class 10 Mathematics Term 1 Revision Guide',
    description: 'Comprehensive formula sheet and solved sample questions for Quadratic Equations.',
    fileUrl: '#',
    fileName: 'math_class10_term1_revision.pdf',
    fileType: 'Notes',
    fileSize: '2.4 MB',
    className: 'Class 10',
    subject: 'Mathematics',
    uploadedBy: 'Prof. Rashid Ahmed',
    uploadedAt: '2026-07-22'
  },
  {
    id: 'doc-2',
    title: 'Physics Lab Experiment Manual & Worksheet',
    description: 'Guidelines for Ohm Law experiment and Ray Optics diagram submission assignment.',
    fileUrl: '#',
    fileName: 'physics_lab_manual_2026.pdf',
    fileType: 'Assignment',
    fileSize: '4.1 MB',
    className: 'Class 10',
    subject: 'Physics',
    uploadedBy: 'Dr. Sameer Khan',
    uploadedAt: '2026-07-24'
  }
];

function getStoredItem(key, fallback) {
  try {
    const item = localStorage.getItem(`dise_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    return fallback;
  }
}

function setStoredItem(key, value) {
  try {
    localStorage.setItem(`dise_${key}`, JSON.stringify(value));
  } catch (err) {}
}

const DISEDataStore = {
  getStudents: () => getStoredItem('students', INITIAL_STUDENTS),
  saveStudent: (student) => {
    const students = getStoredItem('students', INITIAL_STUDENTS);
    const idx = students.findIndex(s => s.id === student.id);
    let updated;
    if (idx >= 0) {
      updated = [...students];
      updated[idx] = student;
    } else {
      updated = [student, ...students];
    }
    setStoredItem('students', updated);
    return updated;
  },
  deleteStudent: (id) => {
    const students = getStoredItem('students', INITIAL_STUDENTS);
    const updated = students.filter(s => s.id !== id);
    setStoredItem('students', updated);
    return updated;
  },
  getAllAttendance: () => getStoredItem('attendance', []),
  saveAttendance: (records) => {
    const allRecords = getStoredItem('attendance', []);
    const recordsMap = new Map(allRecords.map(r => [`${r.date}_${r.studentId}`, r]));
    records.forEach(r => recordsMap.set(`${r.date}_${r.studentId}`, r));
    const updated = Array.from(recordsMap.values());
    setStoredItem('attendance', updated);
    return updated;
  },
  getLeaves: () => getStoredItem('leaves', INITIAL_LEAVES),
  saveLeave: (leave) => {
    const leaves = getStoredItem('leaves', INITIAL_LEAVES);
    const idx = leaves.findIndex(l => l.id === leave.id);
    let updated;
    if (idx >= 0) {
      updated = [...leaves];
      updated[idx] = leave;
    } else {
      updated = [leave, ...leaves];
    }
    setStoredItem('leaves', updated);
    return updated;
  },
  getNotices: () => getStoredItem('notices', INITIAL_NOTICES),
  saveNotice: (notice) => {
    const notices = getStoredItem('notices', INITIAL_NOTICES);
    const idx = notices.findIndex(n => n.id === notice.id);
    let updated;
    if (idx >= 0) {
      updated = [...notices];
      updated[idx] = notice;
    } else {
      updated = [notice, ...notices];
    }
    setStoredItem('notices', updated);
    return updated;
  },
  deleteNotice: (id) => {
    const notices = getStoredItem('notices', INITIAL_NOTICES);
    const updated = notices.filter(n => n.id !== id);
    setStoredItem('notices', updated);
    return updated;
  },
  getTimetable: () => getStoredItem('timetable', INITIAL_TIMETABLE),
  getDocuments: () => getStoredItem('documents', INITIAL_DOCUMENTS),
  saveDocument: (doc) => {
    const docs = getStoredItem('documents', INITIAL_DOCUMENTS);
    const updated = [doc, ...docs];
    setStoredItem('documents', updated);
    return updated;
  },
  getSettings: () => getStoredItem('settings', INITIAL_SETTINGS),
  saveSettings: (settings) => {
    setStoredItem('settings', settings);
    return settings;
  }
};

// ==========================================
// 2. CONTEXT PROVIDERS (AUTH & THEME)
// ==========================================

const ADMIN_USER = {
  id: 'usr-admin-1',
  name: 'Dr. Abdul Rahman Al-Hassani',
  email: 'admin@darulirshad.edu.in',
  role: 'admin',
  designation: 'Principal & System Administrator',
  phone: '+91 98470 00001'
};

const TEACHER_USER = {
  id: 'usr-teacher-1',
  name: 'Prof. Rashid Ahmed',
  email: 'rashid.ahmed@darulirshad.edu.in',
  role: 'teacher',
  designation: 'Senior Mathematics Teacher',
  phone: '+91 98470 00002',
  classTeacherOf: 'Class 10-A'
};

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dise_auth_user');
    return saved ? JSON.parse(saved) : ADMIN_USER;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('dise_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dise_auth_user');
    }
  }, [user]);

  const login = (email, role) => {
    if (role === 'admin') {
      setUser({ ...ADMIN_USER, email: email || ADMIN_USER.email });
    } else {
      setUser({ ...TEACHER_USER, email: email || TEACHER_USER.email });
    }
  };

  const logout = () => setUser(null);
  const switchRole = (newRole) => setUser(newRole === 'admin' ? ADMIN_USER : TEACHER_USER);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, role: user ? user.role : 'admin', login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('dise_theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('dise_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('dise_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

const useTheme = () => useContext(ThemeContext);

// ==========================================
// 3. UI COMPONENTS
// ==========================================

function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto flex items-start space-x-3 p-4 rounded-xl border backdrop-blur-md shadow-xl bg-blue-50/90 dark:bg-slate-900/90 border-[#1E5AA8]/30">
          <i className="lucide-check-circle text-emerald-500 text-xl flex-shrink-0 mt-0.5"></i>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">{toast.title}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{toast.message}</p>
          </div>
          <button onClick={() => onDismiss(toast.id)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
            <i className="lucide-x text-sm"></i>
          </button>
        </div>
      ))}
    </div>
  );
}

function Navbar({ onToggleSidebar, activeTab, onSelectTab }) {
  const { user, role, switchRole, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="sticky top-0 z-30 glass-nav px-4 sm:px-6 py-3 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center space-x-3">
          <button onClick={onToggleSidebar} className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <i className="lucide-menu text-xl"></i>
          </button>

          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1E5AA8] to-[#3B7DD8] flex items-center justify-center text-white font-bold text-xl shadow-md border border-white/20">
              <i className="lucide-graduation-cap"></i>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-slate-800 dark:text-white">
                  DISE <span className="hidden sm:inline text-[#1E5AA8] dark:text-[#3B7DD8]">PORTAL</span>
                </h1>
                <span className="bg-[#F5C400]/20 text-[#1E5AA8] dark:text-[#F5C400] text-xs font-semibold px-2 py-0.5 rounded-full border border-[#F5C400]/40 hidden md:inline-block">
                  2026-2027
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Darul Irshad School of Excellence
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center text-xs font-semibold shadow-inner border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => switchRole('admin')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-all ${
                role === 'admin' ? 'bg-[#1E5AA8] text-white shadow-sm font-bold' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <i className="lucide-shield-check text-sm"></i>
              <span className="hidden md:inline">Admin</span>
            </button>
            <button
              onClick={() => switchRole('teacher')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-all ${
                role === 'teacher' ? 'bg-[#1E5AA8] text-white shadow-sm font-bold' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <i className="lucide-user-check text-sm"></i>
              <span className="hidden md:inline">Teacher</span>
            </button>
          </div>

          <button onClick={toggleDarkMode} className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            {isDarkMode ? <i className="lucide-sun text-yellow-400 text-lg"></i> : <i className="lucide-moon text-slate-600 text-lg"></i>}
          </button>

          <button onClick={() => onSelectTab('notices')} className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative">
            <i className="lucide-bell text-lg"></i>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping"></span>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3 pl-2 border-l border-slate-200 dark:border-slate-700">
            <div className="hidden sm:block text-right">
              <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{user?.name}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 capitalize font-medium">{user?.role === 'admin' ? 'Administrator' : user?.classTeacherOf || 'Faculty'}</div>
            </div>
            <button onClick={logout} className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl">
              <i className="lucide-log-out text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ activeTab, onSelectTab, isOpen, onCloseMobile }) {
  const { role } = useAuth();
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'lucide-layout-dashboard' },
    { id: 'students', label: 'Student Management', icon: 'lucide-users' },
    { id: 'attendance', label: 'Attendance Module', icon: 'lucide-calendar-check' },
    { id: 'leave', label: 'Leave Requests', icon: 'lucide-clipboard-list', badge: 'New' },
    { id: 'notices', label: 'Notice Board', icon: 'lucide-megaphone' },
    { id: 'timetable', label: 'Class Timetable', icon: 'lucide-clock' },
    { id: 'documents', label: 'Study Documents', icon: 'lucide-file-text' },
    { id: 'settings', label: 'System Settings', icon: 'lucide-settings', adminOnly: true },
    { id: 'future', label: 'Future Ready ERP', icon: 'lucide-sparkles', badge: '15+' },
  ];

  return (
    <>
      {isOpen && <div onClick={onCloseMobile} className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"></div>}
      <aside className={`fixed lg:sticky top-0 lg:top-16 left-0 z-50 lg:z-20 h-screen lg:h-[calc(100vh-4rem)] w-64 glass-sidebar transition-transform duration-300 flex flex-col justify-between p-4 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div>
          <div className="flex items-center justify-between lg:hidden mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-800 dark:text-white">DISE Portal Menu</span>
            <button onClick={onCloseMobile} className="p-1 text-slate-500"><i className="lucide-x text-xl"></i></button>
          </div>
          <div className="text-[11px] font-bold text-slate-400 uppercase px-3 mb-2">Navigation Menu</div>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              if (item.adminOnly && role !== 'admin') return null;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { onSelectTab(item.id); onCloseMobile(); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition ${
                    isActive ? 'bg-[#1E5AA8] text-white shadow-md font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <i className={`${item.icon} text-lg`}></i>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5C400] text-slate-900">{item.badge}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

function Dashboard({ students, leaves, notices, attendance, onSelectTab, onOpenAddStudent, onOpenAddNotice }) {
  const totalStudents = students.length;
  const pendingLeaves = leaves.filter(l => l.status === 'pending');
  const recentNotices = notices.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1E5AA8] via-[#1A4F93] to-[#143F77] text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs text-[#F5C400] font-semibold mb-3">
              <i className="lucide-shield-check"></i>
              <span>Official Management Portal</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Darul Irshad School of Excellence</h2>
            <p className="text-blue-100 text-sm mt-1 max-w-xl">
              Internal Administration & Faculty Operations Hub. Track student progress, manage daily attendance, review leave applications, and publish announcements.
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl text-center">
            <div className="text-xs text-blue-200 uppercase font-medium">Academic Session</div>
            <div className="text-lg font-bold text-white">2026 - 2027</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl">
          <p className="text-xs font-semibold text-slate-500 uppercase">Total Students</p>
          <h3 className="text-3xl font-extrabold text-slate-800 dark:text-white mt-1">{totalStudents}</h3>
          <p className="text-xs text-emerald-600 mt-2">Active Enrolled</p>
        </div>

        <div className="glass-card p-5 rounded-2xl">
          <p className="text-xs font-semibold text-slate-500 uppercase">Present Today</p>
          <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">{Math.round(totalStudents * 0.95)}</h3>
          <p className="text-xs text-slate-500 mt-2">95% Attendance</p>
        </div>

        <div className="glass-card p-5 rounded-2xl">
          <p className="text-xs font-semibold text-slate-500 uppercase">Absent Today</p>
          <h3 className="text-3xl font-extrabold text-rose-500 mt-1">{totalStudents - Math.round(totalStudents * 0.95)}</h3>
          <p className="text-xs text-slate-500 mt-2">Medical & Excused</p>
        </div>

        <div onClick={() => onSelectTab('leave')} className="glass-card p-5 rounded-2xl cursor-pointer hover:shadow-lg">
          <p className="text-xs font-semibold text-amber-600 uppercase">Pending Leaves</p>
          <h3 className="text-3xl font-extrabold text-amber-600 mt-1">{pendingLeaves.length}</h3>
          <p className="text-xs text-amber-700 font-bold mt-2">Requires Action &rarr;</p>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase mb-4 flex items-center space-x-2">
          <i className="lucide-zap text-[#F5C400]"></i>
          <span>Quick Action Controls</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button onClick={onOpenAddStudent} className="p-3.5 rounded-xl bg-[#1E5AA8] text-white font-bold text-xs sm:text-sm shadow">Add Student</button>
          <button onClick={() => onSelectTab('attendance')} className="p-3.5 rounded-xl bg-slate-800 text-white font-bold text-xs sm:text-sm shadow">Mark Attendance</button>
          <button onClick={onOpenAddNotice} className="p-3.5 rounded-xl bg-amber-500 text-slate-900 font-bold text-xs sm:text-sm shadow">Post Notice</button>
          <button onClick={() => onSelectTab('leave')} className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs sm:text-sm">Review Leaves</button>
        </div>
      </div>
    </div>
  );
}

function StudentManagement({ students, onSaveStudent, onDeleteStudent, classesList, isAddModalOpen, onCloseAddModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [viewingProfile, setViewingProfile] = useState(null);
  const [viewingIdCard, setViewingIdCard] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  const filtered = students.filter(st => {
    const matchesSearch = st.name.toLowerCase().includes(searchTerm.toLowerCase()) || st.studentId.toLowerCase().includes(searchTerm.toLowerCase()) || st.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'All' || st.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      ...editingStudent,
      name: form.name.value,
      studentId: form.studentId.value,
      rollNo: parseInt(form.rollNo.value) || editingStudent.rollNo,
      class: form.class.value,
      section: form.section.value,
      parentName: form.parentName.value,
      parentPhone: form.parentPhone.value,
      status: form.status.value
    };
    onSaveStudent(updated);
    setEditingStudent(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Student Directory & Profiles</h2>
        <button onClick={onCloseAddModal} className="px-4 py-2 bg-[#1E5AA8] text-white font-bold text-xs sm:text-sm rounded-xl shadow">Add New Student</button>
      </div>

      <div className="glass-card p-4 rounded-2xl flex flex-col sm:flex-row gap-3">
        <input type="text" placeholder="Search by name, ID, parent..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="flex-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs sm:text-sm" />
        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs sm:text-sm font-bold">
          <option value="All">All Classes</option>
          {classesList.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="glass-card rounded-2xl overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-500 uppercase">
              <th className="p-4">Student ID & Name</th>
              <th className="p-4">Class</th>
              <th className="p-4">Parent Details</th>
              <th className="p-4">Phone</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {filtered.map(st => (
              <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-4">
                  <div className="font-bold text-slate-800 dark:text-white">{st.name}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{st.studentId}</div>
                </td>
                <td className="p-4 font-semibold">{st.class} - {st.section}</td>
                <td className="p-4">{st.parentName}</td>
                <td className="p-4 font-mono">{st.parentPhone}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => setEditingStudent(st)} className="text-emerald-600 font-bold">Edit</button>
                  <button onClick={() => setViewingProfile(st)} className="text-blue-600 font-bold">Profile</button>
                  <button onClick={() => setViewingIdCard(st)} className="text-amber-600 font-bold">ID Card</button>
                  <button onClick={() => onDeleteStudent(st.id)} className="text-rose-500 font-bold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="glass-modal w-full max-w-lg rounded-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Edit Student Record ({editingStudent.studentId})</h3>
              <button onClick={() => setEditingStudent(null)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block font-bold mb-1">Full Name</label>
                <input type="text" name="name" defaultValue={editingStudent.name} required className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Student ID</label>
                  <input type="text" name="studentId" defaultValue={editingStudent.studentId} required className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border font-mono" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Roll No</label>
                  <input type="number" name="rollNo" defaultValue={editingStudent.rollNo} required className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Class</label>
                  <select name="class" defaultValue={editingStudent.class} className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border">
                    {classesList.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Section</label>
                  <input type="text" name="section" defaultValue={editingStudent.section} required className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border" />
                </div>
              </div>
              <div>
                <label className="block font-bold mb-1">Parent Name</label>
                <input type="text" name="parentName" defaultValue={editingStudent.parentName} required className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border" />
              </div>
              <div>
                <label className="block font-bold mb-1">Parent Phone</label>
                <input type="text" name="parentPhone" defaultValue={editingStudent.parentPhone} required className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border font-mono" />
              </div>
              <div>
                <label className="block font-bold mb-1">Status</label>
                <select name="status" defaultValue={editingStudent.status || 'Active'} className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setEditingStudent(null)} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-xs font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#1E5AA8] text-white text-xs font-bold rounded-xl">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingIdCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="glass-modal w-full max-w-sm rounded-3xl p-6 text-center space-y-4">
            <div className="bg-[#1E5AA8] text-white p-4 rounded-2xl">
              <h3 className="font-extrabold text-base">DARUL IRSHAD</h3>
              <p className="text-xs text-[#F5C400] font-mono mt-1">{viewingIdCard.studentId}</p>
              <div className="w-16 h-16 mx-auto my-3 bg-white text-[#1E5AA8] font-black text-2xl rounded-full flex items-center justify-center border-2 border-[#F5C400]">
                {viewingIdCard.name.charAt(0)}
              </div>
              <h4 className="font-bold text-sm">{viewingIdCard.name}</h4>
              <p className="text-xs">Class: {viewingIdCard.class}-{viewingIdCard.section}</p>
            </div>
            <button onClick={() => window.print()} className="px-4 py-2 bg-[#F5C400] text-slate-900 font-bold text-xs rounded-xl">Print Badge</button>
            <button onClick={() => setViewingIdCard(null)} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-xs font-bold rounded-xl ml-2">Close</button>
          </div>
        </div>
      )}

      {viewingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="glass-modal w-full max-w-md rounded-2xl p-6 space-y-3 text-xs">
            <h3 className="text-base font-bold text-slate-800 dark:text-white">Student Profile Card</h3>
            <p><strong>Name:</strong> {viewingProfile.name}</p>
            <p><strong>ID:</strong> {viewingProfile.studentId}</p>
            <p><strong>Parent:</strong> {viewingProfile.parentName}</p>
            <p><strong>Phone:</strong> {viewingProfile.parentPhone}</p>
            <p><strong>Address:</strong> {viewingProfile.address}</p>
            <button onClick={() => setViewingProfile(null)} className="px-4 py-2 bg-[#1E5AA8] text-white font-bold rounded-xl mt-2">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function AttendanceModule({ students, attendanceRecords, onSaveAttendance, classesList }) {
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const classStudents = students.filter(s => s.class === selectedClass);
  const [statusMap, setStatusMap] = useState({});

  const handleSave = () => {
    const records = classStudents.map(s => ({
      id: `att-${s.id}`,
      date: new Date().toISOString().split('T')[0],
      studentId: s.id,
      studentName: s.name,
      class: s.class,
      status: statusMap[s.id] || 'present'
    }));
    onSaveAttendance(records);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Daily Attendance Register</h2>
        <button onClick={() => window.print()} className="px-4 py-2 bg-amber-500 text-slate-900 font-bold text-xs rounded-xl shadow">Export Attendance PDF</button>
      </div>

      <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs sm:text-sm font-bold">
          {classesList.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={handleSave} className="px-4 py-2 bg-[#1E5AA8] text-white font-bold text-xs rounded-xl">Save Register</button>
      </div>

      <div className="glass-card rounded-2xl overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-500 uppercase">
              <th className="p-4">Roll #</th>
              <th className="p-4">Student Name</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {classStudents.map(st => (
              <tr key={st.id}>
                <td className="p-4 font-mono font-bold">#{st.rollNo}</td>
                <td className="p-4 font-bold">{st.name}</td>
                <td className="p-4 text-center space-x-2">
                  <button onClick={() => setStatusMap({ ...statusMap, [st.id]: 'present' })} className={`px-3 py-1 rounded-xl text-xs font-bold ${statusMap[st.id] !== 'absent' ? 'bg-emerald-500 text-white' : 'bg-slate-200'}`}>Present</button>
                  <button onClick={() => setStatusMap({ ...statusMap, [st.id]: 'absent' })} className={`px-3 py-1 rounded-xl text-xs font-bold ${statusMap[st.id] === 'absent' ? 'bg-rose-500 text-white' : 'bg-slate-200'}`}>Absent</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LeaveManagement({ leaves, students, onSaveLeave, role }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Leave Workflow Management</h2>
      <div className="glass-card rounded-2xl overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-500 uppercase">
              <th className="p-4">Student</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {leaves.map(lv => (
              <tr key={lv.id}>
                <td className="p-4 font-bold">{lv.studentName} ({lv.class})</td>
                <td className="p-4">{lv.startDate}</td>
                <td className="p-4">{lv.reason}</td>
                <td className="p-4 font-bold uppercase text-emerald-600">{lv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NoticeBoard({ notices, role }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Circulars & Notice Board</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notices.map(n => (
          <div key={n.id} className="glass-card p-5 rounded-2xl border-l-4 border-l-[#1E5AA8]">
            <span className="text-[10px] font-bold uppercase bg-blue-100 px-2 py-0.5 rounded text-[#1E5AA8]">{n.category}</span>
            <h3 className="text-base font-bold mt-2 text-slate-800 dark:text-white">{n.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">{n.content}</p>
            <div className="text-[11px] text-slate-400 mt-4 pt-2 border-t">{n.author} • {n.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimetableModule({ timetableSlots, classesList }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Class Timetable Matrix</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {timetableSlots.map(slot => (
          <div key={slot.id} className="glass-card p-5 rounded-2xl border-t-4 border-t-[#1E5AA8]">
            <div className="text-xs font-bold text-slate-400">Period #{slot.period} ({slot.startTime})</div>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white mt-1">{slot.subject}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">{slot.teacherName} • {slot.room}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentRepository({ documents }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Study Vault & Documents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map(doc => (
          <div key={doc.id} className="glass-card p-5 rounded-2xl">
            <span className="text-[10px] font-bold uppercase bg-blue-50 text-[#1E5AA8] px-2 py-0.5 rounded">{doc.fileType}</span>
            <h3 className="text-base font-bold text-slate-800 dark:text-white mt-2">{doc.title}</h3>
            <p className="text-xs text-slate-500 mt-1">{doc.description}</p>
            <button onClick={() => alert(`Downloading ${doc.fileName}...`)} className="mt-4 px-3 py-1.5 bg-[#1E5AA8] text-white text-xs font-bold rounded-xl shadow">Download File</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsModule({ settings, onSaveSettings }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">System Configurations</h2>
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="font-bold text-base">Institution Profile</h3>
        <p className="text-xs"><strong>Academic Session:</strong> {settings.academicYear}</p>
        <p className="text-xs"><strong>School Name:</strong> {settings.schoolName}</p>
        <p className="text-xs"><strong>Affiliation Code:</strong> {settings.schoolCode}</p>
      </div>
    </div>
  );
}

function FutureModules() {
  const list = ['Parent Portal', 'Student Portal', 'Exam Management', 'Marks Entry', 'Fee Management', 'Library System', 'WhatsApp Alerts', 'SMS Gateway', 'Online Admissions', 'Transport GPS', 'Hostel Care', 'Bulk ID Generator'];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Future Enterprise ERP Extensions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {list.map((item, idx) => (
          <div key={idx} className="glass-card p-5 rounded-2xl flex items-center justify-between">
            <span className="font-bold text-sm text-slate-800 dark:text-white">{item}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Ready</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoginModal() {
  const { login } = useAuth();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-modal w-full max-w-md rounded-3xl p-8 shadow-2xl text-center space-y-6">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#1E5AA8] text-white flex items-center justify-center text-2xl font-bold shadow-xl">
          <i className="lucide-graduation-cap"></i>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Darul Irshad School of Excellence</h2>
          <p className="text-xs text-slate-500 mt-1">Internal Management Portal</p>
        </div>
        <div className="space-y-3">
          <button onClick={() => login('admin@darulirshad.edu.in', 'admin')} className="w-full py-3 bg-[#1E5AA8] text-white font-bold text-sm rounded-xl shadow">Sign In as Admin</button>
          <button onClick={() => login('teacher@darulirshad.edu.in', 'teacher')} className="w-full py-3 bg-slate-800 text-white font-bold text-sm rounded-xl shadow">Sign In as Teacher</button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. MAIN LAYOUT & APPLICATION ROOT
// ==========================================

function MainLayout() {
  const { user, isAuthenticated, role } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [students, setStudents] = useState(() => DISEDataStore.getStudents());
  const [leaves, setLeaves] = useState(() => DISEDataStore.getLeaves());
  const [notices, setNotices] = useState(() => DISEDataStore.getNotices());
  const [attendance, setAttendance] = useState(() => DISEDataStore.getAllAttendance());
  const [timetable, setTimetable] = useState(() => DISEDataStore.getTimetable());
  const [documents, setDocuments] = useState(() => DISEDataStore.getDocuments());
  const [settings, setSettings] = useState(() => DISEDataStore.getSettings());
  const [toasts, setToasts] = useState([]);

  const addToast = (title, message) => {
    const id = `t-${Date.now()}`;
    setToasts(prev => [...prev, { id, title, message }]);
  };

  const dismissToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  if (!isAuthenticated) return <LoginModal />;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col font-sans">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(p => !p)} activeTab={activeTab} onSelectTab={setActiveTab} />
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} isOpen={isSidebarOpen} onCloseMobile={() => setIsSidebarOpen(false)} />
        <main className="flex-1 p-4 sm:p-6 md:p-8 min-w-0 overflow-y-auto">
          {activeTab === 'dashboard' && <Dashboard students={students} leaves={leaves} notices={notices} attendance={attendance} onSelectTab={setActiveTab} onOpenAddStudent={() => setActiveTab('students')} onOpenAddNotice={() => setActiveTab('notices')} />}
          {activeTab === 'students' && <StudentManagement students={students} onSaveStudent={(s) => setStudents(DISEDataStore.saveStudent(s))} onDeleteStudent={(id) => setStudents(DISEDataStore.deleteStudent(id))} classesList={settings.classes} isAddModalOpen={false} onCloseAddModal={() => {}} />}
          {activeTab === 'attendance' && <AttendanceModule students={students} attendanceRecords={attendance} onSaveAttendance={(r) => setAttendance(DISEDataStore.saveAttendance(r))} classesList={settings.classes} />}
          {activeTab === 'leave' && <LeaveManagement leaves={leaves} students={students} onSaveLeave={(l) => setLeaves(DISEDataStore.saveLeave(l))} role={role} />}
          {activeTab === 'notices' && <NoticeBoard notices={notices} role={role} />}
          {activeTab === 'timetable' && <TimetableModule timetableSlots={timetable} classesList={settings.classes} />}
          {activeTab === 'documents' && <DocumentRepository documents={documents} />}
          {activeTab === 'settings' && <SettingsModule settings={settings} onSaveSettings={(st) => setSettings(DISEDataStore.saveSettings(st))} />}
          {activeTab === 'future' && <FutureModules />}
        </main>
      </div>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}

window.App = App;

function mountApp() {
  const rootElement = document.getElementById('root');
  if (rootElement && typeof ReactDOM !== 'undefined') {
    if (!window.__DISE_ROOT__) {
      window.__DISE_ROOT__ = ReactDOM.createRoot(rootElement);
    }
    window.__DISE_ROOT__.render(<App />);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}


