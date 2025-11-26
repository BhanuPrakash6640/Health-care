import React, { useState, useEffect } from "react";
import { CalendarIcon, ClockIcon, UserIcon, MapPinIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Scheduler from "../components/Scheduler";
import { providers } from "../data/providers";
import { appointments as initialAppointments } from "../data/appointments";
import { logAccess, AUDIT_ACTIONS } from "../utils/audit";

export default function Appointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [showScheduler, setShowScheduler] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Log page view
  useEffect(() => {
    logAccess({
      user: "demo_user",
      action: AUDIT_ACTIONS.APPOINTMENT_CREATE,
      targetId: "appointments_page",
      source: "Appointments Page"
    });
  }, []);

  // Calculate estimated wait times based on queue length
  const getEstimatedWaitTime = (providerId) => {
    // In a real system, this would come from an API
    // For demo purposes, we'll simulate based on appointment density
    const providerAppointments = appointments.filter(apt => apt.providerId === providerId);
    const queueLength = providerAppointments.length;
    
    // Simple calculation: 15 minutes per appointment in queue
    return queueLength * 15;
  };

  const handleBookAppointment = (appointmentData) => {
    const newAppointment = {
      id: `apt${Date.now()}`,
      patientId: "pat1",
      ...appointmentData,
      status: "scheduled"
    };
    
    setAppointments([...appointments, newAppointment]);
    setShowScheduler(false);
    
    // Log appointment creation
    logAccess({
      user: "demo_user",
      action: AUDIT_ACTIONS.APPOINTMENT_CREATE,
      targetId: newAppointment.id,
      source: "Appointments Page"
    });
  };

  const handleCancelAppointment = (appointmentId) => {
    setAppointments(appointments.filter(apt => apt.id !== appointmentId));
    
    // Log appointment cancellation
    logAccess({
      user: "demo_user",
      action: AUDIT_ACTIONS.APPOINTMENT_CANCEL,
      targetId: appointmentId,
      source: "Appointments Page"
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getProviderById = (providerId) => {
    return providers.find(p => p.id === providerId);
  };

  // Get appointments for the current week
  const getAppointmentsForWeek = () => {
    const weekStart = new Date(currentWeek);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate >= weekStart && aptDate <= weekEnd;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const upcomingAppointments = getAppointmentsForWeek();

  return (
    <div className="p-6 text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Appointments</h1>
          <p className="opacity-70 mt-1">
            Schedule and manage your healthcare appointments
          </p>
        </div>
        <button
          onClick={() => setShowScheduler(true)}
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
        >
          Book New Appointment
        </button>
      </div>

      {/* Demo Disclaimer */}
      <div className="bg-yellow-900/30 border border-yellow-800 rounded-lg p-4 mb-6">
        <p className="text-yellow-200 text-sm">
          ⚠️ <strong>Demo Only:</strong> This is a simulated appointment system for demonstration purposes only. 
          No real appointments are being booked. All data is mock data for UI/UX evaluation.
        </p>
      </div>

      {/* Wait Time Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {providers.map(provider => {
          const waitTime = getEstimatedWaitTime(provider.id);
          return (
            <div key={provider.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
              <div className="flex items-start">
                <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                  <UserIcon className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{provider.name}</h3>
                  <p className="text-sm text-gray-400">{provider.clinic}</p>
                  <div className="mt-2 flex items-center text-sm">
                    <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                    <span>
                      Est. wait: <span className="font-medium">{waitTime} min</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Calendar View */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">This Week</h2>
          <div className="flex space-x-2">
            <button 
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              onClick={() => {
                const newWeek = new Date(currentWeek);
                newWeek.setDate(newWeek.getDate() - 7);
                setCurrentWeek(newWeek);
              }}
            >
              ←
            </button>
            <button 
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              onClick={() => setCurrentWeek(new Date())}
            >
              Today
            </button>
            <button 
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              onClick={() => {
                const newWeek = new Date(currentWeek);
                newWeek.setDate(newWeek.getDate() + 7);
                setCurrentWeek(newWeek);
              }}
            >
              →
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={day} className="text-center p-2">
              <div className="text-sm font-medium">{day}</div>
            </div>
          ))}
          
          {Array.from({ length: 7 }).map((_, index) => {
            const date = new Date(currentWeek);
            date.setDate(date.getDate() + index);
            const dateStr = date.toISOString().split('T')[0];
            
            const dayAppointments = appointments.filter(apt => 
              new Date(apt.date).toISOString().split('T')[0] === dateStr
            );
            
            return (
              <div key={index} className="bg-gray-700/30 rounded-lg p-2 min-h-24">
                <div className="text-center text-sm font-medium mb-1">
                  {date.getDate()}
                </div>
                <div className="space-y-1">
                  {dayAppointments.slice(0, 3).map(apt => {
                    const provider = getProviderById(apt.providerId);
                    return (
                      <div key={apt.id} className="text-xs bg-gray-700 rounded p-1 truncate">
                        <div className="font-medium">{formatTime(apt.date)}</div>
                        <div className="truncate">{provider?.name || 'Unknown Provider'}</div>
                      </div>
                    );
                  })}
                  {dayAppointments.length > 3 && (
                    <div className="text-xs text-gray-400 text-center">
                      +{dayAppointments.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Appointments List */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
        
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map(appointment => {
              const provider = getProviderById(appointment.providerId);
              return (
                <div key={appointment.id} className="bg-gray-700/30 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-start">
                    <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                      <CalendarIcon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">{appointment.type}</h3>
                      <div className="flex items-center text-sm text-gray-300 mt-1">
                        <UserIcon className="h-4 w-4 mr-1" />
                        <span>{provider?.name || 'Unknown Provider'}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-300 mt-1">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        <span>{provider?.clinic || 'Unknown Clinic'}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-300 mt-1">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>{formatDate(appointment.date)} at {formatTime(appointment.date)}</span>
                      </div>
                      {appointment.notes && (
                        <p className="text-sm text-gray-400 mt-2">{appointment.notes}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCancelAppointment(appointment.id)}
                    className="p-2 text-gray-400 hover:text-red-400 rounded-full hover:bg-red-500/20"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-gray-600" />
            <p>No upcoming appointments</p>
            <p className="text-sm mt-1">Book a new appointment to get started</p>
          </div>
        )}
      </div>

      {/* Scheduler Modal */}
      {showScheduler && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Schedule Appointment</h2>
                <button 
                  onClick={() => setShowScheduler(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <Scheduler onBookAppointment={handleBookAppointment} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}