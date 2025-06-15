
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

    if (!degree?.trim()) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Degree is required for analysis' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Build a detailed, personalized prompt
    const skillsText = skills?.trim() ? `Skills: ${skills}` : 'Skills: Not specified';
    const goalText = goal?.trim() ? `Career Goal: ${goal}` : 'Career Goal: Open to various opportunities';

    const prompt = `You are an expert career advisor for healthcare professionals. Analyze this specific profile and provide personalized career guidance:

PROFILE TO ANALYZE:
- Degree: ${degree.trim()}
- ${skillsText}
- ${goalText}

Please provide a detailed career analysis in the following JSON format. Make sure your recommendations are SPECIFIC to this person's degree and background:

{
  "topRoles": [
    {
      "title": "Specific job title based on their degree",
      "description": "Why this role fits their background",
      "emoji": "🏥"
    },
    {
      "title": "Another relevant role",
      "description": "How their degree qualifies them",
      "emoji": "💊"
    },
    {
      "title": "Third career option",
      "description": "Growth potential with their background",
      "emoji": "🔬"
    }
  ],
  "roadmap": [
    {
      "step": "First step specific to their current situation",
      "emoji": "📘"
    },
    {
      "step": "Second step building on their degree",
      "emoji": "💼"
    },
    {
      "step": "Third step for career advancement",
      "emoji": "🎯"
    },
    {
      "step": "Long-term career development",
      "emoji": "🚀"
    }
  ],
  "skillsTodev": [
    {
      "skill": "Specific skill they need based on their degree",
      "category": "Technical",
      "description": "Why this skill is important for their field"
    },
    {
      "skill": "Communication skill relevant to healthcare",
      "category": "Soft",
      "description": "How this applies to their career path"
    },
    {
      "skill": "Research or analytical skill",
      "category": "Scientific",
      "description": "Specific to their degree background"
    }
  ],
  "courses": [
    {
      "name": "Course specific to their degree field",
      "priority": "High"
    },
    {
      "name": "Complementary certification",
      "priority": "Medium"
    },
    {
      "name": "Optional enhancement course",
      "priority": "Low"
    }
  ]
}

IMPORTANT: 
- Make ALL recommendations specific to "${degree.trim()}" 
- Consider their stated skills: "${skills || 'general healthcare background'}"
- Align with their goal: "${goal || 'career growth in healthcare'}"
- Focus on healthcare/pharmaceutical industry opportunities
- Provide actionable, realistic advice
- Respond with ONLY valid JSON, no additional text`

    console.log('Sending request to Gemini for degree:', degree);

    // Call Gemini API
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDaopAycZPL2XEDnUVWL9Gc6cLtL42G5D4`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    const analysisText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!analysisText) {
      throw new Error('No response received from Gemini');
    }

    console.log('Raw Gemini response:', analysisText);

    // Try to parse JSON from Gemini response
    let structuredAnalysis;
    try {
      // Clean and extract JSON from response
      const cleanedText = analysisText.trim();
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        structuredAnalysis = JSON.parse(jsonMatch[0]);
        console.log('Successfully parsed structured analysis');
      } else {
        throw new Error('No valid JSON structure found in Gemini response');
      }

      // Validate the structure has required fields
      if (!structuredAnalysis.topRoles || !structuredAnalysis.roadmap || 
          !structuredAnalysis.skillsTodev || !structuredAnalysis.courses) {
        throw new Error('Incomplete analysis structure from Gemini');
      }

    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      console.error('Raw response was:', analysisText);
      
      // Return error instead of fallback - this ensures users get personalized responses
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to generate personalized analysis. Please try again.',
        rawResponse: analysisText
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Returning successful analysis for degree:', degree);

    return new Response(JSON.stringify({
      success: true,
      analysis: structuredAnalysis,
      userProfile: { degree, skills, goal } // Include user info for verification
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analysis function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: `Analysis failed: ${error.message}` 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
