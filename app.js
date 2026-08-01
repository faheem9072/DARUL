// Darul Irshad School of Excellence (DISE) ERP System v5.0
// Brand Theme: White & Warm Bronze (#5C3A21, #C49B66)

(function() {
  // Firebase Configuration for Darul Irshad School of Excellence (DISE)
  const firebaseConfig = window.firebaseConfig || {
    apiKey: "AIzaSyCQNSXvfnwR_RsrMHA92dQLGPJzV6fMDcc",
    authDomain: "darul-c3dcd.firebaseapp.com",
    databaseURL: "https://darul-c3dcd-default-rtdb.firebaseio.com",
    projectId: "darul-c3dcd",
    storageBucket: "darul-c3dcd.firebasestorage.app",
    messagingSenderId: "876406440535",
    appId: "1:876406440535:web:1b822d18b7222f7f155912",
    measurementId: "G-GG1SYD3KGL"
  };

  const firebaseApp = (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length) 
    ? firebase.apps[0] 
    : (typeof firebase !== 'undefined' && firebase.initializeApp ? firebase.initializeApp(firebaseConfig) : null);

  const STORAGE_KEYS = {
    STUDENTS: 'dise_students_v5',
    STAFF: 'dise_staff_v5',
    LEAVES: 'dise_leaves_v5',
    NOTICES: 'dise_notices_v5',
    ATTENDANCE: 'dise_attendance_v5',
    USER: 'dise_user_v5'
  };

  // Official Leadership Information
  const SCHOOL_LEADERSHIP = {
    chairman: 'Sayyid Ismaeel Noufal Bukhari',
    principal: 'Bava Ahsani',
    vicePrincipal: 'Shahul Hameed Azhari'
  };

  // Official Faculty Management List
  const OFFICIAL_FACULTY = [
    {
      id: 'stf-101',
      staffId: 'DISE-FAC-001',
      name: 'Faheem Muhammed Saquafi',
      designation: 'Faculty',
      role: 'Class Teacher',
      assignedClass: 'Grade 7',
      subjects: ['Islamic Studies', 'Arabic Literature', 'Social Science'],
      phone: '+91 98470 22001',
      email: 'faheem.s@darulirshad.edu.in',
      status: 'Active',
      joinDate: '2024-06-01',
      attendanceRate: '98.5%',
      leavesTaken: 2,
      timetable: 'Mon - Fri (8:30 AM - 1:00 PM)'
    },
    {
      id: 'stf-102',
      staffId: 'DISE-FAC-002',
      name: 'Swalih Ahsani',
      designation: 'Faculty',
      role: 'Class Teacher',
      assignedClass: 'Grade 8',
      subjects: ['Mathematics', 'General Science', 'Logic & Ethics'],
      phone: '+91 98470 22002',
      email: 'swalih.a@darulirshad.edu.in',
      status: 'Active',
      joinDate: '2024-06-01',
      attendanceRate: '100%',
      leavesTaken: 0,
      timetable: 'Mon - Fri (8:30 AM - 1:00 PM)'
    },
    {
      id: 'stf-103',
      staffId: 'DISE-FAC-003',
      name: 'Muhameed Saleeth N.K',
      designation: 'Faculty',
      role: 'Subject Specialist',
      assignedClass: 'Grade 7 & Grade 8',
      subjects: ['English Literature', 'Computer Science', 'General Knowledge'],
      phone: '+91 98470 22003',
      email: 'saleeth.nk@darulirshad.edu.in',
      status: 'Active',
      joinDate: '2025-01-10',
      attendanceRate: '99.0%',
      leavesTaken: 1,
      timetable: 'Mon - Fri (9:15 AM - 2:00 PM)'
    }
  ];

  // Official Student List - 2026 (21 Students)
  const OFFICIAL_STUDENTS = [
    // Grade 8 (Class VIII - 13 Students)
    { id: 'st-801', studentId: 'DISE-2026-001', name: 'Muhammed Shalif', class: 'Grade 8', section: 'A', rollNo: 1, gender: 'Male', parentName: 'Abdul Rahiman', parentPhone: '+91 98470 11001', status: 'Active', classTeacher: 'Swalih Ahsani' },
    { id: 'st-802', studentId: 'DISE-2026-002', name: 'Muhammed Razeen', class: 'Grade 8', section: 'A', rollNo: 2, gender: 'Male', parentName: 'Koyamon Haji', parentPhone: '+91 98470 11002', status: 'Active', classTeacher: 'Swalih Ahsani' },
    { id: 'st-803', studentId: 'DISE-2026-003', name: 'Muhammed Swalih', class: 'Grade 8', section: 'A', rollNo: 3, gender: 'Male', parentName: 'Musthafa K.P', parentPhone: '+91 98470 11003', status: 'Active', classTeacher: 'Swalih Ahsani' },
    { id: 'st-804', studentId: 'DISE-2026-004', name: 'Aslah Rahman', class: 'Grade 8', section: 'A', rollNo: 4, gender: 'Male', parentName: 'Abdul Salam', parentPhone: '+91 98470 11004', status: 'Active', classTeacher: 'Swalih Ahsani' },
    { id: 'st-805', studentId: 'DISE-2026-005', name: 'Muhammed Sahad', class: 'Grade 8', section: 'A', rollNo: 5, gender: 'Male', parentName: 'Ibrahim Kutty', parentPhone: '+91 98470 11005', status: 'Active', classTeacher: 'Swalih Ahsani' },
    { id: 'st-806', studentId: 'DISE-2026-006', name: 'Fazlurahman', class: 'Grade 8', section: 'A', rollNo: 6, gender: 'Male', parentName: 'Usman Ghani', parentPhone: '+91 98470 11006', status: 'Active', classTeacher: 'Swalih Ahsani' },
    { id: 'st-807', studentId: 'DISE-2026-007', name: 'Muhammed', class: 'Grade 8', section: 'A', rollNo: 7, gender: 'Male', parentName: 'Ali Akbar', parentPhone: '+91 98470 11007', status: 'Active', classTeacher: 'Swalih Ahsani' },
    { id: 'st-808', studentId: 'DISE-2026-008', name: 'Muhammed Sinan P.P.', class: 'Grade 8', section: 'A', rollNo: 8, gender: 'Male', parentName: 'Hamza P.P.', parentPhone: '+91 98470 11008', status: 'Active', classTeacher: 'Swalih Ahsani' },
    { id: 'st-809', studentId: 'DISE-2026-009', name: 'Muhammed Faris', class: 'Grade 8', section: 'A', rollNo: 9, gender: 'Male', parentName: 'Faisal K.', parentPhone: '+91 98470 11009', status: 'Active', classTeacher: 'Swalih Ahsani' },
    { id: 'st-810', studentId: 'DISE-2026-010', name: 'Muhammed Shifinshan', class: 'Grade 8', section: 'A', rollNo: 10, gender: 'Male', parentName: 'Shafi C.H.', parentPhone: '+91 98470 11010', status: 'Active', classTeacher: 'Swalih Ahsani' },
    { id: 'st-811', studentId: 'DISE-2026-011', name: 'Hasin Riyas', class: 'Grade 8', section: 'A', rollNo: 11, gender: 'Male', parentName: 'Riyas Ahamed', parentPhone: '+91 98470 11011', status: 'Active', classTeacher: 'Swalih Ahsani' },
    { id: 'st-812', studentId: 'DISE-2026-012', name: 'Muhammad Rifaee', class: 'Grade 8', section: 'A', rollNo: 12, gender: 'Male', parentName: 'Moideen Koya', parentPhone: '+91 98470 11012', status: 'Active', classTeacher: 'Swalih Ahsani' },
    { id: 'st-813', studentId: 'DISE-2026-013', name: 'Muhammad Hammad', class: 'Grade 8', section: 'A', rollNo: 13, gender: 'Male', parentName: 'Hassan Kutty', parentPhone: '+91 98470 11013', status: 'Active', classTeacher: 'Swalih Ahsani' },

    // Grade 7 (Class VII - 8 Students)
    { id: 'st-701', studentId: 'DISE-2026-014', name: 'Muhammad Ajwad', class: 'Grade 7', section: 'A', rollNo: 1, gender: 'Male', parentName: 'Ashraf Ali', parentPhone: '+91 98470 11014', status: 'Active', classTeacher: 'Faheem Muhammed Saquafi' },
    { id: 'st-702', studentId: 'DISE-2026-015', name: 'Muhammed Sahal', class: 'Grade 7', section: 'A', rollNo: 2, gender: 'Male', parentName: 'Siddique K.T.', parentPhone: '+91 98470 11015', status: 'Active', classTeacher: 'Faheem Muhammed Saquafi' },
    { id: 'st-703', studentId: 'DISE-2026-016', name: 'Muhammad Shafi', class: 'Grade 7', section: 'A', rollNo: 3, gender: 'Male', parentName: 'Shafi Musliyar', parentPhone: '+91 98470 11016', status: 'Active', classTeacher: 'Faheem Muhammed Saquafi' },
    { id: 'st-704', studentId: 'DISE-2026-017', name: 'Ahammed Fahad', class: 'Grade 7', section: 'A', rollNo: 4, gender: 'Male', parentName: 'Fahad K.P.', parentPhone: '+91 98470 11017', status: 'Active', classTeacher: 'Faheem Muhammed Saquafi' },
    { id: 'st-705', studentId: 'DISE-2026-018', name: 'Muhammad Rithil V.V.', class: 'Grade 7', section: 'A', rollNo: 5, gender: 'Male', parentName: 'Rauf V.V.', parentPhone: '+91 98470 11018', status: 'Active', classTeacher: 'Faheem Muhammed Saquafi' },
    { id: 'st-706', studentId: 'DISE-2026-019', name: 'Sayyid Muhammed Naeem', class: 'Grade 7', section: 'A', rollNo: 6, gender: 'Male', parentName: 'Sayyid Thangal', parentPhone: '+91 98470 11019', status: 'Active', classTeacher: 'Faheem Muhammed Saquafi' },
    { id: 'st-707', studentId: 'DISE-2026-020', name: 'Muhammad Ijlan', class: 'Grade 7', section: 'A', rollNo: 7, gender: 'Male', parentName: 'Jaleel Haji', parentPhone: '+91 98470 11020', status: 'Active', classTeacher: 'Faheem Muhammed Saquafi' },
    { id: 'st-708', studentId: 'DISE-2026-021', name: 'Mueenudheen', class: 'Grade 7', section: 'A', rollNo: 8, gender: 'Male', parentName: 'Moideen Musliyar', parentPhone: '+91 98470 11021', status: 'Active', classTeacher: 'Faheem Muhammed Saquafi' }
  ];

  const INITIAL_LEAVES = [
    { id: 'lv-1', studentName: 'Muhammed Shalif', class: 'Grade 8', reason: 'Fever & Doctor Consultation', startDate: '2026-07-28', endDate: '2026-07-30', status: 'Pending', appliedDate: '2026-07-27' },
    { id: 'lv-2', studentName: 'Muhammad Ajwad', class: 'Grade 7', reason: 'Family Function in Calicut', startDate: '2026-08-01', endDate: '2026-08-02', status: 'Approved', appliedDate: '2026-07-25' },
    { id: 'lv-3', studentName: 'Aslah Rahman', class: 'Grade 8', reason: 'Urgent Personal Travel', startDate: '2026-07-29', endDate: '2026-07-29', status: 'Pending', appliedDate: '2026-07-28' }
  ];

  const INITIAL_NOTICES = [
    { id: 'nt-1', title: 'First Term Examination Schedule Published', category: 'Academic', date: '2026-07-26', content: 'The comprehensive timetable for Grade 7 and Grade 8 First Term Exams is uploaded to the document repository.', isPinned: true },
    { id: 'nt-2', title: 'Parent Teacher Association (PTA) General Body Meeting', category: 'Events', date: '2026-07-24', content: 'All parents are cordially invited to attend the Annual PTA Meeting at School Auditorium on Saturday 10:00 AM.', isPinned: true },
    { id: 'nt-3', title: 'Independence Day Cultural Celebrations', category: 'Cultural', date: '2026-07-20', content: 'Student registrations open for patriotic song, speech and quiz competitions.', isPinned: false }
  ];

  const INITIAL_DOCUMENTS = [
    { id: 'doc-1', title: 'Academic Calendar 2026-2027', category: 'Circular', size: '2.4 MB', date: '2026-06-01' },
    { id: 'doc-2', title: 'Grade 8 & 7 Islamic Studies Syllabus', category: 'Syllabus', size: '1.8 MB', date: '2026-06-10' },
    { id: 'doc-3', title: 'Faculty ERP & Staff Conduct Handbook', category: 'Handbook', size: '3.1 MB', date: '2026-06-15' }
  ];

  function getStore(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch(e) {
      return fallback;
    }
  }

  function setStore(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch(e) {}

    try {
      if (typeof firebase !== 'undefined' && firebase.database) {
        const db = firebase.database();
        if (key === STORAGE_KEYS.STUDENTS) db.ref('students').set(val);
        else if (key === STORAGE_KEYS.STAFF) db.ref('staff').set(val);
        else if (key === STORAGE_KEYS.LEAVES) db.ref('leaves').set(val);
        else if (key === STORAGE_KEYS.NOTICES) db.ref('notices').set(val);
        else if (key === STORAGE_KEYS.ATTENDANCE) db.ref('attendance').set(val);
        else if (key === STORAGE_KEYS.USER) db.ref('user').set(val);
      }
    } catch(err) {
      console.warn('Firebase Realtime Database write error:', err);
    }
  }

  function initFirebaseRealtimeSync() {
    if (typeof firebase === 'undefined' || !firebase.database) return;
    try {
      const db = firebase.database();

      // Sync Students from Firebase Realtime DB
      db.ref('students').on('value', (snapshot) => {
        const data = snapshot.val();
        state.students = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
        try { localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(state.students)); } catch(e){}
        render();
      });

      // Sync Staff from Firebase Realtime DB
      db.ref('staff').on('value', (snapshot) => {
        const data = snapshot.val();
        state.staff = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
        try { localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(state.staff)); } catch(e){}
        render();
      });

      // Sync Leaves from Firebase Realtime DB
      db.ref('leaves').on('value', (snapshot) => {
        const data = snapshot.val();
        state.leaves = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
        try { localStorage.setItem(STORAGE_KEYS.LEAVES, JSON.stringify(state.leaves)); } catch(e){}
        render();
      });

      // Sync Notices from Firebase Realtime DB
      db.ref('notices').on('value', (snapshot) => {
        const data = snapshot.val();
        state.notices = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
        try { localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(state.notices)); } catch(e){}
        render();
      });

      // Sync Attendance from Firebase Realtime DB
      db.ref('attendance').on('value', (snapshot) => {
        const data = snapshot.val();
        state.attendance = data || {};
        try { localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(state.attendance)); } catch(e){}
        render();
      });
    } catch (err) {
      console.warn('Firebase DB Sync init error:', err);
    }
  }

  let state = {
    user: getStore(STORAGE_KEYS.USER, { name: 'Bava Ahsani', role: 'admin', designation: 'Principal', email: 'principal@darulirshad.edu.in' }),
    activeTab: 'dashboard',
    leadership: SCHOOL_LEADERSHIP,
    staff: getStore(STORAGE_KEYS.STAFF, []),
    students: getStore(STORAGE_KEYS.STUDENTS, []),
    leaves: getStore(STORAGE_KEYS.LEAVES, []),
    notices: getStore(STORAGE_KEYS.NOTICES, []),
    documents: [],
    attendance: getStore(STORAGE_KEYS.ATTENDANCE, {}),
    searchQuery: '',
    selectedClass: 'All',
    selectedStaffForProfile: null,
    selectedStudentForIDCard: null,
    isAddStudentModalOpen: false,
    isAddStaffModalOpen: false,
    isAddLeaveModalOpen: false,
    isAddNoticeModalOpen: false,
    isCommandPaletteOpen: false,
    editingStudent: null,
    editingStaff: null
  };

  function showToast(title, message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `flex items-center gap-3.5 p-4 rounded-2xl shadow-2xl text-white transform transition-all duration-300 translate-y-2 border border-white/20 ${
      type === 'success' ? 'bg-gradient-to-r from-[#5C3A21] to-[#3A2313]' : type === 'error' ? 'bg-rose-700' : 'bg-gradient-to-r from-[#C49B66] to-[#9E7440]'
    }`;
    toast.innerHTML = `
      <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl font-bold">
        <i class="${type === 'success' ? 'lucide-check-circle' : 'lucide-info'} text-[#C49B66]"></i>
      </div>
      <div class="flex-1">
        <h4 class="font-extrabold text-sm tracking-tight">${title}</h4>
        <p class="text-xs opacity-90">${message}</p>
      </div>
      <button onclick="this.parentElement.remove()" class="text-white/80 hover:text-white p-1"><i class="lucide-x"></i></button>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 4000);
  }

  function render() {
    const root = document.getElementById('root');
    if (!root) return;

    if (!state.user) {
      root.innerHTML = renderLoginModal();
      return;
    }

    root.innerHTML = `
      <div class="min-h-screen bg-[#F8F6F0] dark:bg-[#140D08] text-[#2A1A0F] dark:text-[#F4F0EA] flex flex-col font-sans antialiased selection:bg-[#C49B66]/30">
        ${renderNavbar()}
        <div class="flex-1 max-w-7xl w-full mx-auto flex min-h-[calc(100vh-64px)]">
          ${renderSidebar()}
          <main class="flex-1 p-4 sm:p-6 md:p-8 min-w-0 overflow-y-auto">
            ${renderMainContent()}
          </main>
        </div>
        <div id="toast-container" class="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-auto"></div>
        ${renderModals()}
      </div>
    `;

    attachGlobalEvents();
  }

  function renderNavbar() {
    return `
      <header class="sticky top-0 z-40 glass-nav shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <button id="btn-toggle-mobile-sidebar" class="md:hidden p-2 rounded-xl text-[#5C3A21] dark:text-[#C49B66] hover:bg-[#5C3A21]/10">
              <i class="lucide-menu text-xl"></i>
            </button>
            <div class="flex items-center gap-3 cursor-pointer group" onclick="window.diseApp.setTab('dashboard')">
              <img src="logo.png" alt="DISE Official Logo" class="h-11 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
              <div class="hidden sm:block">
                <h1 class="font-extrabold text-[#5C3A21] dark:text-white tracking-tight leading-none text-base sm:text-lg font-display">DISE Executive ERP</h1>
                <p class="text-[10px] text-[#C49B66] font-bold tracking-wider uppercase">Darul Irshad School of Excellence</p>
              </div>
            </div>
          </div>

          <div class="hidden md:flex items-center flex-1 max-w-md mx-4">
            <button onclick="window.diseApp.openCommandPalette()" class="w-full flex items-center justify-between px-4 py-2 rounded-2xl bg-white/80 dark:bg-[#1F150D] border border-[#5C3A21]/15 text-xs text-slate-400 hover:border-[#5C3A21] transition shadow-inner">
              <span class="flex items-center gap-2 font-medium">
                <i class="lucide-search text-[#5C3A21]"></i> Search students, staff, leadership or classes...
              </span>
              <kbd class="px-2 py-0.5 text-[10px] font-bold bg-[#5C3A21]/10 text-[#5C3A21] dark:text-[#C49B66] rounded-md border border-[#5C3A21]/20">Ctrl + K</kbd>
            </button>
          </div>

          <div class="flex items-center gap-3">
            <div class="hidden sm:flex items-center gap-2 bg-[#5C3A21]/10 dark:bg-[#C49B66]/10 px-3.5 py-1.5 rounded-full border border-[#5C3A21]/20">
              <span class="w-2.5 h-2.5 rounded-full bg-[#C49B66] animate-pulse"></span>
              <span class="text-xs font-bold text-[#5C3A21] dark:text-[#C49B66]">${state.user.designation || 'Principal'}</span>
            </div>

            <button id="btn-theme-toggle" class="p-2.5 rounded-xl bg-white dark:bg-[#1F150D] text-[#5C3A21] dark:text-[#C49B66] border border-[#5C3A21]/20 hover:bg-[#5C3A21]/10 transition shadow-sm">
              <i class="lucide-moon dark:hidden text-lg"></i>
              <i class="lucide-sun hidden dark:block text-lg"></i>
            </button>

            <div class="relative group">
              <button class="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#5C3A21]/10 transition">
                <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5C3A21] to-[#3A2313] text-white font-bold flex items-center justify-center text-sm shadow-md">
                  ${state.user.name.charAt(0)}
                </div>
                <div class="hidden lg:block text-left pr-1">
                  <p class="text-xs font-bold text-[#2A1A0F] dark:text-white leading-tight">${state.user.name}</p>
                  <p class="text-[10px] text-[#C49B66] capitalize font-extrabold">${state.user.role}</p>
                </div>
              </button>
              <div class="absolute right-0 mt-1 w-52 bg-white dark:bg-[#1F150D] rounded-2xl shadow-2xl border border-[#5C3A21]/20 p-2 hidden group-hover:block z-50">
                <button onclick="window.diseApp.logout()" class="w-full text-left px-3.5 py-2.5 text-xs font-extrabold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl flex items-center gap-2">
                  <i class="lucide-log-out"></i> Logout Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  function renderSidebar() {
    const navItems = [
      { id: 'dashboard', label: 'Executive Dashboard', icon: 'lucide-layout-dashboard' },
      { id: 'staff', label: 'Staff Management', icon: 'lucide-user-check', badge: state.staff.length },
      { id: 'students', label: 'Student Directory', icon: 'lucide-users', badge: state.students.length },
      { id: 'attendance', label: 'Attendance Register', icon: 'lucide-clipboard-check' },
      { id: 'leave', label: 'Leave Approvals', icon: 'lucide-calendar-off', badge: state.leaves.filter(l=>l.status==='Pending').length },
      { id: 'notices', label: 'Notice Board', icon: 'lucide-megaphone', badge: state.notices.length },
      { id: 'timetable', label: 'Class Timetable', icon: 'lucide-clock' },
      { id: 'documents', label: 'Documents & Circulars', icon: 'lucide-file-text' },
      { id: 'settings', label: 'School Settings', icon: 'lucide-settings' }
    ];

    return `
      <aside class="w-64 glass-sidebar hidden md:flex flex-col py-6 px-4 shrink-0">
        <div class="px-2 mb-5 text-center">
          <div class="p-2.5 bg-[#F8F6F0] dark:bg-[#1F150D] rounded-2xl border border-[#5C3A21]/20 shadow-sm mb-2 inline-block">
            <img src="logo.png" alt="DISE Logo" class="h-16 w-auto mx-auto object-contain" />
          </div>
          <p class="text-[12px] font-black text-[#5C3A21] dark:text-[#C49B66] uppercase tracking-wider font-display">Darul Irshad</p>
          <p class="text-[9px] text-[#C49B66] font-extrabold uppercase tracking-widest">School of Excellence</p>
        </div>

        <nav class="space-y-1.5 flex-1">
          ${navItems.map(item => `
            <button onclick="window.diseApp.setTab('${item.id}')" class="w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs transition-all ${
              state.activeTab === item.id 
                ? 'bg-gradient-to-r from-[#5C3A21] to-[#3A2313] text-white shadow-lg shadow-[#5C3A21]/30 font-extrabold' 
                : 'text-[#5C3A21] dark:text-slate-300 hover:bg-[#5C3A21]/10 hover:text-[#5C3A21]'
            }">
              <div class="flex items-center gap-3">
                <i class="${item.icon} text-base ${state.activeTab === item.id ? 'text-[#C49B66]' : ''}"></i>
                <span>${item.label}</span>
              </div>
              ${item.badge ? `<span class="px-2.5 py-0.5 text-[10px] font-black rounded-full ${state.activeTab === item.id ? 'bg-[#C49B66] text-white' : 'bg-[#5C3A21]/10 text-[#5C3A21]'}">${item.badge}</span>` : ''}
            </button>
          `).join('')}
        </nav>
        
        <div class="p-4 rounded-2xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 text-center space-y-1 shadow-inner">
          <p class="text-[10px] font-extrabold text-[#5C3A21] dark:text-[#C49B66] uppercase tracking-wider">Academic Year 2026-27</p>
          <p class="text-xs font-black text-[#5C3A21] dark:text-white">Grade 7 & Grade 8</p>
          <div class="pt-1 border-t border-[#5C3A21]/10 flex justify-center gap-2">
            <span class="px-2 py-0.5 text-[9px] font-bold rounded-md bg-[#5C3A21]/10 text-[#5C3A21]">3 Faculty &bull; 21 Students</span>
          </div>
        </div>
      </aside>
    `;
  }

  function renderMainContent() {
    switch(state.activeTab) {
      case 'dashboard': return renderDashboardView();
      case 'staff': return renderStaffDirectoryView();
      case 'students': return renderStudentsView();
      case 'attendance': return renderAttendanceView();
      case 'leave': return renderLeaveView();
      case 'notices': return renderNoticesView();
      case 'timetable': return renderTimetableView();
      case 'documents': return renderDocumentsView();
      case 'settings': return renderSettingsView();
      default: return renderDashboardView();
    }
  }

  // Dashboard View with School Leadership & Faculty Overview Sections
  function renderDashboardView() {
    const pendingLeavesCount = state.leaves.filter(l => l.status === 'Pending').length;
    
    return `
      <div class="space-y-6">
        <!-- Hero Welcome Banner -->
        <div class="relative overflow-hidden glass-card p-8 rounded-3xl border-l-8 border-l-[#5C3A21] bg-gradient-to-r from-white via-[#F8F6F0] to-[#F4E8D8] dark:from-[#1F150D] dark:to-[#2A1A0F]">
          <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex items-center gap-6">
              <div class="p-3.5 bg-white dark:bg-[#140D08] rounded-3xl border border-[#5C3A21]/20 shadow-xl bronze-glow">
                <img src="logo.png" alt="DISE Logo" class="h-20 w-auto object-contain" />
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h2 class="text-2xl sm:text-3xl font-black text-[#5C3A21] dark:text-white tracking-tight font-display">Assalamu Alaikum, ${state.user.name}!</h2>
                  <span class="px-2.5 py-0.5 rounded-full bg-[#C49B66] text-white text-[10px] font-black uppercase">Official Portal</span>
                </div>
                <p class="text-xs text-[#C49B66] font-extrabold mt-1">Darul Irshad School of Excellence ERP Portal 2026</p>
                <p class="text-xs text-slate-500 mt-0.5">Faculty Management & Grade 7 / Grade 8 Student Register.</p>
              </div>
            </div>
            <div class="flex items-center gap-3 w-full md:w-auto justify-end">
              <button onclick="window.diseApp.setTab('staff')" class="px-4 py-2.5 bg-white dark:bg-[#1F150D] border border-[#5C3A21]/30 hover:bg-[#5C3A21]/10 text-[#5C3A21] dark:text-white font-extrabold text-xs rounded-2xl shadow-md transition flex items-center gap-2">
                <i class="lucide-user-check text-[#C49B66]"></i> Staff Directory
              </button>
              <button onclick="window.diseApp.openAddStudentModal()" class="px-5 py-2.5 bg-[#5C3A21] hover:bg-[#3A2313] text-white font-extrabold text-xs rounded-2xl shadow-xl transition flex items-center gap-2">
                <i class="lucide-user-plus text-[#C49B66]"></i> Add Student
              </button>
            </div>
          </div>
        </div>

        <!-- 1. School Leadership Section -->
        <div class="glass-card p-6 rounded-3xl space-y-4 border-t-4 border-t-[#5C3A21]">
          <div class="flex items-center justify-between border-b border-[#5C3A21]/15 pb-3">
            <div>
              <h3 class="font-extrabold text-[#5C3A21] dark:text-white text-lg font-display flex items-center gap-2">
                <i class="lucide-award text-[#C49B66]"></i> School Leadership
              </h3>
              <p class="text-xs text-slate-400">Institutional Governance & Executive Administration</p>
            </div>
            <span class="px-3 py-1 rounded-full bg-[#5C3A21]/10 text-[#5C3A21] dark:text-[#C49B66] text-xs font-black">DISE Board</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 rounded-2xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5C3A21] to-[#3A2313] text-white flex items-center justify-center text-xl font-bold shadow-md border border-[#C49B66]">
                <i class="lucide-crown"></i>
              </div>
              <div>
                <span class="text-[10px] font-black text-[#C49B66] uppercase tracking-wider">Chairman</span>
                <h4 class="font-black text-sm text-[#5C3A21] dark:text-white font-display">${state.leadership.chairman}</h4>
                <p class="text-[10px] text-slate-400">Darul Irshad School of Excellence</p>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5C3A21] to-[#3A2313] text-white flex items-center justify-center text-xl font-bold shadow-md border border-[#C49B66]">
                <i class="lucide-graduation-cap"></i>
              </div>
              <div>
                <span class="text-[10px] font-black text-[#C49B66] uppercase tracking-wider">Principal</span>
                <h4 class="font-black text-sm text-[#5C3A21] dark:text-white font-display">${state.leadership.principal}</h4>
                <p class="text-[10px] text-slate-400">Head of Institution</p>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5C3A21] to-[#3A2313] text-white flex items-center justify-center text-xl font-bold shadow-md border border-[#C49B66]">
                <i class="lucide-shield-check"></i>
              </div>
              <div>
                <span class="text-[10px] font-black text-[#C49B66] uppercase tracking-wider">Vice Principal</span>
                <h4 class="font-black text-sm text-[#5C3A21] dark:text-white font-display">${state.leadership.vicePrincipal}</h4>
                <p class="text-[10px] text-slate-400">Academic Operations</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Faculty Overview Section -->
        <div class="glass-card p-6 rounded-3xl space-y-4 border-t-4 border-t-[#C49B66]">
          <div class="flex items-center justify-between border-b border-[#5C3A21]/15 pb-3">
            <div>
              <h3 class="font-extrabold text-[#5C3A21] dark:text-white text-lg font-display flex items-center gap-2">
                <i class="lucide-users text-[#C49B66]"></i> Faculty Overview
              </h3>
              <p class="text-xs text-slate-400">Teaching Staff & Class Teacher Assignments</p>
            </div>
            <button onclick="window.diseApp.setTab('staff')" class="text-xs font-bold text-[#C49B66] hover:underline flex items-center gap-1">
              View Staff Directory <i class="lucide-arrow-right text-xs"></i>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${state.staff.map(f => `
              <div onclick="window.diseApp.viewStaffProfile('${f.id}')" class="p-4 rounded-2xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 hover:border-[#5C3A21] transition cursor-pointer space-y-2">
                <div class="flex items-center justify-between">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                    f.role === 'Class Teacher' ? 'bg-[#5C3A21] text-white' : 'bg-[#C49B66] text-white'
                  }">${f.role}</span>
                  <span class="text-[10px] font-mono text-[#C49B66] font-bold">${f.assignedClass}</span>
                </div>
                <h4 class="font-extrabold text-sm text-[#2A1A0F] dark:text-white">${f.name}</h4>
                <p class="text-[11px] text-slate-500 font-medium">${f.designation} &bull; ${f.subjects.join(', ')}</p>
                <div class="pt-2 border-t border-[#5C3A21]/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>${f.phone}</span>
                  <span class="text-[#C49B66] font-bold">Profile &rarr;</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Metric Stat Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="glass-card p-5 rounded-3xl border-l-4 border-l-[#5C3A21]">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-extrabold text-slate-500 uppercase">Total Enrolled Students</p>
                <h3 class="text-3xl font-black text-[#5C3A21] dark:text-white mt-1 font-display">${state.students.length}</h3>
              </div>
              <div class="w-12 h-12 rounded-2xl bg-[#5C3A21]/10 text-[#5C3A21] flex items-center justify-center text-xl font-bold">
                <i class="lucide-graduation-cap"></i>
              </div>
            </div>
            <p class="text-[10px] text-[#C49B66] font-bold mt-3">Grade 8 (13) &bull; Grade 7 (8)</p>
          </div>

          <div class="glass-card p-5 rounded-3xl border-l-4 border-l-emerald-600">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-extrabold text-slate-500 uppercase">Today's Attendance</p>
                <h3 class="text-3xl font-black text-[#5C3A21] dark:text-white mt-1 font-display">100%</h3>
              </div>
              <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xl font-bold">
                <i class="lucide-check-circle-2"></i>
              </div>
            </div>
            <p class="text-[10px] text-emerald-600 font-bold mt-3">All 21 Students Present</p>
          </div>

          <div class="glass-card p-5 rounded-3xl border-l-4 border-l-[#C49B66]">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-extrabold text-slate-500 uppercase">Pending Leaves</p>
                <h3 class="text-3xl font-black text-[#5C3A21] dark:text-white mt-1 font-display">${pendingLeavesCount}</h3>
              </div>
              <div class="w-12 h-12 rounded-2xl bg-[#C49B66]/10 text-[#C49B66] flex items-center justify-center text-xl font-bold">
                <i class="lucide-clock"></i>
              </div>
            </div>
            <p class="text-[10px] text-[#C49B66] font-bold mt-3 cursor-pointer" onclick="window.diseApp.setTab('leave')">Review Requests &rarr;</p>
          </div>

          <div class="glass-card p-5 rounded-3xl border-l-4 border-l-purple-600">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-extrabold text-slate-500 uppercase">Active Faculty</p>
                <h3 class="text-3xl font-black text-[#5C3A21] dark:text-white mt-1 font-display">${state.staff.length} Teachers</h3>
              </div>
              <div class="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center text-xl font-bold">
                <i class="lucide-user-check"></i>
              </div>
            </div>
            <p class="text-[10px] text-purple-600 font-bold mt-3">Class & Subject Teachers</p>
          </div>
        </div>

        <!-- Class Management Summary -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="glass-card p-6 rounded-3xl space-y-4">
            <div class="flex items-center justify-between border-b border-[#5C3A21]/15 pb-3">
              <h3 class="font-extrabold text-[#5C3A21] dark:text-white text-base font-display">Grade 7 Management</h3>
              <span class="px-2.5 py-0.5 rounded-full bg-[#5C3A21] text-white text-[10px] font-bold">8 Students</span>
            </div>
            <div class="flex items-center gap-4 p-4 rounded-2xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20">
              <div class="w-12 h-12 rounded-2xl bg-[#5C3A21] text-white font-black flex items-center justify-center text-lg">
                F
              </div>
              <div>
                <span class="text-[10px] text-[#C49B66] font-bold uppercase">Class Teacher</span>
                <h4 class="font-black text-sm text-[#2A1A0F] dark:text-white">Faheem Muhammed Saquafi</h4>
                <p class="text-[11px] text-slate-500">Designation: Faculty &bull; Grade 7</p>
              </div>
            </div>
          </div>

          <div class="glass-card p-6 rounded-3xl space-y-4">
            <div class="flex items-center justify-between border-b border-[#5C3A21]/15 pb-3">
              <h3 class="font-extrabold text-[#5C3A21] dark:text-white text-base font-display">Grade 8 Management</h3>
              <span class="px-2.5 py-0.5 rounded-full bg-[#C49B66] text-white text-[10px] font-bold">13 Students</span>
            </div>
            <div class="flex items-center gap-4 p-4 rounded-2xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20">
              <div class="w-12 h-12 rounded-2xl bg-[#C49B66] text-white font-black flex items-center justify-center text-lg">
                S
              </div>
              <div>
                <span class="text-[10px] text-[#C49B66] font-bold uppercase">Class Teacher</span>
                <h4 class="font-black text-sm text-[#2A1A0F] dark:text-white">Swalih Ahsani</h4>
                <p class="text-[11px] text-slate-500">Designation: Faculty &bull; Grade 8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Staff Directory View
  function renderStaffDirectoryView() {
    const isAdmin = state.user && state.user.role === 'admin';
    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl">
          <div>
            <h2 class="text-xl font-extrabold text-[#5C3A21] dark:text-white font-display">Staff Directory & Faculty Profiles</h2>
            <p class="text-xs text-slate-500 mt-1">Darul Irshad School of Excellence &bull; Academic Teaching Staff</p>
          </div>
          ${isAdmin ? `
            <button onclick="window.diseApp.openAddStaffModal()" class="px-4 py-2.5 bg-[#5C3A21] text-white font-bold text-xs rounded-2xl shadow-lg hover:bg-[#3A2313] transition flex items-center gap-2">
              <i class="lucide-user-plus text-[#C49B66]"></i> Add Faculty Member
            </button>
          ` : `
            <span class="px-3 py-1 rounded-full bg-[#5C3A21]/10 text-[#5C3A21] text-xs font-bold font-mono">Faculty Directory View</span>
          `}
        </div>

        <div class="glass-card rounded-3xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-[#5C3A21]/10 border-b border-[#5C3A21]/20 text-[#5C3A21] font-black uppercase text-[10px] tracking-wider">
                <tr>
                  <th class="p-4">Staff ID</th>
                  <th class="p-4">Faculty Name</th>
                  <th class="p-4">Designation</th>
                  <th class="p-4">Role</th>
                  <th class="p-4">Assigned Class</th>
                  <th class="p-4">Contact Information</th>
                  <th class="p-4 text-center">Status</th>
                  <th class="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#5C3A21]/10">
                ${state.staff.map(f => `
                  <tr class="hover:bg-[#5C3A21]/5 transition">
                    <td class="p-4 font-mono font-bold text-[#5C3A21] dark:text-[#C49B66]">${f.staffId}</td>
                    <td class="p-4 font-extrabold text-[#2A1A0F] dark:text-white text-sm">${f.name}</td>
                    <td class="p-4 font-semibold text-slate-600 dark:text-slate-300">${f.designation}</td>
                    <td class="p-4 font-bold"><span class="px-2.5 py-1 rounded-lg bg-[#5C3A21]/10 text-[#5C3A21] font-bold text-xs">${f.role}</span></td>
                    <td class="p-4 font-bold text-[#C49B66]">${f.assignedClass}</td>
                    <td class="p-4 font-mono text-slate-500">${f.phone}<br/><span class="text-[10px] text-slate-400">${f.email}</span></td>
                    <td class="p-4 text-center"><span class="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-600">${f.status}</span></td>
                    <td class="p-4 text-center">
                      <div class="flex items-center justify-center gap-1.5">
                        <button onclick="window.diseApp.viewStaffProfile('${f.id}')" class="px-2.5 py-1 bg-[#5C3A21] hover:bg-[#3A2313] text-white font-bold text-[10px] rounded-xl shadow transition flex items-center gap-1">
                          <i class="lucide-user text-xs text-[#C49B66]"></i> Profile
                        </button>
                        ${isAdmin ? `
                          <button onclick="window.diseApp.openEditStaffModal('${f.id}')" class="px-2.5 py-1 bg-[#C49B66] hover:bg-[#a67c4b] text-white font-bold text-[10px] rounded-xl shadow transition flex items-center gap-1">
                            <i class="lucide-edit text-xs"></i> Edit
                          </button>
                          <button onclick="window.diseApp.deleteStaff('${f.id}')" class="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] rounded-xl shadow transition flex items-center gap-1">
                            <i class="lucide-trash-2 text-xs"></i> Delete
                          </button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // Student Directory View
  function renderStudentsView() {
    const isTeacher = state.user && state.user.role === 'teacher';
    const userAssignedClass = state.user ? state.user.assignedClass : null;
    
    const filtered = state.students.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || s.studentId.toLowerCase().includes(state.searchQuery.toLowerCase());
      const classFilter = userAssignedClass || state.selectedClass;
      const matchesClass = classFilter === 'All' || s.class === classFilter;
      return matchesSearch && matchesClass;
    });

    const classesList = userAssignedClass ? [userAssignedClass] : ['All', 'Grade 8', 'Grade 7'];

    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl">
          <div>
            <h2 class="text-xl font-extrabold text-[#5C3A21] dark:text-white font-display">Official Students Directory (2026)</h2>
            <p class="text-xs text-slate-500 mt-1">
              ${userAssignedClass ? `Viewing Class Register: <b>${userAssignedClass}</b> (${filtered.length} Students)` : 'Grade 7 & Grade 8 &bull; Total 21 Students Enrolled'}
            </p>
          </div>
          <div class="flex gap-2">
            <button onclick="window.diseApp.exportStudentCSV()" class="px-4 py-2.5 bg-white dark:bg-[#1F150D] border border-[#5C3A21]/30 hover:bg-[#5C3A21]/10 text-[#5C3A21] dark:text-white font-extrabold text-xs rounded-2xl shadow-md transition flex items-center gap-2">
              <i class="lucide-download text-[#C49B66]"></i> Export CSV
            </button>
            <button onclick="window.diseApp.openAddStudentModal()" class="px-4 py-2.5 bg-[#5C3A21] text-white font-bold text-xs rounded-2xl shadow-lg hover:bg-[#3A2313] transition flex items-center gap-2">
              <i class="lucide-plus text-[#C49B66]"></i> Add Student
            </button>
          </div>
        </div>

        <div class="glass-card p-4 rounded-3xl flex flex-col sm:flex-row items-center gap-4">
          <div class="relative w-full sm:flex-1">
            <i class="lucide-search absolute left-4 top-3 text-[#5C3A21] text-sm"></i>
            <input type="text" value="${state.searchQuery}" oninput="window.diseApp.setSearch(this.value)" placeholder="Search student name in ${userAssignedClass || 'all classes'}..." class="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 text-xs font-semibold focus:outline-none focus:border-[#5C3A21]" />
          </div>
          ${!userAssignedClass ? `
            <div class="w-full sm:w-56">
              <select onchange="window.diseApp.setClassFilter(this.value)" class="w-full px-4 py-2.5 rounded-2xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 text-xs font-bold focus:outline-none focus:border-[#5C3A21]">
                ${classesList.map(c => `<option value="${c}" ${state.selectedClass === c ? 'selected' : ''}>${c === 'All' ? 'All Classes (21 Students)' : c}</option>`).join('')}
              </select>
            </div>
          ` : `
            <span class="px-4 py-2.5 rounded-2xl bg-[#5C3A21]/10 text-[#5C3A21] font-extrabold text-xs font-mono">
              ${userAssignedClass} Register (${filtered.length} Students)
            </span>
          `}
        </div>

        <div class="glass-card rounded-3xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-[#5C3A21]/10 border-b border-[#5C3A21]/20 text-[#5C3A21] font-black uppercase text-[10px] tracking-wider">
                <tr>
                  <th class="p-4">No.</th>
                  <th class="p-4">Admission ID</th>
                  <th class="p-4">Student Name</th>
                  <th class="p-4">Class</th>
                  <th class="p-4">Class Teacher</th>
                  <th class="p-4">Parent Name</th>
                  <th class="p-4">Contact Phone</th>
                  <th class="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#5C3A21]/10">
                ${filtered.length ? filtered.map(st => `
                  <tr class="hover:bg-[#5C3A21]/5 transition">
                    <td class="p-4 font-mono font-bold text-[#5C3A21] dark:text-[#C49B66]">${st.rollNo}</td>
                    <td class="p-4 font-mono font-semibold text-slate-500">${st.studentId}</td>
                    <td class="p-4 font-extrabold text-[#2A1A0F] dark:text-white text-sm">${st.name}</td>
                    <td class="p-4 font-semibold"><span class="px-2.5 py-1 rounded-lg bg-[#5C3A21]/10 text-[#5C3A21] font-bold text-xs">${st.class}</span></td>
                    <td class="p-4 text-slate-600 dark:text-slate-300 font-bold">${st.classTeacher}</td>
                    <td class="p-4 text-slate-600 dark:text-slate-300">${st.parentName}</td>
                    <td class="p-4 font-mono text-slate-500">${st.parentPhone}</td>
                    <td class="p-4 text-center">
                      <div class="flex items-center justify-center gap-1.5">
                        <button onclick="window.diseApp.openEditStudentModal('${st.id}')" class="px-2.5 py-1 bg-[#5C3A21] hover:bg-[#3A2313] text-white font-bold text-[10px] rounded-xl shadow transition flex items-center gap-1">
                          <i class="lucide-edit text-xs text-[#C49B66]"></i> Edit
                        </button>
                        <button onclick="window.diseApp.generateIDCard('${st.id}')" class="px-2.5 py-1 bg-[#C49B66] hover:bg-[#9E7440] text-white font-bold text-[10px] rounded-xl shadow transition flex items-center gap-1">
                          <i class="lucide-id-card text-xs"></i> ID Card
                        </button>
                        <button onclick="window.diseApp.deleteStudent('${st.id}')" class="px-2 py-1 bg-rose-500/10 hover:bg-rose-600 text-rose-600 hover:text-white font-bold text-[10px] rounded-xl transition flex items-center gap-1" title="Delete Student">
                          <i class="lucide-trash-2 text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('') : `
                  <tr>
                    <td colspan="8" class="p-8 text-center text-slate-400 font-medium">No matching student records found.</td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // Attendance Register View
  function renderAttendanceView() {
    const today = new Date().toISOString().split('T')[0];
    const isTeacher = state.user && state.user.role === 'teacher';
    const userAssignedClass = state.user ? state.user.assignedClass : null;
    const classList = userAssignedClass ? [userAssignedClass] : ['Grade 8', 'Grade 7'];
    const activeClass = userAssignedClass || (state.selectedClass === 'All' ? 'Grade 8' : state.selectedClass);
    const studentsInClass = state.students.filter(s => s.class === activeClass);
    
    // Check saved attendance for active date
    const todayRecords = (state.attendance && state.attendance[today]) ? state.attendance[today] : {};

    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-xl font-extrabold text-[#5C3A21] dark:text-white font-display">Daily Attendance Register</h2>
              ${isTeacher ? `
                <span class="px-2.5 py-0.5 rounded-full bg-[#5C3A21] text-white text-[10px] font-bold flex items-center gap-1">
                  <i class="lucide-lock text-xs text-[#C49B66]"></i> Class Teacher Restricted: ${userAssignedClass}
                </span>
              ` : `
                <span class="px-2.5 py-0.5 rounded-full bg-[#C49B66] text-white text-[10px] font-bold">Principal Admin Mode</span>
              `}
            </div>
            <p class="text-xs text-slate-500 mt-1">
              ${isTeacher ? `Only <b>${state.user.name}</b> (${userAssignedClass} Class Teacher) can mark attendance for ${userAssignedClass}.` : 'Full Administrative Access to all Class Registers.'}
            </p>
          </div>
          <div class="flex gap-3">
            <input type="date" value="${today}" class="px-4 py-2 rounded-2xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 text-xs font-bold text-[#5C3A21] dark:text-white" />
            <button onclick="window.diseApp.saveAttendance()" class="px-5 py-2.5 bg-[#5C3A21] text-white font-bold text-xs rounded-2xl shadow-lg hover:bg-[#3A2313] transition flex items-center gap-2 font-display">
              <i class="lucide-save text-[#C49B66]"></i> Save Register
            </button>
          </div>
        </div>

        ${!userAssignedClass ? `
          <div class="flex gap-2 overflow-x-auto pb-2">
            ${classList.map(c => `
              <button onclick="window.diseApp.setClassFilter('${c}')" class="px-5 py-2 rounded-2xl font-bold text-xs transition ${
                activeClass === c ? 'bg-[#5C3A21] text-white shadow-md' : 'bg-white dark:bg-[#1F150D] text-[#5C3A21] dark:text-slate-300 border border-[#5C3A21]/20'
              }">${c} (${state.students.filter(s=>s.class===c).length} Students)</button>
            `).join('')}
          </div>
        ` : `
          <div class="p-3.5 rounded-2xl bg-[#5C3A21]/10 border border-[#5C3A21]/20 flex items-center justify-between text-xs font-bold text-[#5C3A21] dark:text-[#C49B66]">
            <span class="flex items-center gap-2">
              <i class="lucide-shield-check text-base"></i> Logged in as Class Teacher of <b>${userAssignedClass}</b> (${state.user.name})
            </span>
            <span class="text-[10px] uppercase font-black bg-[#5C3A21] text-white px-2 py-0.5 rounded-md">Locked Register</span>
          </div>
        `}

        <div class="glass-card rounded-3xl p-6 space-y-4">
          <div class="flex items-center justify-between border-b border-[#5C3A21]/15 pb-3">
            <h3 class="font-extrabold text-[#5C3A21] dark:text-white text-sm">Attendance List for ${activeClass} (${studentsInClass.length} Students)</h3>
            <span class="px-3 py-1 rounded-full bg-[#5C3A21]/10 text-[#5C3A21] text-xs font-bold font-mono">Official Register</span>
          </div>
          <div class="space-y-3">
            ${studentsInClass.map((st) => {
              const prevAtt = todayRecords[st.id] ? todayRecords[st.id].status : 'Present';
              return `
                <div class="flex items-center justify-between p-4 rounded-2xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/15">
                  <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-xl bg-[#5C3A21]/10 text-[#5C3A21] font-bold text-xs flex items-center justify-center font-mono">${st.rollNo}</span>
                    <div>
                      <h4 class="font-bold text-xs text-[#2A1A0F] dark:text-white">${st.name}</h4>
                      <p class="text-[10px] text-slate-400 font-mono">${st.studentId} &bull; Class Teacher: ${st.classTeacher}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <label class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold text-xs cursor-pointer hover:bg-emerald-500/20">
                      <input type="radio" name="att-${st.id}" value="Present" ${prevAtt === 'Present' ? 'checked' : ''} class="accent-emerald-600" /> Present
                    </label>
                    <label class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 font-bold text-xs cursor-pointer hover:bg-rose-500/20">
                      <input type="radio" name="att-${st.id}" value="Absent" ${prevAtt === 'Absent' ? 'checked' : ''} class="accent-rose-600" /> Absent
                    </label>
                    <label class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C49B66]/10 text-[#5C3A21] font-bold text-xs cursor-pointer hover:bg-[#C49B66]/20">
                      <input type="radio" name="att-${st.id}" value="Late" ${prevAtt === 'Late' ? 'checked' : ''} class="accent-[#C49B66]" /> Late
                    </label>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="pt-4 border-t border-[#5C3A21]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-xs text-slate-500 font-bold">
              Select Present / Absent / Late for each student in ${activeClass}, then click Submit.
            </p>
            <button onclick="window.diseApp.saveAttendance()" class="w-full sm:w-auto px-8 py-3.5 bg-[#5C3A21] hover:bg-[#3A2313] text-white font-black text-xs rounded-2xl shadow-xl transition flex items-center justify-center gap-2 font-display">
              <i class="lucide-check-circle text-[#C49B66] text-base"></i> Submit Daily Attendance (${activeClass})
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Leave Approvals View
  function renderLeaveView() {
    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl">
          <div>
            <h2 class="text-xl font-extrabold text-[#5C3A21] dark:text-white font-display">Leave Approvals & Requests</h2>
            <p class="text-xs text-slate-500 mt-1">Review student & faculty leave requests.</p>
          </div>
          <button onclick="window.diseApp.openAddLeaveModal()" class="px-4 py-2.5 bg-[#5C3A21] text-white font-bold text-xs rounded-2xl shadow-lg hover:bg-[#3A2313] transition flex items-center gap-2">
            <i class="lucide-plus text-[#C49B66]"></i> Submit Leave Request
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${state.leaves.map(lv => `
            <div class="glass-card p-5 rounded-3xl space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="font-extrabold text-sm text-[#5C3A21] dark:text-white">${lv.studentName} (${lv.class})</h4>
                <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                  lv.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-600' : lv.status === 'Rejected' ? 'bg-rose-500/10 text-rose-600' : 'bg-[#C49B66]/10 text-[#5C3A21]'
                }">${lv.status}</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 font-medium">${lv.reason}</p>
              <div class="flex items-center justify-between text-[11px] text-slate-400 font-mono border-t border-[#5C3A21]/10 pt-3">
                <span>Duration: ${lv.startDate} to ${lv.endDate}</span>
                <span>Applied: ${lv.appliedDate}</span>
              </div>
              ${lv.status === 'Pending' ? `
                <div class="flex gap-2 pt-1">
                  <button onclick="window.diseApp.updateLeaveStatus('${lv.id}', 'Approved')" class="flex-1 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700">Approve</button>
                  <button onclick="window.diseApp.updateLeaveStatus('${lv.id}', 'Rejected')" class="flex-1 py-1.5 bg-rose-600 text-white font-bold text-xs rounded-xl hover:bg-rose-700">Reject</button>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Notice Board View
  function renderNoticesView() {
    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl">
          <div>
            <h2 class="text-xl font-extrabold text-[#5C3A21] dark:text-white font-display">Notice Board & Announcements</h2>
            <p class="text-xs text-slate-500 mt-1">Official circulars for staff and students.</p>
          </div>
          <button onclick="window.diseApp.openAddNoticeModal()" class="px-4 py-2.5 bg-[#5C3A21] text-white font-bold text-xs rounded-2xl shadow-lg hover:bg-[#3A2313] transition flex items-center gap-2">
            <i class="lucide-plus text-[#C49B66]"></i> Post Announcement
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${state.notices.map(nt => `
            <div class="glass-card p-6 rounded-3xl space-y-3 border-t-4 border-t-[#5C3A21] flex flex-col justify-between">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="px-2.5 py-0.5 rounded-lg text-[10px] font-black bg-[#5C3A21]/10 text-[#5C3A21]">${nt.category}</span>
                  <span class="text-[10px] text-slate-400 font-mono">${nt.date}</span>
                </div>
                <h3 class="font-extrabold text-sm text-[#2A1A0F] dark:text-white">${nt.title}</h3>
                <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">${nt.content}</p>
              </div>
              <div class="pt-3 border-t border-[#5C3A21]/10 flex justify-between items-center text-[10px] text-slate-400">
                <span>By: School Administration</span>
                ${nt.isPinned ? '<span class="text-[#C49B66] font-bold flex items-center gap-1"><i class="lucide-pin"></i> Pinned</span>' : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Timetable View
  function renderTimetableView() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const periods = ['8:30 - 9:15 AM', '9:15 - 10:00 AM', '10:15 - 11:00 AM', '11:00 - 11:45 AM'];
    const teachersMap = {
      'Islamic Studies': 'Faheem Muhammed Saquafi',
      'Arabic Literature': 'Faheem Muhammed Saquafi',
      'Mathematics': 'Swalih Ahsani',
      'General Science': 'Swalih Ahsani',
      'English Literature': 'Muhameed Saleeth N.K',
      'Computer Science': 'Muhameed Saleeth N.K'
    };
    const subjects = Object.keys(teachersMap);

    return `
      <div class="space-y-6">
        <div class="glass-card p-6 rounded-3xl">
          <h2 class="text-xl font-extrabold text-[#5C3A21] dark:text-white font-display">Class Timetable (Grade 7 & Grade 8)</h2>
          <p class="text-xs text-slate-500 mt-1 font-medium">Faculty period assignments and classroom timetable.</p>
        </div>

        <div class="glass-card rounded-3xl overflow-hidden p-4">
          <div class="overflow-x-auto">
            <table class="w-full text-center text-xs">
              <thead>
                <tr class="bg-[#5C3A21]/10 text-[#5C3A21] font-black text-[10px]">
                  <th class="p-3 text-left">Day</th>
                  ${periods.map(p => `<th class="p-3">${p}</th>`).join('')}
                </tr>
              </thead>
              <tbody class="divide-y divide-[#5C3A21]/10 font-semibold">
                ${days.map((day, di) => `
                  <tr>
                    <td class="p-3 text-left font-bold text-[#5C3A21] dark:text-[#C49B66]">${day}</td>
                    ${periods.map((_, pi) => {
                      const subj = subjects[(di + pi) % subjects.length];
                      const teacher = teachersMap[subj];
                      return `
                        <td class="p-3">
                          <div class="p-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/15 text-[#2A1A0F] dark:text-white">
                            <p class="font-bold text-[11px]">${subj}</p>
                            <p class="text-[9px] text-[#C49B66] font-bold mt-0.5">${teacher}</p>
                          </div>
                        </td>
                      `;
                    }).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // Documents View
  function renderDocumentsView() {
    return `
      <div class="space-y-6">
        <div class="glass-card p-6 rounded-3xl">
          <h2 class="text-xl font-extrabold text-[#5C3A21] dark:text-white font-display">Document Repository</h2>
          <p class="text-xs text-slate-500 mt-1">Official circulars, handbooks and syllabus downloads.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${state.documents.map(doc => `
            <div class="glass-card p-5 rounded-3xl flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-[#5C3A21]/10 text-[#5C3A21] flex items-center justify-center text-lg font-bold">
                  <i class="lucide-file-text"></i>
                </div>
                <div>
                  <h4 class="font-bold text-xs text-[#2A1A0F] dark:text-white">${doc.title}</h4>
                  <p class="text-[10px] text-slate-400 font-mono">${doc.size} &bull; ${doc.date}</p>
                </div>
              </div>
              <button onclick="window.diseApp.downloadDoc('${doc.title}')" class="p-2.5 rounded-xl bg-[#5C3A21] text-white hover:bg-[#3A2313] transition">
                <i class="lucide-download text-xs text-[#C49B66]"></i>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Settings View
  function renderSettingsView() {
    return `
      <div class="space-y-6">
        <div class="glass-card p-6 rounded-3xl">
          <h2 class="text-xl font-extrabold text-[#5C3A21] dark:text-white font-display">School ERP Configuration</h2>
          <p class="text-xs text-slate-500 mt-1">Manage institutional leadership & ERP metadata.</p>
        </div>

        <div class="glass-card p-6 rounded-3xl max-w-2xl space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">School Name</label>
            <input type="text" value="Darul Irshad School of Excellence" readonly class="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-bold" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Chairman</label>
            <input type="text" value="${state.leadership.chairman}" readonly class="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-bold text-[#5C3A21]" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Principal</label>
            <input type="text" value="${state.leadership.principal}" readonly class="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-bold text-[#5C3A21]" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Vice Principal</label>
            <input type="text" value="${state.leadership.vicePrincipal}" readonly class="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-bold text-[#5C3A21]" />
          </div>
          <button onclick="alert('Institutional leadership configuration saved.')" class="px-6 py-2.5 bg-[#5C3A21] text-white font-bold rounded-xl shadow hover:bg-[#3A2313]">Save Settings</button>
        </div>
      </div>
    `;
  }

  // Modals Engine: Faculty Staff Profile Modal, Digital ID Card, Command Palette
  function renderModals() {
    // 1. Staff Profile Detailed Modal
    if (state.selectedStaffForProfile) {
      const f = state.selectedStaffForProfile;
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div class="glass-modal w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-6 text-left border-2 border-[#5C3A21]">
            <div class="flex items-center justify-between border-b border-[#5C3A21]/20 pb-3">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-[#5C3A21] text-white text-[10px] font-black uppercase">Faculty Profile</span>
                <span class="text-xs font-mono font-bold text-[#C49B66]">${f.staffId}</span>
              </div>
              <button onclick="window.diseApp.closeModals()" class="text-slate-400 hover:text-slate-600"><i class="lucide-x text-lg"></i></button>
            </div>

            <div class="flex items-center gap-5 p-4 rounded-2xl bg-[#F8F6F0] border border-[#5C3A21]/20">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5C3A21] to-[#3A2313] text-white font-black flex items-center justify-center text-2xl shadow-lg border-2 border-[#C49B66]">
                ${f.name.charAt(0)}
              </div>
              <div>
                <h3 class="text-lg font-black text-[#2A1A0F] font-display">${f.name}</h3>
                <p class="text-xs text-[#C49B66] font-bold">${f.designation} &bull; ${f.role}</p>
                <p class="text-[11px] text-slate-500">Assigned Class: <span class="font-bold text-[#5C3A21]">${f.assignedClass}</span></p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-xl bg-white border border-[#5C3A21]/15 space-y-1">
                <span class="text-[10px] text-slate-400 font-extrabold uppercase">Subjects Taught</span>
                <p class="font-bold text-[#5C3A21]">${f.subjects.join(', ')}</p>
              </div>
              <div class="p-3 rounded-xl bg-white border border-[#5C3A21]/15 space-y-1">
                <span class="text-[10px] text-slate-400 font-extrabold uppercase">Join Date</span>
                <p class="font-bold text-[#2A1A0F]">${f.joinDate}</p>
              </div>
              <div class="p-3 rounded-xl bg-white border border-[#5C3A21]/15 space-y-1">
                <span class="text-[10px] text-slate-400 font-extrabold uppercase">Timetable Schedule</span>
                <p class="font-mono text-slate-600 text-[11px]">${f.timetable}</p>
              </div>
              <div class="p-3 rounded-xl bg-white border border-[#5C3A21]/15 space-y-1">
                <span class="text-[10px] text-slate-400 font-extrabold uppercase">Attendance Record</span>
                <p class="font-extrabold text-emerald-600">${f.attendanceRate} (Leaves Taken: ${f.leavesTaken})</p>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-[#F8F6F0] border border-[#5C3A21]/15 text-xs space-y-1">
              <span class="text-[10px] text-slate-400 font-extrabold uppercase">Contact Details</span>
              <p class="font-mono font-bold text-[#5C3A21]">${f.phone} &bull; ${f.email}</p>
            </div>

            <div class="flex gap-2">
              <button onclick="window.diseApp.closeModals()" class="w-full py-2.5 rounded-2xl font-bold bg-[#5C3A21] text-white hover:bg-[#3A2313] text-xs shadow">Close Profile</button>
            </div>
          </div>
        </div>
      `;
    }

    // 2. Digital Student ID Card Modal
    if (state.selectedStudentForIDCard) {
      const st = state.selectedStudentForIDCard;
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div class="glass-modal w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-6 text-center border-2 border-[#C49B66]">
            <div class="flex items-center justify-between border-b border-[#5C3A21]/20 pb-3">
              <span class="text-xs font-black text-[#5C3A21] uppercase tracking-wider">Official Student ID Card</span>
              <button onclick="window.diseApp.closeModals()" class="text-slate-400 hover:text-slate-600"><i class="lucide-x text-lg"></i></button>
            </div>

            <div class="id-card-bg p-6 rounded-3xl border-2 border-[#C49B66] shadow-xl text-center space-y-4 relative overflow-hidden">
              <img src="logo.png" alt="Logo" class="h-16 w-auto mx-auto object-contain" />
              <div>
                <h3 class="font-black text-sm text-[#5C3A21] tracking-tight uppercase">Darul Irshad School of Excellence</h3>
                <p class="text-[9px] text-[#C49B66] font-extrabold uppercase tracking-widest">Student Identity Card 2026</p>
              </div>

              <div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#5C3A21] to-[#3A2313] text-white flex items-center justify-center text-2xl font-black shadow-lg border-2 border-[#C49B66]">
                ${st.name.charAt(0)}
              </div>

              <div>
                <h2 class="text-lg font-black text-[#2A1A0F] font-display">${st.name}</h2>
                <span class="px-3 py-1 rounded-full bg-[#5C3A21] text-white font-extrabold text-[10px] inline-block mt-1">${st.class} (Roll No: ${st.rollNo})</span>
                <p class="text-[10px] text-slate-500 font-bold mt-1">Class Teacher: ${st.classTeacher}</p>
              </div>

              <div class="grid grid-cols-2 gap-2 text-left text-[11px] bg-white/80 p-3 rounded-2xl border border-[#5C3A21]/15 font-semibold">
                <div><span class="text-slate-400">Admission ID:</span> <span class="font-mono text-[#5C3A21]">${st.studentId}</span></div>
                <div><span class="text-slate-400">Parent:</span> ${st.parentName}</div>
                <div><span class="text-slate-400">Phone:</span> ${st.parentPhone}</div>
                <div><span class="text-slate-400">Status:</span> <span class="text-emerald-600 font-bold">Active</span></div>
              </div>
            </div>

            <div class="flex gap-2">
              <button onclick="window.print()" class="flex-1 py-2.5 rounded-2xl font-extrabold bg-[#5C3A21] text-white hover:bg-[#3A2313] shadow flex items-center justify-center gap-2 text-xs">
                <i class="lucide-printer text-[#C49B66]"></i> Print ID Card
              </button>
              <button onclick="window.diseApp.closeModals()" class="py-2.5 px-4 rounded-2xl font-bold bg-slate-200 text-xs">Close</button>
            </div>
          </div>
        </div>
      `;
    }

    // 3. Command Palette Modal
    if (state.isCommandPaletteOpen) {
      return `
        <div class="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md" onclick="window.diseApp.closeModals()">
          <div class="glass-modal w-full max-w-xl rounded-3xl p-4 shadow-2xl space-y-3" onclick="event.stopPropagation()">
            <div class="flex items-center gap-3 px-3 py-2 border-b border-[#5C3A21]/15">
              <i class="lucide-search text-[#5C3A21] text-lg"></i>
              <input type="text" autofocus placeholder="Search faculty, students, or leadership..." oninput="window.diseApp.setSearch(this.value)" class="w-full bg-transparent text-sm font-bold focus:outline-none" />
              <kbd class="px-2 py-0.5 text-[10px] font-bold bg-slate-200 text-slate-600 rounded">ESC</kbd>
            </div>
            <div class="max-h-80 overflow-y-auto space-y-1 text-xs">
              <p class="px-3 text-[10px] font-extrabold text-slate-400 uppercase">Faculty Members</p>
              ${state.staff.map(f => `
                <div onclick="window.diseApp.viewStaffProfile('${f.id}')" class="px-3 py-2.5 rounded-xl hover:bg-[#5C3A21]/10 flex items-center justify-between cursor-pointer">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-md bg-[#5C3A21] text-white text-[10px] font-bold flex items-center justify-center">${f.name.charAt(0)}</span>
                    <span class="font-bold text-[#2A1A0F]">${f.name}</span>
                  </div>
                  <span class="text-[10px] font-mono text-[#C49B66]">${f.role} (${f.assignedClass})</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    // 4. Add Student Modal
    if (state.isAddStudentModalOpen) {
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div class="glass-modal w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4">
            <div class="flex items-center justify-between border-b border-[#5C3A21]/20 pb-3">
              <h3 class="font-extrabold text-base text-[#5C3A21] font-display">Add New Student Record</h3>
              <button onclick="window.diseApp.closeModals()" class="text-slate-400 hover:text-slate-600"><i class="lucide-x text-lg"></i></button>
            </div>
            <form id="form-add-student" onsubmit="window.diseApp.submitAddStudent(event)" class="space-y-3 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Full Student Name *</label>
                <input type="text" required name="name" placeholder="e.g. Muhammed Bilal" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#5C3A21]/20 font-semibold focus:outline-none focus:border-[#5C3A21]" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Class *</label>
                  <select name="class" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#5C3A21]/20 font-semibold">
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 7">Grade 7</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Section *</label>
                  <select name="section" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#5C3A21]/20 font-semibold">
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Parent/Guardian Name *</label>
                <input type="text" required name="parentName" placeholder="e.g. Ibrahim Haji" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#5C3A21]/20 font-semibold" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Parent Contact Phone *</label>
                <input type="text" required name="parentPhone" placeholder="+91 98470 11022" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#5C3A21]/20 font-semibold" />
              </div>
              <div class="flex gap-2 pt-2">
                <button type="button" onclick="window.diseApp.closeModals()" class="flex-1 py-2.5 rounded-xl font-bold bg-slate-200">Cancel</button>
                <button type="submit" class="flex-1 py-2.5 rounded-xl font-bold bg-[#5C3A21] text-white hover:bg-[#3A2313] shadow">Save Student</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }

    if (state.isAddLeaveModalOpen) {
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div class="glass-modal w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4">
            <div class="flex items-center justify-between border-b border-[#5C3A21]/20 pb-3">
              <h3 class="font-extrabold text-base text-[#5C3A21] font-display">Submit Leave Request</h3>
              <button onclick="window.diseApp.closeModals()" class="text-slate-400"><i class="lucide-x text-lg"></i></button>
            </div>
            <form onsubmit="window.diseApp.submitAddLeave(event)" class="space-y-3 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Applicant Name</label>
                <input type="text" required name="studentName" placeholder="Name" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#5C3A21]/20 font-semibold" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Reason for Leave</label>
                <textarea required name="reason" placeholder="Detailed reason..." class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#5C3A21]/20 font-semibold h-20"></textarea>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Start Date</label>
                  <input type="date" required name="startDate" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#5C3A21]/20 font-semibold" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">End Date</label>
                  <input type="date" required name="endDate" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#5C3A21]/20 font-semibold" />
                </div>
              </div>
              <div class="flex gap-2 pt-2">
                <button type="button" onclick="window.diseApp.closeModals()" class="flex-1 py-2.5 rounded-xl font-bold bg-slate-200">Cancel</button>
                <button type="submit" class="flex-1 py-2.5 rounded-xl font-bold bg-[#5C3A21] text-white hover:bg-[#3A2313]">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }

    // 5. Edit Student Modal
    if (state.editingStudent) {
      const st = state.editingStudent;
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div class="glass-modal w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4">
            <div class="flex items-center justify-between border-b border-[#5C3A21]/20 pb-3">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-[#5C3A21] text-white text-[10px] font-black uppercase">Edit Student Record</span>
                <span class="text-xs font-mono font-bold text-[#C49B66]">${st.studentId}</span>
              </div>
              <button onclick="window.diseApp.closeModals()" class="text-slate-400 hover:text-slate-600"><i class="lucide-x text-lg"></i></button>
            </div>
            <form id="form-edit-student" onsubmit="window.diseApp.submitEditStudent(event)" class="space-y-3 text-xs">
              <input type="hidden" name="id" value="${st.id}" />
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Student Name *</label>
                <input type="text" required name="name" value="${st.name}" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-semibold text-[#2A1A0F] dark:text-white focus:outline-none focus:border-[#5C3A21]" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Admission ID *</label>
                  <input type="text" required name="studentId" value="${st.studentId}" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-mono font-semibold text-[#5C3A21] dark:text-[#C49B66]" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Roll Number *</label>
                  <input type="number" required name="rollNo" value="${st.rollNo}" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-mono font-semibold text-[#2A1A0F] dark:text-white" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Class *</label>
                  <select name="class" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-semibold text-[#2A1A0F] dark:text-white">
                    <option value="Grade 8" ${st.class === 'Grade 8' ? 'selected' : ''}>Grade 8</option>
                    <option value="Grade 7" ${st.class === 'Grade 7' ? 'selected' : ''}>Grade 7</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Section *</label>
                  <select name="section" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-semibold text-[#2A1A0F] dark:text-white">
                    <option value="A" ${st.section === 'A' ? 'selected' : ''}>Section A</option>
                    <option value="B" ${st.section === 'B' ? 'selected' : ''}>Section B</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Parent/Guardian Name *</label>
                <input type="text" required name="parentName" value="${st.parentName}" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-semibold text-[#2A1A0F] dark:text-white" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Parent Contact Phone *</label>
                <input type="text" required name="parentPhone" value="${st.parentPhone}" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-mono font-semibold text-[#2A1A0F] dark:text-white" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Status</label>
                <select name="status" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-semibold text-[#2A1A0F] dark:text-white">
                  <option value="Active" ${st.status === 'Active' ? 'selected' : ''}>Active</option>
                  <option value="Inactive" ${st.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
                </select>
              </div>
      `;
    }

    // 6. Add Staff Modal (Admin Only)
    if (state.isAddStaffModalOpen) {
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div class="glass-modal w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4">
            <div class="flex items-center justify-between border-b border-[#5C3A21]/20 pb-3">
              <h3 class="font-extrabold text-base text-[#5C3A21] font-display">Add New Faculty Member</h3>
              <button onclick="window.diseApp.closeModals()" class="text-slate-400 hover:text-slate-600"><i class="lucide-x text-lg"></i></button>
            </div>
            <form id="form-add-staff" onsubmit="window.diseApp.submitAddStaff(event)" class="space-y-3 text-xs">
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Faculty Full Name *</label>
                <input type="text" required name="name" placeholder="e.g. Usthad Hafiz Ahmed" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-semibold text-[#2A1A0F] dark:text-white" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Designation *</label>
                  <input type="text" required name="designation" placeholder="e.g. Faculty Member" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-semibold text-[#2A1A0F] dark:text-white" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Role *</label>
                  <select name="role" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-semibold text-[#2A1A0F] dark:text-white">
                    <option value="Class Teacher">Class Teacher</option>
                    <option value="Subject Specialist">Subject Specialist</option>
                    <option value="Senior Faculty">Senior Faculty</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Assigned Class *</label>
                  <select name="assignedClass" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-semibold text-[#2A1A0F] dark:text-white">
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 7 & Grade 8">Grade 7 & Grade 8</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                  <input type="text" required name="phone" placeholder="+91 98470 22004" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-mono font-semibold text-[#2A1A0F] dark:text-white" />
                </div>
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                <input type="email" required name="email" placeholder="faculty@darulirshad.edu.in" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-semibold text-[#2A1A0F] dark:text-white" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Subjects (Comma separated)</label>
                <input type="text" name="subjects" placeholder="Islamic Studies, Arabic, English" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-semibold text-[#2A1A0F] dark:text-white" />
              </div>
              <div class="flex gap-2 pt-2">
                <button type="button" onclick="window.diseApp.closeModals()" class="flex-1 py-2.5 rounded-xl font-bold bg-slate-200 text-slate-700">Cancel</button>
                <button type="submit" class="flex-1 py-2.5 rounded-xl font-bold bg-[#5C3A21] text-white hover:bg-[#3A2313]">Save Faculty Member</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }

    // 7. Edit Staff Modal (Admin Only)
    if (state.editingStaff) {
      const f = state.editingStaff;
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div class="glass-modal w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4">
            <div class="flex items-center justify-between border-b border-[#5C3A21]/20 pb-3">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-[#5C3A21] text-white text-[10px] font-black uppercase">Edit Faculty Profile</span>
                <span class="text-xs font-mono font-bold text-[#C49B66]">${f.staffId}</span>
              </div>
              <button onclick="window.diseApp.closeModals()" class="text-slate-400 hover:text-slate-600"><i class="lucide-x text-lg"></i></button>
            </div>
            <form onsubmit="window.diseApp.submitEditStaff(event)" class="space-y-3 text-xs">
              <input type="hidden" name="id" value="${f.id}" />
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Faculty Full Name *</label>
                <input type="text" required name="name" value="${f.name}" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-semibold text-[#2A1A0F] dark:text-white" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Designation *</label>
                  <input type="text" required name="designation" value="${f.designation}" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-semibold text-[#2A1A0F] dark:text-white" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Role *</label>
                  <select name="role" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-semibold text-[#2A1A0F] dark:text-white">
                    <option value="Class Teacher" ${f.role === 'Class Teacher' ? 'selected' : ''}>Class Teacher</option>
                    <option value="Subject Specialist" ${f.role === 'Subject Specialist' ? 'selected' : ''}>Subject Specialist</option>
                    <option value="Senior Faculty" ${f.role === 'Senior Faculty' ? 'selected' : ''}>Senior Faculty</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Assigned Class *</label>
                  <select name="assignedClass" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-semibold text-[#2A1A0F] dark:text-white">
                    <option value="Grade 7" ${f.assignedClass === 'Grade 7' ? 'selected' : ''}>Grade 7</option>
                    <option value="Grade 8" ${f.assignedClass === 'Grade 8' ? 'selected' : ''}>Grade 8</option>
                    <option value="Grade 7 & Grade 8" ${f.assignedClass === 'Grade 7 & Grade 8' ? 'selected' : ''}>Grade 7 & Grade 8</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                  <input type="text" required name="phone" value="${f.phone}" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-mono font-semibold text-[#2A1A0F] dark:text-white" />
                </div>
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                <input type="email" required name="email" value="${f.email}" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-semibold text-[#2A1A0F] dark:text-white" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Subjects (Comma separated)</label>
                <input type="text" name="subjects" value="${Array.isArray(f.subjects) ? f.subjects.join(', ') : f.subjects}" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#1F150D] border border-[#5C3A21]/20 font-semibold text-[#2A1A0F] dark:text-white" />
              </div>
              <div class="flex gap-2 pt-2">
                <button type="button" onclick="window.diseApp.closeModals()" class="flex-1 py-2.5 rounded-xl font-bold bg-slate-200 text-slate-700">Cancel</button>
                <button type="submit" class="flex-1 py-2.5 rounded-xl font-bold bg-[#5C3A21] text-white hover:bg-[#3A2313]">Update Faculty Details</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }

    return '';
  }

  // Official Login Modal
  function renderLoginModal() {
    return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A1A0F]/70 backdrop-blur-xl">
        <div class="glass-modal w-full max-w-lg rounded-3xl p-8 shadow-2xl space-y-6 border border-[#5C3A21]/20">
          <div class="text-center space-y-3">
            <div class="p-3.5 bg-[#F8F6F0] rounded-3xl inline-block border border-[#5C3A21]/20 shadow-md">
              <img src="logo.png" alt="Darul Irshad School of Excellence Official Logo" class="h-24 w-auto mx-auto object-contain" />
            </div>
            <div>
              <h2 class="text-2xl font-black text-[#5C3A21] dark:text-white tracking-tight font-display">Darul Irshad School of Excellence</h2>
              <p class="text-xs text-[#C49B66] font-extrabold mt-1 uppercase tracking-widest">Faculty & Class Teacher ERP Portal</p>
            </div>
          </div>

          <!-- Credential Form & Fast Select -->
          <div class="space-y-4 pt-2">
            <p class="text-xs font-black text-center text-[#5C3A21] dark:text-[#C49B66] uppercase tracking-wider">Select Portal to Log In</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Grade 7 Teacher -->
              <button onclick="window.diseApp.login('Faheem Muhammed Saquafi', 'teacher', 'faheem.s@darulirshad.edu.in', 'Grade 7', 'Grade 7 Class Teacher')" 
                      class="p-4 rounded-2xl bg-white dark:bg-[#1F150D] hover:bg-[#5C3A21]/10 text-left border border-[#5C3A21]/20 hover:border-[#5C3A21] transition shadow-md group">
                <div class="flex items-center justify-between mb-1">
                  <span class="px-2 py-0.5 rounded-md bg-[#5C3A21] text-white text-[9px] font-black">Grade 7</span>
                  <i class="lucide-user-check text-[#C49B66] group-hover:scale-110 transition"></i>
                </div>
                <h4 class="font-extrabold text-xs text-[#2A1A0F] dark:text-white">Faheem Saquafi</h4>
                <p class="text-[10px] text-slate-500">Class Teacher (8 Students)</p>
                <p class="text-[9px] text-[#C49B66] font-mono mt-1 font-bold">faheem.s@darulirshad.edu.in</p>
              </button>

              <!-- Grade 8 Teacher -->
              <button onclick="window.diseApp.login('Swalih Ahsani', 'teacher', 'swalih.a@darulirshad.edu.in', 'Grade 8', 'Grade 8 Class Teacher')" 
                      class="p-4 rounded-2xl bg-white dark:bg-[#1F150D] hover:bg-[#5C3A21]/10 text-left border border-[#5C3A21]/20 hover:border-[#5C3A21] transition shadow-md group">
                <div class="flex items-center justify-between mb-1">
                  <span class="px-2 py-0.5 rounded-md bg-[#C49B66] text-white text-[9px] font-black">Grade 8</span>
                  <i class="lucide-user-check text-[#C49B66] group-hover:scale-110 transition"></i>
                </div>
                <h4 class="font-extrabold text-xs text-[#2A1A0F] dark:text-white">Swalih Ahsani</h4>
                <p class="text-[10px] text-slate-500">Class Teacher (13 Students)</p>
                <p class="text-[9px] text-[#C49B66] font-mono mt-1 font-bold">swalih.a@darulirshad.edu.in</p>
              </button>
            </div>

            <!-- Principal Admin Login -->
            <button onclick="window.diseApp.login('Bava Ahsani', 'admin', 'principal@darulirshad.edu.in', null, 'Principal & System Admin')" 
                    class="w-full py-3.5 bg-[#5C3A21] hover:bg-[#3A2313] text-white font-black text-xs rounded-2xl shadow-xl transition flex items-center justify-center gap-2 font-display">
              <i class="lucide-shield-check text-[#C49B66]"></i> Sign In as Principal (Bava Ahsani) - All Access
            </button>

            <!-- Password Form Toggle -->
            <form onsubmit="window.diseApp.handleCustomLoginSubmit(event)" class="pt-3 border-t border-[#5C3A21]/15 space-y-3">
              <p class="text-[11px] font-bold text-[#5C3A21] dark:text-slate-300">Or Log In with Email & Password:</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input type="email" id="login-email" placeholder="Email Address" required class="px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1F150D] border border-[#5C3A21]/20 text-xs font-bold text-[#2A1A0F] dark:text-white focus:outline-none focus:border-[#5C3A21]" />
                <input type="password" id="login-pass" placeholder="Password" required class="px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1F150D] border border-[#5C3A21]/20 text-xs font-bold text-[#2A1A0F] dark:text-white focus:outline-none focus:border-[#5C3A21]" />
              </div>
              <button type="submit" class="w-full py-2.5 bg-[#C49B66] hover:bg-[#a67c4b] text-white font-black text-xs rounded-xl shadow transition">
                Sign In with Credentials
              </button>
            </form>
          </div>

          <div class="pt-2 border-t border-[#5C3A21]/10 text-center text-[10px] text-slate-500 font-bold space-y-0.5">
            <p>Chairman: Sayyid Ismaeel Noufal Bukhari</p>
            <p>Principal: Bava Ahsani &bull; Vice Principal: Shahul Hameed Azhari</p>
          </div>
        </div>
      </div>
    `;
  }

  function attachGlobalEvents() {
    const btnTheme = document.getElementById('btn-theme-toggle');
    if (btnTheme) {
      btnTheme.onclick = () => {
        document.documentElement.classList.toggle('dark');
      };
    }

    document.onkeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        window.diseApp.openCommandPalette();
      }
      if (e.key === 'Escape') {
        window.diseApp.closeModals();
      }
    };
  }

  window.diseApp = {
    setTab: function(tab) {
      state.activeTab = tab;
      render();
    },

    login: function(name, role, email, assignedClass, designation) {
      state.user = { 
        name, 
        role, 
        email, 
        assignedClass: assignedClass || null,
        designation: designation || (role === 'admin' ? 'Principal' : 'Faculty') 
      };
      if (assignedClass) {
        state.selectedClass = assignedClass;
      } else {
        state.selectedClass = 'All';
      }
      setStore(STORAGE_KEYS.USER, state.user);
      render();
      showToast('Login Successful', `Welcome ${name} ${assignedClass ? `(${assignedClass} Portal)` : ''}`);
    },

    handleCustomLoginSubmit: function(e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim().toLowerCase();
      if (email.includes('faheem') || email.includes('7')) {
        this.login('Faheem Muhammed Saquafi', 'teacher', 'faheem.s@darulirshad.edu.in', 'Grade 7', 'Grade 7 Class Teacher');
      } else if (email.includes('swalih') || email.includes('8')) {
        this.login('Swalih Ahsani', 'teacher', 'swalih.a@darulirshad.edu.in', 'Grade 8', 'Grade 8 Class Teacher');
      } else {
        this.login('Bava Ahsani', 'admin', 'principal@darulirshad.edu.in', null, 'Principal & Administrator');
      }
    },

    logout: function() {
      state.user = null;
      localStorage.removeItem(STORAGE_KEYS.USER);
      render();
    },

    setSearch: function(q) {
      state.searchQuery = q;
      render();
    },

    setClassFilter: function(cls) {
      state.selectedClass = cls;
      render();
    },

    viewStaffProfile: function(id) {
      const f = state.staff.find(st => st.id === id);
      if (f) {
        state.selectedStaffForProfile = f;
        render();
      }
    },

    generateIDCard: function(id) {
      const student = state.students.find(s => s.id === id);
      if (student) {
        state.selectedStudentForIDCard = student;
        render();
      }
    },

    openCommandPalette: function() {
      state.isCommandPaletteOpen = true;
      render();
    },

    exportStudentCSV: function() {
      let csvContent = "data:text/csv;charset=utf-8,No,Admission ID,Student Name,Class,Class Teacher,Parent Name,Phone\n";
      state.students.forEach(st => {
        csvContent += `${st.rollNo},${st.studentId},"${st.name}",${st.class},"${st.classTeacher}","${st.parentName}",${st.parentPhone}\n`;
      });
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "DISE_Students_List_2026.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('CSV Export Complete', 'DISE_Students_List_2026.csv downloaded.');
    },

    openAddStudentModal: function() {
      state.isAddStudentModalOpen = true;
      render();
    },

    openEditStudentModal: function(id) {
      const student = state.students.find(s => s.id === id);
      if (student) {
        state.editingStudent = { ...student };
        render();
      }
    },

    openAddLeaveModal: function() {
      state.isAddLeaveModalOpen = true;
      render();
    },

    openAddNoticeModal: function() {
      state.notices.unshift({
        id: `nt-${Date.now()}`,
        title: 'New Executive Circular',
        category: 'General',
        date: new Date().toISOString().split('T')[0],
        content: 'Important updates regarding upcoming academic schedule and campus activities.',
        isPinned: false
      });
      setStore(STORAGE_KEYS.NOTICES, state.notices);
      render();
      showToast('Notice Posted', 'Announcement added to Notice Board');
    },

    openAddStaffModal: function() {
      if (!state.user || state.user.role !== 'admin') {
        showToast('Permission Denied', 'Only Principal / System Admin can add new faculty.', 'error');
        return;
      }
      state.isAddStaffModalOpen = true;
      render();
    },

    openEditStaffModal: function(id) {
      if (!state.user || state.user.role !== 'admin') {
        showToast('Permission Denied', 'Only Principal / System Admin can edit faculty details.', 'error');
        return;
      }
      const staff = state.staff.find(s => s.id === id);
      if (staff) {
        state.editingStaff = { ...staff };
        render();
      }
    },

    closeModals: function() {
      state.selectedStaffForProfile = null;
      state.selectedStudentForIDCard = null;
      state.isCommandPaletteOpen = false;
      state.isAddStudentModalOpen = false;
      state.isAddStaffModalOpen = false;
      state.isAddLeaveModalOpen = false;
      state.isAddNoticeModalOpen = false;
      state.editingStudent = null;
      state.editingStaff = null;
      render();
    },

    submitAddStaff: function(e) {
      e.preventDefault();
      const form = e.target;
      const subjectsArr = form.subjects.value.split(',').map(s => s.trim()).filter(Boolean);
      const newStaff = {
        id: `stf-${Date.now()}`,
        staffId: `DISE-FAC-00${state.staff.length + 1}`,
        name: form.name.value,
        designation: form.designation.value,
        role: form.role.value,
        assignedClass: form.assignedClass.value,
        subjects: subjectsArr.length ? subjectsArr : ['Islamic Studies'],
        phone: form.phone.value,
        email: form.email.value,
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0]
      };

      state.staff.unshift(newStaff);
      setStore(STORAGE_KEYS.STAFF, state.staff);
      state.isAddStaffModalOpen = false;
      render();
      showToast('Faculty Added', `${newStaff.name} added to staff directory.`);
    },

    submitEditStaff: function(e) {
      e.preventDefault();
      const form = e.target;
      const id = form.id.value;
      const subjectsArr = form.subjects.value.split(',').map(s => s.trim()).filter(Boolean);

      state.staff = state.staff.map(f => {
        if (f.id === id) {
          return {
            ...f,
            name: form.name.value,
            designation: form.designation.value,
            role: form.role.value,
            assignedClass: form.assignedClass.value,
            phone: form.phone.value,
            email: form.email.value,
            subjects: subjectsArr.length ? subjectsArr : f.subjects
          };
        }
        return f;
      });

      setStore(STORAGE_KEYS.STAFF, state.staff);
      state.editingStaff = null;
      render();
      showToast('Faculty Updated', 'Faculty details updated successfully in database.');
    },

    deleteStaff: function(id) {
      if (!state.user || state.user.role !== 'admin') {
        showToast('Permission Denied', 'Only Admin can remove faculty.', 'error');
        return;
      }
      if (confirm('Are you sure you want to remove this faculty member?')) {
        state.staff = state.staff.filter(s => s.id !== id);
        setStore(STORAGE_KEYS.STAFF, state.staff);
        render();
        showToast('Faculty Removed', 'Faculty member removed from directory.', 'error');
      }
    },

    submitAddStudent: function(e) {
      e.preventDefault();
      const form = e.target;
      const classTeacher = form.class.value === 'Grade 7' ? 'Faheem Muhammed Saquafi' : 'Swalih Ahsani';
      const newSt = {
        id: `st-${Date.now()}`,
        studentId: `DISE-2026-0${state.students.length + 1}`,
        name: form.name.value,
        class: form.class.value,
        section: form.section.value,
        rollNo: state.students.length + 1,
        parentName: form.parentName.value,
        parentPhone: form.parentPhone.value,
        classTeacher: classTeacher,
        status: 'Active'
      };
      state.students.unshift(newSt);
      setStore(STORAGE_KEYS.STUDENTS, state.students);
      state.isAddStudentModalOpen = false;
      render();
      showToast('Student Saved', `${newSt.name} added to directory.`);
    },

    submitEditStudent: function(e) {
      e.preventDefault();
      const form = e.target;
      const id = form.id.value;
      const classTeacher = form.class.value === 'Grade 7' ? 'Faheem Muhammed Saquafi' : 'Swalih Ahsani';

      state.students = state.students.map(s => {
        if (s.id === id) {
          return {
            ...s,
            name: form.name.value,
            studentId: form.studentId.value,
            rollNo: parseInt(form.rollNo.value) || s.rollNo,
            class: form.class.value,
            section: form.section.value,
            parentName: form.parentName.value,
            parentPhone: form.parentPhone.value,
            status: form.status.value,
            classTeacher: classTeacher
          };
        }
        return s;
      });

      setStore(STORAGE_KEYS.STUDENTS, state.students);
      state.editingStudent = null;
      render();
      showToast('Student Updated', 'Student details updated successfully.');
    },

    submitAddLeave: function(e) {
      e.preventDefault();
      const form = e.target;
      const newLv = {
        id: `lv-${Date.now()}`,
        studentName: form.studentName.value,
        class: 'Grade 8',
        reason: form.reason.value,
        startDate: form.startDate.value,
        endDate: form.endDate.value,
        status: 'Pending',
        appliedDate: new Date().toISOString().split('T')[0]
      };
      state.leaves.unshift(newLv);
      setStore(STORAGE_KEYS.LEAVES, state.leaves);
      state.isAddLeaveModalOpen = false;
      render();
      showToast('Leave Submitted', 'Application sent to Principal for review.');
    },

    deleteStudent: function(id) {
      if (confirm('Are you sure you want to remove this student record?')) {
        state.students = state.students.filter(s => s.id !== id);
        setStore(STORAGE_KEYS.STUDENTS, state.students);
        render();
        showToast('Student Removed', 'Record deleted from system.', 'error');
      }
    },

    updateLeaveStatus: function(id, status) {
      state.leaves = state.leaves.map(l => l.id === id ? { ...l, status } : l);
      setStore(STORAGE_KEYS.LEAVES, state.leaves);
      render();
      showToast('Leave Status Updated', `Application has been ${status}.`);
    },

    saveAttendance: function() {
      const dateInput = document.querySelector('input[type="date"]');
      const dateVal = dateInput ? dateInput.value : new Date().toISOString().split('T')[0];
      const userAssignedClass = state.user ? state.user.assignedClass : null;
      const activeClass = userAssignedClass || (state.selectedClass === 'All' ? 'Grade 8' : state.selectedClass);
      const studentsInClass = state.students.filter(s => s.class === activeClass);

      if (!state.attendance) state.attendance = {};
      if (!state.attendance[dateVal]) state.attendance[dateVal] = {};

      let count = 0;
      studentsInClass.forEach(st => {
        const checkedRadio = document.querySelector(`input[name="att-${st.id}"]:checked`);
        if (checkedRadio) {
          state.attendance[dateVal][st.id] = {
            status: checkedRadio.value,
            markedBy: state.user ? state.user.name : 'Teacher',
            markedAt: new Date().toLocaleTimeString(),
            class: activeClass
          };
          count++;
        }
      });

      setStore(STORAGE_KEYS.ATTENDANCE, state.attendance);
      showToast('Attendance Saved', `Daily register for ${activeClass} (${count} students) saved to database.`);
    },

    downloadDoc: function(title) {
      showToast('Downloading Document', `Fetching PDF for ${title}...`);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    render();
    initFirebaseRealtimeSync();
  });
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    render();
    initFirebaseRealtimeSync();
  }
})();
