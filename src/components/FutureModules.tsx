import React, { useState } from 'react';

interface FutureModuleItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  features: string[];
}

export const FutureModules: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<FutureModuleItem | null>(null);

  const modules: FutureModuleItem[] = [
    {
      id: 'parent-portal',
      name: 'Parent Portal App',
      category: 'Portals',
      icon: 'lucide-users',
      description: 'Dedicated web & mobile portal for parents to track real-time attendance, exam progress, fee receipts, and direct teacher communications.',
      features: ['Attendance Feed', 'Marks Card Download', 'Fee Payment History', 'Direct Chat with Class Teacher']
    },
    {
      id: 'student-portal',
      name: 'Student Self-Service Portal',
      category: 'Portals',
      icon: 'lucide-graduation-cap',
      description: 'Self-service dashboard for students to access lecture notes, submit assignments, check homework schedules, and download library books.',
      features: ['Assignment Submission Engine', 'Study Vault', 'Exam Timetables', 'Attendance Progress Bar']
    },
    {
      id: 'exam-mgmt',
      name: 'Exam Management System',
      category: 'Academics',
      icon: 'lucide-award',
      description: 'End-to-end examination scheduling, hall ticket generation, exam seat planning, and question bank management.',
      features: ['Hall Ticket Automation', 'Seating Arrangement Matrix', 'Question Paper Vault', 'Invigilation Roster']
    },
    {
      id: 'marks-entry',
      name: 'Marks Entry & Gradebook',
      category: 'Academics',
      icon: 'lucide-calculator',
      description: 'Teacher gradebook for unit tests, mid-terms, and final exams with automated GPA calculation and progress report card generation.',
      features: ['Subject Marks Entry Grid', 'CBSE/State Board Grading Rules', 'Progress Card PDF Generator', 'Class Ranking']
    },
    {
      id: 'fee-mgmt',
      name: 'Fee Management & Online Receipts',
      category: 'Finance',
      icon: 'lucide-wallet',
      description: 'Tuition fee collection, installment scheduling, payment gateway integration, automatic fee dues reminders, and tax receipts.',
      features: ['Custom Fee Structure', 'UPI / Card Payment Gateway', 'Automated Overdue Alerts', 'Financial Audit Reports']
    },
    {
      id: 'library-mgmt',
      name: 'Smart Library Management',
      category: 'Operations',
      icon: 'lucide-book-open',
      description: 'Catalog management, barcode scanning for book issue/returns, fine calculation, and e-book digital repository.',
      features: ['Barcode Book Tracker', 'Issue / Return Register', 'Overdue Fine Engine', 'Digital E-Books Vault']
    },
    {
      id: 'whatsapp-notif',
      name: 'WhatsApp Business API Alerts',
      category: 'Communications',
      icon: 'lucide-message-circle',
      description: 'Automated instant WhatsApp messaging for daily absent alerts, fee reminders, exam schedules, and urgent school notices.',
      features: ['Instant Absent WhatsApp Alert', 'Fee Due Notifications', 'Urgent Weather Circulars', 'Parent Consent Links']
    },
    {
      id: 'sms-notif',
      name: 'SMS Gateway Gateway Alerts',
      category: 'Communications',
      icon: 'lucide-[#F5C400] lucide-send',
      description: 'DLT-verified SMS broadcast system for reliable offline push notifications to parent mobile numbers.',
      features: ['DLT Template Integration', 'Emergency Bulk SMS', 'OTP Login Verification', 'Delivery Status Tracking']
    },
    {
      id: 'online-admission',
      name: 'Online Admission Portal',
      category: 'Admissions',
      icon: 'lucide-[#1E5AA8] lucide-user-plus',
      description: 'Digital application form, online entrance test scheduling, document verification, and merit list publishing.',
      features: ['Custom Admission Application Form', 'Document Verification Checklist', 'Entrance Exam Marks', 'Merit List Generator']
    },
    {
      id: 'transport-mgmt',
      name: 'Fleet Transport & GPS Tracking',
      category: 'Operations',
      icon: 'lucide-[#1E5AA8] lucide-bus',
      description: 'School bus route management, driver assignment, student boarding tracking, and real-time parent GPS tracking.',
      features: ['Bus Route Planner', 'Driver & Assistant Details', 'GPS Live Tracking', 'Student Bus Pass']
    },
    {
      id: 'hostel-mgmt',
      name: 'Hostel & Residential Care',
      category: 'Operations',
      icon: 'lucide-[#1E5AA8] lucide-home',
      description: 'Room allocation, mess menu planning, hostel attendance, visitor log, and warden night pass approvals.',
      features: ['Room Allocation Grid', 'Mess Menu Calendar', 'Outing Pass Approval', 'Warden Register']
    },
    {
      id: 'id-generator',
      name: 'Bulk ID Card Generator',
      category: 'Tools',
      icon: 'lucide-[#1E5AA8] lucide-id-card',
      description: 'High-speed bulk PDF printing of student and faculty plastic PVC ID badges with QR codes.',
      features: ['Batch ID Card Printing', 'QR Code / Barcode Data', 'Custom DISE Templates', 'Photo Crop Assistant']
    },
    {
      id: 'certificate-gen',
      name: 'Certificates & TC Generator',
      category: 'Tools',
      icon: 'lucide-[#1E5AA8] lucide-file-badge',
      description: 'One-click generation of Transfer Certificates (TC), Conduct Certificates, Bonafide Certificates, and Sports Medals.',
      features: ['TC Certificate Generator', 'Bonafide Letter Template', 'Character Certificate', 'Digital Signature Stamp']
    },
    {
      id: 'advanced-analytics',
      name: 'Executive Analytics & BI',
      category: 'Analytics',
      icon: 'lucide-[#1E5AA8] lucide-pie-chart',
      description: 'Data analytics charts on student academic trends, teacher workloads, fee collection forecasts, and attendance heatmaps.',
      features: ['Academic Performance Heatmaps', 'Fee Collection Forecast', 'Teacher Subject Performance', 'Executive Summary']
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div>
        <div className="inline-flex items-center space-x-2 bg-[#F5C400]/20 text-[#1E5AA8] dark:text-[#F5C400] text-xs font-bold px-3 py-1 rounded-full border border-[#F5C400]/40 mb-2">
          <i className="lucide-sparkles"></i>
          <span>Modular Enterprise Architecture</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          Future-Ready ERP Expansion Modules
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          The DISE Internal Management Portal is engineered with a plug-and-play modular framework. These high-value modules can be enabled instantly without breaking existing workflows or requiring system redesign.
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((mod) => (
          <div
            key={mod.id}
            onClick={() => setSelectedModule(mod)}
            className="glass-card p-5 rounded-2xl flex flex-col justify-between cursor-pointer transition hover:scale-[1.02] hover:shadow-xl group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1E5AA8] to-blue-400 text-white flex items-center justify-center text-lg shadow-md group-hover:scale-110 transition-transform">
                  <i className={mod.icon}></i>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800 uppercase">
                  Ready for Integration
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-[#1E5AA8] transition-colors">
                {mod.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {mod.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs text-[#1E5AA8] dark:text-blue-400 font-bold">
              <span>Preview Specifications</span>
              <i className="lucide-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </div>
          </div>
        ))}
      </div>

      {/* Module Specification Modal */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="glass-modal w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#1E5AA8] text-white flex items-center justify-center text-xl">
                  <i className={selectedModule.icon}></i>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-white">{selectedModule.name}</h3>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">{selectedModule.category}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedModule(null)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <i className="lucide-x text-lg"></i>
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedModule.description}
            </p>

            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase mb-2">Key Included Capabilities:</h4>
              <ul className="space-y-1.5">
                {selectedModule.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-200">
                    <i className="lucide-check-circle text-emerald-500 text-sm"></i>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
              <button
                onClick={() => setSelectedModule(null)}
                className="px-4 py-2 bg-[#1E5AA8] text-white font-bold text-xs rounded-xl shadow"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
