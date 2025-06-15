
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { degree, skills, goal } = await req.json();

    // Build the prompt for Gemini
    const prompt = `You are an expert career advisor for healthcare students. 

Analyze this profile:
- Degree: ${degree || 'Not specified'}
- Skills: ${skills || 'Not specified'}
- Career Goal: ${goal || 'Not specified'}

Please provide a structured career analysis in the following JSON format:
{
  "topRoles": [
    {
      "title": "Job Title",
      "description": "One-line description",
      "emoji": "🏥"
    }
  ],
  "roadmap": [
    {
      "step": "Step description",
      "emoji": "📘"
    }
  ],
  "skillsTodevelop": [
    {
      "skill": "Skill name",
      "category": "Technical" | "Soft" | "Scientific",
      "description": "Brief description"
    }
  ],
  "courses": [
    {
      "name": "Course/Certification name",
      "priority": "High" | "Medium" | "Low"
    }
  ]
}

Focus on healthcare/pharmaceutical careers. Be specific and actionable. Respond with ONLY valid JSON.`;

    // Call Gemini API
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDaopAycZPL2XEDnUVWL9Gc6cLtL42G5D4`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const geminiData = await geminiResponse.json();
    const analysisText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Try to parse JSON from Gemini response
    let structuredAnalysis;
    try {
      // Extract JSON from response (in case Gemini adds extra text)
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        structuredAnalysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini JSON:', parseError);
      // Fallback structured response
      structuredAnalysis = {
        topRoles: [
          {
            title: "Healthcare Professional",
            description: "Based on your background, explore healthcare opportunities",
            emoji: "🏥"
          }
        ],
        roadmap: [
          {
            step: "Complete your current degree with focus on practical skills",
            emoji: "📘"
          },
          {
            step: "Gain relevant experience through internships or projects",
            emoji: "💼"
          }
        ],
        skillsTodev: [
          {
            skill: "Communication skills",
            category: "Soft",
            description: "Essential for healthcare professionals"
          }
        ],
        courses: [
          {
            name: "Healthcare Management Certificate",
            priority: "Medium"
          }
        ]
      };
    }

    return new Response(JSON.stringify({
      success: true,
      analysis: structuredAnalysis,
      rawResponse: analysisText
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analysis function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
