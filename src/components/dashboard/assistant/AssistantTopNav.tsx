"use client";

import { useState, useEffect } from 'react';
import { Search, Bell, Menu, Check, X as XIcon, Info } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { toast, Toaster } from 'sonner';

export default function AssistantTopNav() {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [invites, setInvites] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  
  // Format current date e.g., Oct 24, 2026
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  useEffect(() => {
    // Load invites targeted at this assistant
    if ((user as any)?.assistantId) {
      const invitesStr = localStorage.getItem('shustota_invites');
      if (invitesStr) {
        const allInvites = JSON.parse(invitesStr);
        setInvites(allInvites.filter((i: any) => i.assistantId === (user as any).assistantId && i.status === 'pending'));
      }
    }
    
    // Load notifications targeted at this assistant
    if (user?.id) {
      const notifStr = localStorage.getItem('shustota_notifications');
      if (notifStr) {
        const allNotifs = JSON.parse(notifStr);
        setNotifications(allNotifs.filter((n: any) => n.targetId === (user as any).assistantId || n.targetId === user.id));
      }
    }
  }, [user, showNotifications]);

  const handleAcceptInvite = (inviteId: string) => {
    const invitesStr = localStorage.getItem('shustota_invites');
    if (invitesStr) {
      const allInvites = JSON.parse(invitesStr);
      const updatedInvites = allInvites.map((i: any) => 
        i.id === inviteId ? { ...i, status: 'accepted' } : i
      );
      localStorage.setItem('shustota_invites', JSON.stringify(updatedInvites));
      setInvites(updatedInvites.filter((i: any) => i.assistantId === (user as any)?.assistantId && i.status === 'pending'));
      toast.success("Invite accepted! You are now connected.");
    }
  };

  const handleRejectInvite = (inviteId: string) => {
    const invitesStr = localStorage.getItem('shustota_invites');
    if (invitesStr) {
      const allInvites = JSON.parse(invitesStr);
      const updatedInvites = allInvites.map((i: any) => 
        i.id === inviteId ? { ...i, status: 'rejected' } : i
      );
      localStorage.setItem('shustota_invites', JSON.stringify(updatedInvites));
      setInvites(updatedInvites.filter((i: any) => i.assistantId === (user as any)?.assistantId && i.status === 'pending'));
    }
  };

  const totalNotifs = invites.length + notifications.length;

  return (
    <header className="h-[80px] bg-white border-b border-assistant-border flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-40 shadow-sm relative">
      <Toaster position="top-center" />
      
      {/* Left side: Doctor Profile & Chamber */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col">
          <h2 className="text-[15px] font-bold text-slate-800">
            {invites.length === 0 && notifications.length === 0 ? "Dr. Sarah Rahman" : "Not Connected"}
          </h2>
          <span className="text-[13px] text-slate-500">
            {invites.length === 0 && notifications.length === 0 ? "Chamber: City Hospital Unit 2" : "Awaiting Doctor Invite"}
          </span>
        </div>
        <div className="hidden md:block h-10 w-[1px] bg-assistant-border"></div>
        <div className="hidden lg:flex flex-col">
          <span className="text-[13px] text-slate-500">Assistant Profile (ID: {(user as any)?.assistantId || 'N/A'})</span>
          <h3 className="text-[15px] font-semibold text-slate-700">{user?.name || "Kamrul Hasan"}</h3>
        </div>
      </div>

      {/* Middle: Search */}
      <div className="flex-1 max-w-[420px] mx-4 hidden md:block relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search patient, ID, phone number..."
          className="w-full h-[48px] bg-assistant-bg border border-assistant-border rounded-[12px] pl-11 pr-4 text-[15px] text-slate-700 focus:outline-none focus:border-assistant-primary transition-all"
        />
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="hidden xl:block text-[14px] font-medium text-slate-500 mr-2">
          {currentDate}
        </div>

        <button className="h-[48px] px-6 bg-assistant-danger/10 text-assistant-danger rounded-[12px] font-semibold text-[15px] hover:bg-assistant-danger hover:text-white transition-all hidden sm:block">
          Emergency
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-400 hover:text-assistant-primary transition-colors focus:outline-none"
          >
            <Bell size={24} />
            {totalNotifs > 0 && (
              <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-assistant-danger rounded-full border-2 border-white"></span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-[120%] w-[360px] bg-white rounded-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden z-50"
              >
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <h3 className="font-bold text-slate-800">Notifications</h3>
                  {totalNotifs > 0 && (
                    <span className="bg-assistant-primary text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                      {totalNotifs} New
                    </span>
                  )}
                </div>
                
                <div className="max-h-[380px] overflow-y-auto custom-scrollbar">
                  {totalNotifs === 0 ? (
                    <div className="p-8 text-center flex flex-col items-center justify-center">
                      <Bell size={32} className="text-slate-200 mb-3" />
                      <p className="text-slate-500 font-medium">No new notifications</p>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {/* Invites */}
                      {invites.map(invite => (
                        <div key={invite.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                          <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-assistant-primary/10 flex items-center justify-center shrink-0">
                              <Info size={20} className="text-assistant-primary" />
                            </div>
                            <div>
                              <h4 className="text-[14px] font-bold text-slate-800">Clinic Invitation</h4>
                              <p className="text-[13px] text-slate-500 mt-0.5 leading-snug">
                                Dr. Sarah Rahman has invited you to join as <strong>{invite.role}</strong>.
                              </p>
                              <div className="flex gap-2 mt-3">
                                <button 
                                  onClick={() => handleAcceptInvite(invite.id)}
                                  className="flex-1 bg-assistant-primary hover:bg-[#0c9c74] text-white text-[12px] font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1"
                                >
                                  <Check size={14} /> Accept
                                </button>
                                <button 
                                  onClick={() => handleRejectInvite(invite.id)}
                                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[12px] font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1"
                                >
                                  <XIcon size={14} /> Decline
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* General Notifications */}
                      {notifications.map(notif => (
                        <div key={notif.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors opacity-80">
                          <div className="flex gap-3 items-center">
                            <div className="w-2 h-2 rounded-full bg-assistant-danger shrink-0 mt-1"></div>
                            <p className="text-[13px] text-slate-700 font-medium leading-snug">{notif.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-[48px] h-[48px] rounded-full overflow-hidden border-2 border-slate-100 relative bg-slate-200">
            <Image src="/images/signup-doctor.png" alt="Assistant" fill className="object-cover" />
          </div>
        </div>

        <button className="md:hidden text-slate-500">
          <Menu size={28} />
        </button>
      </div>

    </header>
  );
}
