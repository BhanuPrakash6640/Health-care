import React, { useState, useEffect, useRef } from "react";
import { UserIcon, ShieldCheckIcon, CogIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function RoleSwitcher({ onRoleChange, isOpen, onClose }) {
  const [currentRole, setCurrentRole] = useState("patient");
  const modalRef = useRef(null);

  // Load role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('healthdash_role');
    if (savedRole) {
      setCurrentRole(savedRole);
      if (onRoleChange) {
        onRoleChange(savedRole);
      }
    }
  }, [onRoleChange]);

  // Handle outside clicks and Escape key
  useEffect(() => {
    function handleClick(e) {
      if (!modalRef.current) return;
      if (!modalRef.current.contains(e.target)) {
        onClose?.();
      }
    }
    
    function handleEsc(e) {
      if (e.key === "Escape") onClose?.();
    }
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleEsc);
      // Focus modal for accessibility
      setTimeout(() => modalRef.current?.focus?.(), 0);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Save role to localStorage when it changes
  const handleRoleChange = (role) => {
    setCurrentRole(role);
    localStorage.setItem('healthdash_role', role);
    if (onRoleChange) {
      onRoleChange(role);
    }
    onClose?.(); // Close modal after selection
  };

  if (!isOpen) return null;

  const roles = [
    {
      id: "patient",
      name: "Patient",
      icon: <UserIcon className="h-5 w-5" />,
      description: "View personal health records and schedule appointments"
    },
    {
      id: "clinician",
      name: "Clinician",
      icon: <ShieldCheckIcon className="h-5 w-5" />,
      description: "Access patient records, manage appointments, and view audit logs"
    },
    {
      id: "admin",
      name: "Administrator",
      icon: <CogIcon className="h-5 w-5" />,
      description: "Manage resources, view system analytics, and configure settings"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onClose?.()}
        aria-hidden="true"
      />

      {/* modal */}
      <motion.div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="relative z-10 w-full max-w-4xl p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">User Role</h3>
          <button
            aria-label="Close role selector"
            onClick={() => onClose?.()}
            className="px-3 py-1 rounded bg-white/5"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              className={`p-6 rounded-xl text-left ${currentRole === role.id ? 'ring-2 ring-blue-400 bg-blue-500/10' : 'bg-white/5 hover:bg-white/10'}`}
              onClick={() => handleRoleChange(role.id)}
            >
              <div className="flex items-center mb-3">
                <div className={`p-2 rounded-lg mr-3 ${
                  currentRole === role.id
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-gray-700 text-gray-400"
                }`}>
                  {role.icon}
                </div>
                <h4 className="font-medium">{role.name}</h4>
              </div>
              <p className="text-sm text-gray-400">{role.description}</p>
              
              {currentRole === role.id && (
                <div className="mt-3 text-xs text-blue-400 flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Current role
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-900/20 rounded-lg">
          <p className="text-xs text-blue-200">
            <strong>Note:</strong> This is a demo role switcher for UI evaluation only. 
            No real authentication or authorization is implemented. Role selection is stored locally.
          </p>
        </div>
      </motion.div>
    </div>
  );
}