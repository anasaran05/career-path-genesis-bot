
export interface FormData {
  // Personal Info
  fullName: string;
  email: string;
  phone: string;
  location: string;
  
  // Education Background
  ugDegree: string;
  ugSpecialization: string;
  ugYear: string;
  pgDegree: string;
  pgSpecialization: string;
  pgYear: string;
  
  // Skills & Experience
  technicalSkills: string;
  softSkills: string;
  internships: string;
  projects: string;
  certifications: string;
  
  // Career Goals
  preferredIndustry: string;
  careerGoals: string;
  jobLocations: string;
  salaryExpectation: string;
  workStyle: string;
}

export interface StepProps {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
}
