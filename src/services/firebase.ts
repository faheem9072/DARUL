import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { 
  User, Student, AttendanceRecord, LeaveRequest, Notice, 
  TimetableSlot, DocumentItem, SchoolSettings 
} from '../types/index.ts';

// Firebase configuration for Darul Irshad School of Excellence (DISE)
export const firebaseConfig = {
  apiKey: "AIzaSyCQNSXvfnwR_RsrMHA92dQLGPJzV6fMDcc",
  authDomain: "darul-c3dcd.firebaseapp.com",
  databaseURL: "https://darul-c3dcd-default-rtdb.firebaseio.com",
  projectId: "darul-c3dcd",
  storageBucket: "darul-c3dcd.firebasestorage.app",
  messagingSenderId: "876406440535",
  appId: "1:876406440535:web:1b822d18b7222f7f155912",
  measurementId: "G-GG1SYD3KGL"
};

// Initialize Firebase App, Analytics & Realtime Database
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const database = getDatabase(app);



// Initial pre-seeded mock data for Darul Irshad School of Excellence (DISE)
const INITIAL_SETTINGS: SchoolSettings = {
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

const INITIAL_STUDENTS: Student[] = [
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

const INITIAL_NOTICES: Notice[] = [
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

const INITIAL_LEAVES: LeaveRequest[] = [
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

const INITIAL_TIMETABLE: TimetableSlot[] = [
  { id: 'tt-1', className: 'Class 10', section: 'A', day: 'Monday', period: 1, subject: 'Mathematics', teacherName: 'Prof. Rashid Ahmed', room: 'Room 301', startTime: '09:00 AM', endTime: '09:45 AM' },
  { id: 'tt-2', className: 'Class 10', section: 'A', day: 'Monday', period: 2, subject: 'Physics', teacherName: 'Dr. Sameer Khan', room: 'Physics Lab', startTime: '09:45 AM', endTime: '10:30 AM' },
  { id: 'tt-3', className: 'Class 10', section: 'A', day: 'Monday', period: 3, subject: 'Islamic Studies', teacherName: 'Usthad Abdullah', room: 'Room 301', startTime: '10:45 AM', endTime: '11:30 AM' },
  { id: 'tt-4', className: 'Class 10', section: 'A', day: 'Monday', period: 4, subject: 'English Literature', teacherName: 'Mrs. Shabana Parveen', room: 'Room 301', startTime: '11:30 AM', endTime: '12:15 PM' },
  { id: 'tt-5', className: 'Class 10', section: 'A', day: 'Tuesday', period: 1, subject: 'Arabic Language', teacherName: 'Usthad Abdullah', room: 'Room 301', startTime: '09:00 AM', endTime: '09:45 AM' },
  { id: 'tt-6', className: 'Class 10', section: 'A', day: 'Tuesday', period: 2, subject: 'Chemistry', teacherName: 'Mrs. Fathima Farha', room: 'Chem Lab', startTime: '09:45 AM', endTime: '10:30 AM' }
];

const INITIAL_DOCUMENTS: DocumentItem[] = [
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

// Helper to manage persistent state in LocalStorage
function getStoredItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(`dise_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.warn(`LocalStorage read error for ${key}:`, err);
    return fallback;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`dise_${key}`, JSON.stringify(value));
  } catch (err) {
    console.warn(`LocalStorage write error for ${key}:`, err);
  }
  try {
    if (database) {
      set(ref(database, key), value);
    }
  } catch (err) {
    console.warn(`Firebase Realtime Database write error for ${key}:`, err);
  }
}

// Data Store Service API (Firebase Ready Abstraction)
export const DISEDataStore = {
  // Students API
  getStudents: (): Student[] => getStoredItem('students', []),
  saveStudent: (student: Student): Student[] => {
    const students = getStoredItem<Student[]>('students', []);
    const existingIndex = students.findIndex(s => s.id === student.id);
    let updated: Student[];
    if (existingIndex >= 0) {
      updated = [...students];
      updated[existingIndex] = student;
    } else {
      updated = [student, ...students];
    }
    setStoredItem('students', updated);
    return updated;
  },
  deleteStudent: (id: string): Student[] => {
    const students = getStoredItem<Student[]>('students', []);
    const updated = students.filter(s => s.id !== id);
    setStoredItem('students', updated);
    return updated;
  },

  // Attendance API
  getAttendanceForDate: (date: string, className: string): AttendanceRecord[] => {
    const records = getStoredItem<AttendanceRecord[]>('attendance', []);
    return records.filter(r => r.date === date && r.class === className);
  },
  saveAttendance: (records: AttendanceRecord[]): AttendanceRecord[] => {
    const allRecords = getStoredItem<AttendanceRecord[]>('attendance', []);
    // Map records replacing existing date+student pairs
    const recordsMap = new Map(allRecords.map(r => [`${r.date}_${r.studentId}`, r]));
    records.forEach(r => recordsMap.set(`${r.date}_${r.studentId}`, r));
    const updated = Array.from(recordsMap.values());
    setStoredItem('attendance', updated);
    return updated;
  },
  getAllAttendance: (): AttendanceRecord[] => getStoredItem('attendance', []),

  // Leaves API
  getLeaves: (): LeaveRequest[] => getStoredItem('leaves', []),
  saveLeave: (leave: LeaveRequest): LeaveRequest[] => {
    const leaves = getStoredItem<LeaveRequest[]>('leaves', []);
    const index = leaves.findIndex(l => l.id === leave.id);
    let updated: LeaveRequest[];
    if (index >= 0) {
      updated = [...leaves];
      updated[index] = leave;
    } else {
      updated = [leave, ...leaves];
    }
    setStoredItem('leaves', updated);
    return updated;
  },

  // Notices API
  getNotices: (): Notice[] => getStoredItem('notices', []),
  saveNotice: (notice: Notice): Notice[] => {
    const notices = getStoredItem<Notice[]>('notices', []);
    const index = notices.findIndex(n => n.id === notice.id);
    let updated: Notice[];
    if (index >= 0) {
      updated = [...notices];
      updated[index] = notice;
    } else {
      updated = [notice, ...notices];
    }
    setStoredItem('notices', updated);
    return updated;
  },
  deleteNotice: (id: string): Notice[] => {
    const notices = getStoredItem<Notice[]>('notices', []);
    const updated = notices.filter(n => n.id !== id);
    setStoredItem('notices', updated);
    return updated;
  },

  // Timetable API
  getTimetable: (): TimetableSlot[] => getStoredItem('timetable', []),

  // Documents API
  getDocuments: (): DocumentItem[] => getStoredItem('documents', []),
  saveDocument: (doc: DocumentItem): DocumentItem[] => {
    const docs = getStoredItem<DocumentItem[]>('documents', []);
    const updated = [doc, ...docs];
    setStoredItem('documents', updated);
    return updated;
  },

  // Settings API
  getSettings: (): SchoolSettings => getStoredItem('settings', INITIAL_SETTINGS),
  saveSettings: (settings: SchoolSettings): SchoolSettings => {
    setStoredItem('settings', settings);
    return settings;
  }
};
