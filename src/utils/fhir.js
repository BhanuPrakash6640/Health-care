// Utility functions for FHIR-like export/import

/**
 * Export patient records as a FHIR-like bundle
 * @param {Array} records - Array of patient records
 * @returns {Object} FHIR-like bundle
 */
export function exportFHIRBundle(records) {
  // Create FHIR-like resources based on record types
  const resources = records.map(record => {
    switch (record.type) {
      case 'demographics':
        return createPatientResource(record);
      case 'medication':
        return createMedicationStatementResource(record);
      case 'diagnosis':
        return createConditionResource(record);
      case 'lab':
        return createObservationResource(record);
      case 'visit':
        return createEncounterResource(record);
      case 'immunization':
        return createImmunizationResource(record);
      case 'allergy':
        return createAllergyIntoleranceResource(record);
      case 'procedure':
        return createProcedureResource(record);
      default:
        return createBasicResource(record);
    }
  });

  // Create bundle
  return {
    resourceType: "Bundle",
    type: "collection",
    timestamp: new Date().toISOString(),
    entry: resources.map(resource => ({
      resource: resource
    }))
  };
}

/**
 * Redact PHI (Protected Health Information) from a record
 * @param {Object} record - Patient record
 * @returns {Object} Record with PHI redacted
 */
export function redactPHI(record) {
  // Create a copy of the record
  const redactedRecord = { ...record };
  
  // Redact PHI from content
  if (redactedRecord.content) {
    // Replace names (assuming first word is a name)
    redactedRecord.content = redactedRecord.content.replace(/\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/g, "[REDACTED NAME]");
    
    // Replace addresses
    redactedRecord.content = redactedRecord.content.replace(/\d+\s+[A-Za-z\s]+(?:St|Street|Ave|Avenue|Rd|Road|Blvd|Boulevard|Ln|Lane|Dr|Drive)[\s\w,#.-]*/gi, "[REDACTED ADDRESS]");
    
    // Replace phone numbers
    redactedRecord.content = redactedRecord.content.replace(/\(\d{3}\)\s*\d{3}-\d{4}/g, "[REDACTED PHONE]");
    
    // Replace SSN or similar identifiers
    redactedRecord.content = redactedRecord.content.replace(/\b\d{3}-?\d{2}-?\d{4}\b/g, "[REDACTED ID]");
  }
  
  // Redact PHI from title if needed
  if (redactedRecord.title) {
    redactedRecord.title = redactedRecord.title.replace(/\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/g, "[REDACTED NAME]");
  }
  
  return redactedRecord;
}

/**
 * Import FHIR-like JSON and convert to patient records
 * @param {Object} fhirBundle - FHIR-like bundle
 * @param {string} source - Source identifier for imported records
 * @returns {Array} Array of patient records
 */
export function importFHIRBundle(fhirBundle, source) {
  if (!fhirBundle.entry || !Array.isArray(fhirBundle.entry)) {
    return [];
  }

  return fhirBundle.entry.map(entry => {
    const resource = entry.resource;
    if (!resource) return null;

    // Convert FHIR resource to patient record based on resource type
    switch (resource.resourceType) {
      case 'Patient':
        return convertPatientResource(resource, source);
      case 'MedicationStatement':
        return convertMedicationStatementResource(resource, source);
      case 'Condition':
        return convertConditionResource(resource, source);
      case 'Observation':
        return convertObservationResource(resource, source);
      case 'Encounter':
        return convertEncounterResource(resource, source);
      case 'Immunization':
        return convertImmunizationResource(resource, source);
      case 'AllergyIntolerance':
        return convertAllergyIntoleranceResource(resource, source);
      case 'Procedure':
        return convertProcedureResource(resource, source);
      default:
        return convertBasicResource(resource, source);
    }
  }).filter(record => record !== null);
}

// Helper functions to create FHIR-like resources
function createPatientResource(record) {
  return {
    resourceType: "Patient",
    id: record.id,
    meta: {
      source: record.source,
      lastUpdated: record.date
    },
    text: {
      status: "generated",
      div: `<div xmlns="http://www.w3.org/1999/xhtml">${record.content}</div>`
    },
    active: true,
    name: [{
      use: "official",
      family: "Doe",
      given: ["John"]
    }],
    gender: "male",
    birthDate: "1988-01-01",
    address: [{
      use: "home",
      line: ["123 Main St"],
      city: "Anytown",
      state: "ST",
      postalCode: "12345"
    }]
  };
}

function createMedicationStatementResource(record) {
  return {
    resourceType: "MedicationStatement",
    id: record.id,
    meta: {
      source: record.source,
      lastUpdated: record.date
    },
    text: {
      status: "generated",
      div: `<div xmlns="http://www.w3.org/1999/xhtml">${record.content}</div>`
    },
    status: "active",
    medicationCodeableConcept: {
      text: record.title
    },
    subject: {
      reference: "Patient/pat1"
    },
    effectiveDateTime: record.date,
    note: [{
      text: record.content
    }]
  };
}

function createConditionResource(record) {
  return {
    resourceType: "Condition",
    id: record.id,
    meta: {
      source: record.source,
      lastUpdated: record.date
    },
    text: {
      status: "generated",
      div: `<div xmlns="http://www.w3.org/1999/xhtml">${record.content}</div>`
    },
    clinicalStatus: {
      coding: [{
        system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
        code: "active"
      }]
    },
    verificationStatus: {
      coding: [{
        system: "http://terminology.hl7.org/CodeSystem/condition-ver-status",
        code: "confirmed"
      }]
    },
    category: [{
      coding: [{
        system: "http://terminology.hl7.org/CodeSystem/condition-category",
        code: "encounter-diagnosis",
        display: "Encounter Diagnosis"
      }]
    }],
    code: {
      text: record.title
    },
    subject: {
      reference: "Patient/pat1"
    },
    onsetDateTime: record.date,
    recordedDate: record.date,
    note: [{
      text: record.content
    }]
  };
}

function createObservationResource(record) {
  return {
    resourceType: "Observation",
    id: record.id,
    meta: {
      source: record.source,
      lastUpdated: record.date
    },
    text: {
      status: "generated",
      div: `<div xmlns="http://www.w3.org/1999/xhtml">${record.content}</div>`
    },
    status: "final",
    category: [{
      coding: [{
        system: "http://terminology.hl7.org/CodeSystem/observation-category",
        code: "laboratory",
        display: "Laboratory"
      }]
    }],
    code: {
      text: record.title
    },
    subject: {
      reference: "Patient/pat1"
    },
    effectiveDateTime: record.date,
    valueString: record.content,
    note: [{
      text: record.content
    }]
  };
}

function createEncounterResource(record) {
  return {
    resourceType: "Encounter",
    id: record.id,
    meta: {
      source: record.source,
      lastUpdated: record.date
    },
    text: {
      status: "generated",
      div: `<div xmlns="http://www.w3.org/1999/xhtml">${record.content}</div>`
    },
    status: "finished",
    class: {
      system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
      code: "AMB",
      display: "ambulatory"
    },
    type: [{
      text: record.title
    }],
    subject: {
      reference: "Patient/pat1"
    },
    period: {
      start: record.date
    },
    reasonCode: [{
      text: "General checkup"
    }],
    serviceProvider: {
      display: record.source
    }
  };
}

function createImmunizationResource(record) {
  return {
    resourceType: "Immunization",
    id: record.id,
    meta: {
      source: record.source,
      lastUpdated: record.date
    },
    text: {
      status: "generated",
      div: `<div xmlns="http://www.w3.org/1999/xhtml">${record.content}</div>`
    },
    status: "completed",
    vaccineCode: {
      text: record.title
    },
    patient: {
      reference: "Patient/pat1"
    },
    occurrenceDateTime: record.date,
    note: [{
      text: record.content
    }]
  };
}

function createAllergyIntoleranceResource(record) {
  return {
    resourceType: "AllergyIntolerance",
    id: record.id,
    meta: {
      source: record.source,
      lastUpdated: record.date
    },
    text: {
      status: "generated",
      div: `<div xmlns="http://www.w3.org/1999/xhtml">${record.content}</div>`
    },
    clinicalStatus: {
      coding: [{
        system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
        code: "active"
      }]
    },
    verificationStatus: {
      coding: [{
        system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
        code: "confirmed"
      }]
    },
    type: "allergy",
    category: ["medication"],
    criticality: "low",
    code: {
      text: record.title
    },
    patient: {
      reference: "Patient/pat1"
    },
    recordedDate: record.date,
    note: [{
      text: record.content
    }]
  };
}

function createProcedureResource(record) {
  return {
    resourceType: "Procedure",
    id: record.id,
    meta: {
      source: record.source,
      lastUpdated: record.date
    },
    text: {
      status: "generated",
      div: `<div xmlns="http://www.w3.org/1999/xhtml">${record.content}</div>`
    },
    status: "completed",
    code: {
      text: record.title
    },
    subject: {
      reference: "Patient/pat1"
    },
    performedDateTime: record.date,
    note: [{
      text: record.content
    }]
  };
}

function createBasicResource(record) {
  return {
    resourceType: "Basic",
    id: record.id,
    meta: {
      source: record.source,
      lastUpdated: record.date
    },
    text: {
      status: "generated",
      div: `<div xmlns="http://www.w3.org/1999/xhtml">${record.content}</div>`
    },
    code: {
      text: record.title
    },
    subject: {
      reference: "Patient/pat1"
    },
    created: record.date,
    author: {
      display: record.source
    }
  };
}

// Helper functions to convert FHIR resources to patient records
function convertPatientResource(resource, source) {
  return {
    id: resource.id || generateId(),
    patientId: "pat1",
    type: "demographics",
    title: "Patient Demographics",
    content: resource.text?.div ? stripHtmlTags(resource.text.div) : "Patient demographics data",
    date: resource.meta?.lastUpdated || new Date().toISOString(),
    source: source,
    consented: false
  };
}

function convertMedicationStatementResource(resource, source) {
  return {
    id: resource.id || generateId(),
    patientId: "pat1",
    type: "medication",
    title: resource.medicationCodeableConcept?.text || "Medication Statement",
    content: resource.note?.[0]?.text || "Medication information",
    date: resource.effectiveDateTime || resource.meta?.lastUpdated || new Date().toISOString(),
    source: source,
    consented: false
  };
}

function convertConditionResource(resource, source) {
  return {
    id: resource.id || generateId(),
    patientId: "pat1",
    type: "diagnosis",
    title: resource.code?.text || "Medical Condition",
    content: resource.note?.[0]?.text || "Condition details",
    date: resource.onsetDateTime || resource.recordedDate || resource.meta?.lastUpdated || new Date().toISOString(),
    source: source,
    consented: false
  };
}

function convertObservationResource(resource, source) {
  return {
    id: resource.id || generateId(),
    patientId: "pat1",
    type: "lab",
    title: resource.code?.text || "Observation",
    content: resource.valueString || resource.note?.[0]?.text || "Observation data",
    date: resource.effectiveDateTime || resource.meta?.lastUpdated || new Date().toISOString(),
    source: source,
    consented: false
  };
}

function convertEncounterResource(resource, source) {
  return {
    id: resource.id || generateId(),
    patientId: "pat1",
    type: "visit",
    title: resource.type?.[0]?.text || "Encounter",
    content: resource.reasonCode?.[0]?.text || resource.text?.div ? stripHtmlTags(resource.text.div) : "Encounter details",
    date: resource.period?.start || resource.meta?.lastUpdated || new Date().toISOString(),
    source: source,
    consented: false
  };
}

function convertImmunizationResource(resource, source) {
  return {
    id: resource.id || generateId(),
    patientId: "pat1",
    type: "immunization",
    title: resource.vaccineCode?.text || "Immunization",
    content: resource.note?.[0]?.text || "Immunization details",
    date: resource.occurrenceDateTime || resource.meta?.lastUpdated || new Date().toISOString(),
    source: source,
    consented: false
  };
}

function convertAllergyIntoleranceResource(resource, source) {
  return {
    id: resource.id || generateId(),
    patientId: "pat1",
    type: "allergy",
    title: resource.code?.text || "Allergy Intolerance",
    content: resource.note?.[0]?.text || "Allergy information",
    date: resource.recordedDate || resource.meta?.lastUpdated || new Date().toISOString(),
    source: source,
    consented: false
  };
}

function convertProcedureResource(resource, source) {
  return {
    id: resource.id || generateId(),
    patientId: "pat1",
    type: "procedure",
    title: resource.code?.text || "Procedure",
    content: resource.note?.[0]?.text || "Procedure details",
    date: resource.performedDateTime || resource.meta?.lastUpdated || new Date().toISOString(),
    source: source,
    consented: false
  };
}

function convertBasicResource(resource, source) {
  return {
    id: resource.id || generateId(),
    patientId: "pat1",
    type: "other",
    title: resource.code?.text || "Record",
    content: resource.text?.div ? stripHtmlTags(resource.text.div) : "Record details",
    date: resource.created || resource.meta?.lastUpdated || new Date().toISOString(),
    source: source,
    consented: false
  };
}

// Utility functions
function generateId() {
  return 'rec' + Math.random().toString(36).substr(2, 9);
}

function stripHtmlTags(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, '');
}