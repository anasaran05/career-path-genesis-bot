import { FormData } from "@/types/intake";

export const performGeminiAnalysis = async (profileData: FormData) => {
  // Build comprehensive prompt from form data
  const degree = `${profileData.ugDegree} ${profileData.ugSpecialization} (${profileData.ugYear}) | ${profileData.pgDegree} ${profileData.pgSpecialization} (${profileData.pgYear})`;
  const skills = `Technical: ${profileData.technicalSkills} | Soft: ${profileData.softSkills} | Certifications: ${profileData.certifications}`;
  const goals = `Industry: ${profileData.preferredIndustry} | Goals: ${profileData.careerGoals} | Locations: ${profileData.jobLocations} | Salary: ${profileData.salaryExpectation}`;

  // Build dynamic prompt
  const prompt = `You are an expert career advisor.
Analyze this profile and recommend suitable job roles, ideal career paths, and skill improvements:

Degree: ${degree}
Skills: ${skills}
Career Goals: ${goals}
Experience: ${profileData.internships}
Projects: ${profileData.projects}

Give detailed advice with next steps. Keep it human-friendly.`;

  // Mock analysis for now since we removed Supabase
  const mockAnalysis = `Based on your ${degree} background, you have excellent potential in pharmaceutical careers. 

Your educational foundation positions you well for roles in:
- Clinical Research Associate positions
- Regulatory Affairs specialist roles  
- Pharmaceutical industry positions

Key recommendations:
1. Complete GCP certification for clinical research roles
2. Build experience through internships at CROs
3. Develop regulatory knowledge through specialized courses
4. Network with industry professionals on LinkedIn

Your combination of technical skills and career goals aligns well with the growing pharmaceutical sector in India.`;

  return mockAnalysis;
};