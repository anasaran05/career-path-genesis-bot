
import { supabase } from "@/integrations/supabase/client";
import { FormData } from "@/types/intake";

export const performGeminiAnalysis = async (profileData: FormData) => {
  // Get logged-in user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error("Authentication required");
  }

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

  // Call Gemini API with the provided API key
  const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDaopAycZPL2XEDnUVWL9Gc6cLtL42G5D4`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const geminiJson = await geminiRes.json();
  const analysis = geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text || 'No result from Gemini.';

  // Save to Supabase
  const { error: insertError } = await supabase.from('career_analysis').insert([{
    user_id: user.id,
    degree: degree,
    skills: skills,
    goals: goals,
    analysis_result: analysis
  }]);

  if (insertError) {
    console.error('DB Error:', insertError);
    throw new Error("Failed to save analysis");
  }

  return analysis;
};
