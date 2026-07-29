import React, { useState } from 'react';
import { DocumentItem } from '../types/index.ts';

interface DocumentRepositoryProps {
  documents: DocumentItem[];
  onSaveDocument: (doc: DocumentItem) => void;
  classesList: string[];
  subjectsList: string[];
  currentUser: string;
}

export const DocumentRepository: React.FC<DocumentRepositoryProps> = ({
  documents,
  onSaveDocument,
  classesList,
  subjectsList,
  currentUser
}) => {
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    fileName: '',
    fileType: 'Notes' as DocumentItem['fileType'],
    className: 'Class 10',
    subject: 'Mathematics'
  });

  const filteredDocs = documents.filter((doc) => {
    const matchesClass = selectedClass === 'All' || doc.className === selectedClass;
    const matchesSubject = selectedSubject === 'All' || doc.subject === selectedSubject;
    return matchesClass && matchesSubject;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.title || !uploadForm.fileName) return;

    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title: uploadForm.title,
      description: uploadForm.description || 'Academic study material document.',
      fileUrl: '#',
      fileName: uploadForm.fileName,
      fileType: uploadForm.fileType,
      fileSize: '3.5 MB',
      className: uploadForm.className,
      subject: uploadForm.subject,
      uploadedBy: currentUser,
      uploadedAt: new Date().toISOString().split('T')[0]
    };

    onSaveDocument(newDoc);
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center space-x-2">
            <i className="lucide-file-text text-[#1E5AA8] dark:text-blue-400"></i>
            <span>Study Materials & Document Vault</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Upload and download PDFs, lecture notes, lab manuals, assignments, and curriculum circulars.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center justify-center space-x-2 bg-[#1E5AA8] hover:bg-[#143F77] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition active:scale-95 self-start sm:self-auto"
        >
          <i className="lucide-[#F5C400] lucide-upload-cloud text-base"></i>
          <span>Upload Document</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="glass-card p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Class Filter</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-white focus:outline-none"
            >
              <option value="All">All Classes</option>
              {classesList.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Subject Filter</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-white focus:outline-none"
            >
              <option value="All">All Subjects</option>
              {subjectsList.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-800 dark:text-white">{filteredDocs.length}</span> Documents
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.length === 0 ? (
          <div className="col-span-full glass-card p-12 text-center text-slate-500 dark:text-slate-400 rounded-2xl">
            <i className="lucide-folder-open text-4xl mb-3 block"></i>
            <p className="font-semibold text-sm">No documents found matching filter parameters.</p>
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="glass-card p-5 rounded-2xl flex flex-col justify-between transition hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase bg-blue-50 dark:bg-slate-800 text-[#1E5AA8] dark:text-blue-400 border border-blue-200 dark:border-slate-700">
                    <i className="lucide-file text-xs"></i>
                    <span>{doc.fileType}</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 font-medium">{doc.fileSize}</span>
                </div>

                <h3 className="text-base font-bold text-slate-800 dark:text-white leading-snug mb-1">
                  {doc.title}
                </h3>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                  {doc.description}
                </p>

                <div className="text-xs space-y-1 font-medium text-slate-600 dark:text-slate-300">
                  <div><strong>Class:</strong> {doc.className}</div>
                  <div><strong>Subject:</strong> {doc.subject}</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <div className="text-[11px] text-slate-400">
                  By {doc.uploadedBy} on {doc.uploadedAt}
                </div>

                <button
                  onClick={() => alert(`Downloading ${doc.fileName}...`)}
                  className="px-3 py-1.5 bg-[#1E5AA8] hover:bg-[#143F77] text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1"
                >
                  <i className="lucide-download text-xs"></i>
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="glass-modal w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Upload New Study Material</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <i className="lucide-x text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Class 10 Chemistry Lab Manual"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 text-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Document Category</label>
                  <select
                    value={uploadForm.fileType}
                    onChange={(e) => setUploadForm({ ...uploadForm, fileType: e.target.value as DocumentItem['fileType'] })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 text-slate-800 dark:text-white"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Notes">Notes</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Circular">Circular</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Class</label>
                  <select
                    value={uploadForm.className}
                    onChange={(e) => setUploadForm({ ...uploadForm, className: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 text-slate-800 dark:text-white"
                  >
                    {classesList.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                <select
                  value={uploadForm.subject}
                  onChange={(e) => setUploadForm({ ...uploadForm, subject: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 text-slate-800 dark:text-white"
                >
                  {subjectsList.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">File Name Attachment *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. chemistry_lab_manual.pdf"
                  value={uploadForm.fileName}
                  onChange={(e) => setUploadForm({ ...uploadForm, fileName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 text-slate-800 dark:text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1E5AA8] text-white font-bold rounded-xl shadow-md"
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
