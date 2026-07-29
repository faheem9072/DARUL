// Darul Irshad School of Excellence (DISE) Data Models

export type UserRole = 'admin' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  designation: string;
  phone?: string;
  classTeacherOf?: string; // e.g. "Class 10-A"
}

export interface Student {
  id: string;
  studentId: string; // e.g. DISE-2026-001
  name: string;
  class: string; // e.g. "Class 10"
  section: string; // e.g. "A"
  rollNo: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  parentName: string;
  parentPhone: string;
  email?: string;
  address: string;
  status: 'Active' | 'Inactive';
  avatar?: string;
  admissionDate: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  studentId: string;
  studentName: string;
  class: string;
  section: string;
  status: AttendanceStatus;
  markedBy: string;
  updatedAt: string;
}

export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  section: string;
  startDate: string;
  endDate: string;
  daysCount: number;
  reason: string;
  attachmentUrl?: string;
  attachmentName?: string;
  status: LeaveStatus;
  adminComment?: string;
  appliedDate: string;
}

export type NoticePriority = 'high' | 'medium' | 'low';
export type NoticeTarget = 'all' | 'teachers' | 'students';

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'Academic' | 'Administrative' | 'Event' | 'Exam' | 'Emergency';
  targetRole: NoticeTarget;
  author: string;
  date: string;
  priority: NoticePriority;
  isPinned: boolean;
}

export interface TimetableSlot {
  id: string;
  className: string;
  section: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period: number;
  subject: string;
  teacherName: string;
  room: string;
  startTime: string;
  endTime: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  fileType: 'PDF' | 'Notes' | 'Assignment' | 'Circular';
  fileSize: string;
  className: string;
  subject: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface SchoolSettings {
  academicYear: string; // e.g. "2026-2027"
  schoolName: string;
  schoolCode: string;
  phone: string;
  email: string;
  address: string;
  classes: string[];
  sections: string[];
  subjects: string[];
}
