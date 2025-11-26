import React, { useState } from "react";
import { providers } from "../data/providers";

export default function Scheduler({ onBookAppointment }) {
  const [selectedProvider, setSelectedProvider] = useState(providers[0]?.id || "");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [notes, setNotes] = useState("");

  const selectedProviderData = providers.find(p => p.id === selectedProvider);

  // Get available times for the selected date
  const getAvailableTimes = () => {
    if (!selectedProviderData || !selectedDate) return [];
    
    const date = new Date(selectedDate);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    
    return selectedProviderData.availability[dayOfWeek] || [];
  };

  const handleBook = () => {
    if (!selectedProvider || !selectedDate || !selectedTime || !appointmentType) {
      alert("Please fill in all required fields");
      return;
    }

    const appointment = {
      providerId: selectedProvider,
      date: new Date(`${selectedDate}T${selectedTime}:00`).toISOString(),
      type: appointmentType,
      notes: notes
    };

    onBookAppointment(appointment);
    
    // Reset form
    setAppointmentType("");
    setNotes("");
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Book New Appointment</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Provider
          </label>
          <select
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
          >
            {providers.map(provider => (
              <option key={provider.id} value={provider.id}>
                {provider.name} - {provider.specialty}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Date
          </label>
          <input
            type="date"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Available Times
          </label>
          <select
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            disabled={!selectedProvider || !selectedDate}
          >
            <option value="">Select a time</option>
            {getAvailableTimes().map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {!selectedProvider && (
            <p className="text-xs text-gray-400 mt-1">Please select a provider first</p>
          )}
          {selectedProvider && !getAvailableTimes().length && (
            <p className="text-xs text-gray-400 mt-1">No available times for this date</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Appointment Type
          </label>
          <input
            type="text"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
            placeholder="e.g., Checkup, Consultation"
            value={appointmentType}
            onChange={(e) => setAppointmentType(e.target.value)}
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Notes (Optional)
        </label>
        <textarea
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
          rows="3"
          placeholder="Additional information for the provider..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
          onClick={handleBook}
          disabled={!selectedProvider || !selectedDate || !selectedTime || !appointmentType}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}