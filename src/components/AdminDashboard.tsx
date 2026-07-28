import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Check,
  X,
  Edit3,
  Trash2,
  RefreshCw,
  Search,
  ArrowLeft,
  AlertCircle,
  Clock,
  Save,
  KeyRound,
} from 'lucide-react';
import {
  fetchSubmittedFaces,
  updateFaceStatus,
  updateFaceDetails,
  deleteFaceSubmission,
  SubmittedFace,
} from '../services/facesService';
import { sound } from '../utils/sound';

interface AdminDashboardProps {
  onGoHome: () => void;
  onRefreshGamePool?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onGoHome, onRefreshGamePool }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('pg_admin_authed') === 'true';
  });

  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Moderation Queue State
  const [faces, setFaces] = useState<SubmittedFace[]>([]);
  const [filterTab, setFilterTab] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingQueue, setIsLoadingQueue] = useState(false);
  const [queueError, setQueueError] = useState<string | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Editing & Deletion Modal State
  const [editingFace, setEditingFace] = useState<SubmittedFace | null>(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editOccupation, setEditOccupation] = useState('');
  const [editOrigin, setEditOrigin] = useState('');
  const [editFunFact, setEditFunFact] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Deleting State
  const [deletingFace, setDeletingFace] = useState<SubmittedFace | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadQueue = async () => {
    setIsLoadingQueue(true);
    setQueueError(null);
    try {
      const items = await fetchSubmittedFaces('all');
      setFaces(items);
    } catch (err: any) {
      console.error('Failed to load moderation queue:', err);
      setQueueError(err?.message || 'Error loading faces from Firestore.');
    } finally {
      setIsLoadingQueue(false);
    }
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      loadQueue();
    }
  }, [isAdminAuthenticated]);

  // Handle password checkpoint
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setAuthError(null);

    if (adminPassword === 'peopleguesserpassword') {
      sound.playCorrect();
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('pg_admin_authed', 'true');
    } else {
      sound.playClick();
      setAuthError('Incorrect admin password. Access denied.');
    }
  };

  const handleLockAdmin = () => {
    sound.playClick();
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('pg_admin_authed');
    setAdminPassword('');
  };

  // Moderation Handlers
  const handleApprove = async (id: string, name: string) => {
    sound.playCorrect();
    try {
      await updateFaceStatus(id, 'approved');
      setFaces((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: 'approved' } : f))
      );
      setActionSuccessMsg(`Approved "${name}"! It is now live in the game.`);
      setTimeout(() => setActionSuccessMsg(null), 3000);
      if (onRefreshGamePool) onRefreshGamePool();
    } catch (err: any) {
      setQueueError('Error approving face: ' + err.message);
    }
  };

  const handleReject = async (id: string, name: string) => {
    sound.playClick();
    try {
      await updateFaceStatus(id, 'rejected');
      setFaces((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: 'rejected' } : f))
      );
      setActionSuccessMsg(`Rejected "${name}".`);
      setTimeout(() => setActionSuccessMsg(null), 3000);
      if (onRefreshGamePool) onRefreshGamePool();
    } catch (err: any) {
      setQueueError('Error rejecting face: ' + err.message);
    }
  };

  const openDeleteModal = (face: SubmittedFace) => {
    sound.playClick();
    setDeletingFace(face);
  };

  const handleConfirmDelete = async () => {
    if (!deletingFace || !deletingFace.id) return;
    sound.playClick();
    setIsDeleting(true);
    setQueueError(null);

    try {
      await deleteFaceSubmission(deletingFace.id);
      setFaces((prev) => prev.filter((f) => f.id !== deletingFace.id));
      setActionSuccessMsg(`Deleted "${deletingFace.name}" permanently.`);
      setTimeout(() => setActionSuccessMsg(null), 3000);
      if (onRefreshGamePool) onRefreshGamePool();
      setDeletingFace(null);
    } catch (err: any) {
      console.error('Failed to delete face submission:', err);
      setQueueError('Error deleting face: ' + (err?.message || 'Unknown error'));
    } finally {
      setIsDeleting(false);
    }
  };

  // Editing Handlers
  const openEditModal = (face: SubmittedFace) => {
    sound.playClick();
    setEditingFace(face);
    setEditName(face.name);
    setEditCategory(face.category || 'Community');
    setEditOccupation(face.occupation || '');
    setEditOrigin(face.origin || '');
    setEditFunFact(face.funFact || '');
    setEditImageUrl(face.imageUrl);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFace || !editingFace.id) return;
    sound.playClick();
    setIsSavingEdit(true);

    try {
      const updates = {
        name: editName.trim(),
        category: editCategory,
        occupation: editOccupation.trim(),
        origin: editOrigin.trim(),
        funFact: editFunFact.trim(),
        imageUrl: editImageUrl.trim(),
      };

      await updateFaceDetails(editingFace.id, updates);
      setFaces((prev) =>
        prev.map((f) => (f.id === editingFace.id ? { ...f, ...updates } : f))
      );
      setEditingFace(null);
      setActionSuccessMsg(`Updated face details for "${editName}"!`);
      setTimeout(() => setActionSuccessMsg(null), 3000);
      if (onRefreshGamePool) onRefreshGamePool();
    } catch (err: any) {
      alert('Failed to update face details: ' + err.message);
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Counts
  const pendingCount = faces.filter((f) => f.status === 'pending').length;
  const approvedCount = faces.filter((f) => f.status === 'approved').length;
  const rejectedCount = faces.filter((f) => f.status === 'rejected').length;

  // Filtered List
  const filteredFaces = faces.filter((f) => {
    if (filterTab !== 'all' && f.status !== filterTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = f.name.toLowerCase().includes(q);
      const matchSubmitter = (f.submittedBy || '').toLowerCase().includes(q);
      const matchCategory = (f.category || '').toLowerCase().includes(q);
      return matchName || matchSubmitter || matchCategory;
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            sound.playClick();
            onGoHome();
          }}
          className="flex items-center gap-2 text-xs sm:text-sm font-cartoon font-black bg-white hover:bg-[#f7f9fa] text-slate-700 border-2 border-[#e5e5e5] border-b-4 active:border-b-2 active:translate-y-0.5 px-4 py-2 rounded-2xl transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
          <span>Back to Game</span>
        </button>

        {isAdminAuthenticated && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl hidden sm:inline-block">
              🛡️ Admin Authenticated
            </span>
            <button
              onClick={handleLockAdmin}
              className="flex items-center gap-1.5 text-xs font-cartoon font-black text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 border-b-2 active:border-b-0 active:translate-y-0.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Lock Admin</span>
            </button>
          </div>
        )}
      </div>

      {/* PASSWORD CHECKPOINT FORM (When not authenticated) */}
      {!isAdminAuthenticated ? (
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-md border-2 border-[#e5e5e5] border-b-6 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#9F6EFA]/10 text-[#9F6EFA] rounded-3xl flex items-center justify-center mx-auto border-2 border-[#9F6EFA]/30 shadow-xs">
              <KeyRound className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h1 className="text-2xl font-cartoon font-black text-slate-800 tracking-tight">
              ADMIN CHECKPOINT
            </h1>
            <p className="text-xs font-bold text-slate-500">
              Enter the admin password to access the submission queue and moderation controls.
            </p>
          </div>

          {authError && (
            <div className="bg-rose-50 border-2 border-rose-200 text-rose-800 p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-cartoon font-black uppercase text-slate-700">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-[#e5e5e5] focus:border-[#9F6EFA] focus:outline-none text-sm font-bold text-slate-800 bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl font-cartoon font-black text-sm text-white bg-[#9F6EFA] hover:bg-[#804de6] border-b-4 border-[#6d32db] active:border-b-2 active:translate-y-0.5 cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Lock className="w-4 h-4 stroke-[2.5]" />
              <span>UNLOCK ADMIN DASHBOARD</span>
            </button>
          </form>
        </div>
      ) : (
        /* AUTHENTICATED ADMIN MODERATION QUEUE */
        <div className="space-y-6">
          {/* Dashboard Title & Notification Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md border-2 border-[#e5e5e5] border-b-4 rounded-3xl p-5 shadow-xs">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#9F6EFA]/10 text-[#9F6EFA] font-cartoon font-black text-xs uppercase mb-1">
                <ShieldCheck className="w-4 h-4 text-[#9F6EFA]" /> Admin Dashboard
              </div>
              <h1 className="text-2xl font-cartoon font-black text-slate-800">
                COMMUNITY FACE SUBMISSION QUEUE
              </h1>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                loadQueue();
              }}
              disabled={isLoadingQueue}
              className="flex items-center justify-center gap-2 text-xs font-cartoon font-black bg-[#1cb0f6] hover:bg-[#3dbbf7] text-white border-b-3 border-[#1899d6] active:border-b-0 active:translate-y-0.5 px-4 py-2.5 rounded-2xl transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingQueue ? 'animate-spin' : ''}`} />
              <span>Refresh Queue</span>
            </button>
          </div>

          {/* Action Success Toast */}
          {actionSuccessMsg && (
            <div className="bg-emerald-50 border-2 border-emerald-200 text-emerald-800 p-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-xs animate-fadeIn">
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{actionSuccessMsg}</span>
            </div>
          )}

          {/* Controls Bar: Status Tabs & Search */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white border-2 border-[#e5e5e5] rounded-2xl shadow-xs overflow-x-auto">
              <button
                onClick={() => {
                  sound.playClick();
                  setFilterTab('pending');
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-cartoon font-black transition-all cursor-pointer whitespace-nowrap ${
                  filterTab === 'pending'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Pending Review</span>
                <span className="ml-1 bg-amber-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setFilterTab('approved');
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-cartoon font-black transition-all cursor-pointer whitespace-nowrap ${
                  filterTab === 'approved'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Approved ({approvedCount})</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setFilterTab('rejected');
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-cartoon font-black transition-all cursor-pointer whitespace-nowrap ${
                  filterTab === 'rejected'
                    ? 'bg-rose-100 text-rose-900 border border-rose-300'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <X className="w-3.5 h-3.5 text-rose-600" />
                <span>Rejected ({rejectedCount})</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setFilterTab('all');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-cartoon font-black transition-all cursor-pointer whitespace-nowrap ${
                  filterTab === 'all'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                All Submissions ({faces.length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, category, submitter..."
                className="w-full pl-9 pr-3.5 py-2 rounded-2xl border-2 border-[#e5e5e5] focus:border-[#1cb0f6] focus:outline-none text-xs font-bold text-slate-800 bg-white"
              />
            </div>
          </div>

          {/* Queue Error */}
          {queueError && (
            <div className="bg-rose-50 border-2 border-rose-200 text-rose-800 p-4 rounded-2xl text-xs font-bold flex items-center justify-between">
              <span>{queueError}</span>
              <button
                onClick={loadQueue}
                className="underline font-cartoon font-black cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading Grid Indicator */}
          {isLoadingQueue ? (
            <div className="py-16 text-center space-y-3 bg-white/60 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="w-8 h-8 border-3 border-[#1cb0f6] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-cartoon font-black text-slate-500">Loading submissions from Firestore...</p>
            </div>
          ) : filteredFaces.length === 0 ? (
            /* EMPTY QUEUE STATE */
            <div className="py-12 px-4 text-center bg-white/80 backdrop-blur-md rounded-3xl border-2 border-[#e5e5e5] border-b-4 space-y-2">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-base font-cartoon font-black text-slate-700">
                No submissions found for tab: "{filterTab.toUpperCase()}"
              </h3>
              <p className="text-xs font-bold text-slate-500 max-w-sm mx-auto">
                Visitors can submit new faces at <strong className="text-slate-800">/submit</strong>.
              </p>
            </div>
          ) : (
            /* SUBMISSION GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFaces.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-2 border-[#e5e5e5] border-b-4 rounded-3xl p-4 shadow-xs space-y-3 flex flex-col justify-between hover:border-slate-300 transition-all relative overflow-hidden"
                >
                  {/* Status Tag Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-xl font-cartoon font-black text-[10px] uppercase border shadow-2xs ${
                        item.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : item.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800 border-rose-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}
                    >
                      {item.status}
                    </span>

                    <span className="text-[10px] font-bold text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Face Card Content */}
                  <div className="flex gap-3">
                    <div className="w-20 h-28 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0 shadow-2xs relative">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <h4 className="font-cartoon font-black text-base text-slate-800 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs font-bold text-[#1cb0f6] truncate">
                        {item.occupation || 'No Role'}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-500 truncate">
                        📍 {item.origin || 'Worldwide'} • {item.category || 'Community'}
                      </p>
                      {item.funFact && (
                        <p className="text-[10px] font-medium text-slate-600 line-clamp-2 italic bg-slate-50 p-1.5 rounded-lg border border-slate-200 mt-1">
                          "{item.funFact}"
                        </p>
                      )}
                      <p className="text-[10px] font-bold text-slate-400 pt-1">
                        By: <span className="text-slate-600">{item.submittedBy || 'Anonymous'}</span>
                      </p>
                    </div>
                  </div>

                  {/* Moderation Actions Bar */}
                  <div className="pt-2 border-t border-slate-100 grid grid-cols-4 gap-1.5">
                    {/* APPROVE */}
                    <button
                      onClick={() => item.id && handleApprove(item.id, item.name)}
                      disabled={item.status === 'approved'}
                      className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-[11px] font-cartoon font-black transition-all cursor-pointer border-b-2 ${
                        item.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-400 border-emerald-100 opacity-50 cursor-not-allowed'
                          : 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-700 active:border-b-0 active:translate-y-0.5'
                      }`}
                      title="Approve face to appear in live game"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span className="hidden sm:inline">Approve</span>
                    </button>

                    {/* EDIT */}
                    <button
                      onClick={() => openEditModal(item)}
                      className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-[11px] font-cartoon font-black bg-sky-500 hover:bg-sky-600 text-white border-b-2 border-sky-700 active:border-b-0 active:translate-y-0.5 transition-all cursor-pointer"
                      title="Edit name or details"
                    >
                      <Edit3 className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>

                    {/* REJECT */}
                    <button
                      onClick={() => item.id && handleReject(item.id, item.name)}
                      disabled={item.status === 'rejected'}
                      className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-[11px] font-cartoon font-black transition-all cursor-pointer border-b-2 ${
                        item.status === 'rejected'
                          ? 'bg-amber-50 text-amber-400 border-amber-100 opacity-50 cursor-not-allowed'
                          : 'bg-amber-500 hover:bg-amber-600 text-white border-amber-700 active:border-b-0 active:translate-y-0.5'
                      }`}
                      title="Reject face"
                    >
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                      <span className="hidden sm:inline">Reject</span>
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => openDeleteModal(item)}
                      className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-[11px] font-cartoon font-black bg-rose-500 hover:bg-rose-600 text-white border-b-2 border-rose-700 active:border-b-0 active:translate-y-0.5 transition-all cursor-pointer"
                      title="Delete permanently"
                    >
                      <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* EDITING MODAL */}
      {editingFace && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-slate-200 border-b-6 max-w-lg w-full p-6 space-y-4 shadow-xl animate-scaleIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-cartoon font-black text-xl text-slate-800 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#1cb0f6]" />
                EDIT SUBMISSION DETAILS
              </h3>
              <button
                onClick={() => setEditingFace(null)}
                className="p-1 rounded-xl text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-cartoon font-black uppercase text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 focus:border-[#1cb0f6] text-xs font-cartoon font-black text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-cartoon font-black uppercase text-slate-700">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 text-xs font-bold text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-cartoon font-black uppercase text-slate-700">
                    Occupation
                  </label>
                  <input
                    type="text"
                    value={editOccupation}
                    onChange={(e) => setEditOccupation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 text-xs font-bold text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-cartoon font-black uppercase text-slate-700">
                  Origin / Location
                </label>
                <input
                  type="text"
                  value={editOrigin}
                  onChange={(e) => setEditOrigin(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 text-xs font-bold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-cartoon font-black uppercase text-slate-700">
                  Image URL
                </label>
                <input
                  type="text"
                  required
                  value={editImageUrl}
                  onChange={(e) => setEditImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 text-xs font-mono text-slate-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-cartoon font-black uppercase text-slate-700">
                  Fun Fact
                </label>
                <textarea
                  rows={2}
                  value={editFunFact}
                  onChange={(e) => setEditFunFact(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 text-xs font-bold text-slate-800 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingFace(null)}
                  className="px-4 py-2 rounded-xl font-cartoon font-black text-xs text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-5 py-2 rounded-xl font-cartoon font-black text-xs text-white bg-[#1cb0f6] hover:bg-[#3dbbf7] border-b-3 border-[#1899d6] cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingFace && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-slate-200 border-b-6 max-w-md w-full p-6 space-y-5 shadow-xl animate-scaleIn">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center shrink-0 border border-rose-200">
                <Trash2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-cartoon font-black text-lg text-slate-800">
                  Delete Submission?
                </h3>
                <p className="text-xs text-slate-500 font-bold">This action cannot be undone.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <div className="w-14 h-16 rounded-xl overflow-hidden border border-slate-200 bg-slate-200 shrink-0">
                <img
                  src={deletingFace.imageUrl}
                  alt={deletingFace.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-cartoon font-black text-sm text-slate-800 truncate">
                  {deletingFace.name}
                </h4>
                <p className="text-xs font-bold text-[#1cb0f6] truncate">
                  {deletingFace.occupation || 'No role specified'}
                </p>
                <p className="text-[11px] font-semibold text-slate-500">
                  Status: <span className="uppercase text-slate-700 font-bold">{deletingFace.status}</span>
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Are you sure you want to permanently delete <strong className="text-slate-800">"{deletingFace.name}"</strong> from Firestore?
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeletingFace(null)}
                className="px-4 py-2.5 rounded-2xl font-cartoon font-black text-xs text-slate-600 hover:bg-slate-100 cursor-pointer border border-slate-200"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-2xl font-cartoon font-black text-xs text-white bg-rose-600 hover:bg-rose-700 border-b-3 border-rose-800 cursor-pointer flex items-center gap-2 shadow-xs disabled:opacity-50"
              >
                {isDeleting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4 stroke-[2.5]" />
                )}
                <span>{isDeleting ? 'Deleting...' : 'Delete Permanently'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
