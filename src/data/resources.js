export const resourceData = {
  beds: {
    total: 100,
    occupied: 65,
    departments: {
      "Emergency": { total: 20, occupied: 18 },
      "ICU": { total: 15, occupied: 12 },
      "Surgery": { total: 25, occupied: 20 },
      "General": { total: 40, occupied: 15 }
    }
  },
  staff: {
    total: 150,
    onShift: 95,
    roles: {
      "Doctors": { total: 30, onShift: 22 },
      "Nurses": { total: 80, onShift: 55 },
      "Technicians": { total: 25, onShift: 12 },
      "Administrative": { total: 15, onShift: 6 }
    }
  },
  equipment: {
    total: 200,
    available: 165,
    types: {
      "Ventilators": { total: 25, available: 20 },
      "MRI Machines": { total: 3, available: 2 },
      "X-Ray Machines": { total: 8, available: 7 },
      "Ultrasound": { total: 12, available: 10 },
      "Infusion Pumps": { total: 50, available: 45 },
      "Defibrillators": { total: 15, available: 14 }
    }
  }
};