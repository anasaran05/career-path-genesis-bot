import { FormData } from "@/types/intake";

export interface CareerAnalysisResult {
  summary: string;
  topRoles: Array<{
    title: string;
    description: string;
    matchScore: number;
    requirements: string[];
    salaryRange: string;
    growthPotential: string;
  }>;
  skillsAssessment: {
    technical: number;
    soft: number;
    domain: number;
    gaps: string[];
  };
  learningPath: Array<{
    step: string;
    priority: 'High' | 'Medium' | 'Low';
    timeframe: string;
    resources: string[];
  }>;
  marketInsights: {
    demand: string;
    trends: string[];
    opportunities: string[];
  };
  actionItems: Array<{
    task: string;
    deadline: string;
    importance: 'Critical' | 'Important' | 'Nice to have';
  }>;
}

export class CareerAnalysisEngine {
  private static degreeWeights = {
    'pharm.d': { clinical: 0.9, research: 0.8, regulatory: 0.7, industry: 0.8 },
    'b.pharm': { clinical: 0.7, research: 0.6, regulatory: 0.8, industry: 0.9 },
    'm.pharm': { clinical: 0.8, research: 0.9, regulatory: 0.8, industry: 0.8 },
    'd.pharm': { clinical: 0.8, research: 0.5, regulatory: 0.6, industry: 0.7 }
  };

  private static roleDatabase = {
    clinical: [
      {
        title: "Clinical Pharmacist",
        description: "Provide pharmaceutical care in hospital settings, optimize drug therapy",
        requirements: ["PharmD/B.Pharm", "Clinical experience", "Patient counseling skills"],
        salaryRange: "₹6-12 LPA",
        growthPotential: "High - Leadership roles, specialization opportunities"
      },
      {
        title: "Clinical Research Associate",
        description: "Monitor clinical trials, ensure protocol compliance, data integrity",
        requirements: ["Life sciences degree", "GCP certification", "Attention to detail"],
        salaryRange: "₹8-15 LPA",
        growthPotential: "Excellent - CRA to CRM to Director level progression"
      }
    ],
    regulatory: [
      {
        title: "Regulatory Affairs Specialist",
        description: "Ensure compliance with drug regulations, prepare submissions",
        requirements: ["Pharmacy/Life sciences degree", "Regulatory knowledge", "Documentation skills"],
        salaryRange: "₹7-14 LPA",
        growthPotential: "Very High - Critical role in pharma industry"
      },
      {
        title: "Drug Safety Associate",
        description: "Monitor adverse events, pharmacovigilance activities",
        requirements: ["Life sciences background", "PV certification", "Analytical skills"],
        salaryRange: "₹5-10 LPA",
        growthPotential: "Good - Specialized field with steady demand"
      }
    ],
    research: [
      {
        title: "Medical Writer",
        description: "Create scientific documents, regulatory submissions, publications",
        requirements: ["Advanced degree", "Scientific writing", "Research experience"],
        salaryRange: "₹8-18 LPA",
        growthPotential: "Excellent - Freelance and corporate opportunities"
      },
      {
        title: "Research Scientist",
        description: "Conduct pharmaceutical research, drug discovery and development",
        requirements: ["M.Pharm/PhD", "Research experience", "Laboratory skills"],
        salaryRange: "₹10-20 LPA",
        growthPotential: "High - Innovation-driven career path"
      }
    ],
    industry: [
      {
        title: "Product Manager",
        description: "Manage pharmaceutical product lifecycle, marketing strategies",
        requirements: ["Pharmacy + MBA", "Business acumen", "Leadership skills"],
        salaryRange: "₹12-25 LPA",
        growthPotential: "Excellent - Path to senior management"
      },
      {
        title: "Medical Affairs Manager",
        description: "Bridge medical and commercial teams, scientific communication",
        requirements: ["Advanced pharmacy degree", "Medical knowledge", "Communication skills"],
        salaryRange: "₹15-30 LPA",
        growthPotential: "Very High - Strategic role in pharma companies"
      }
    ]
  };

  static analyzeProfile(profileData: FormData): CareerAnalysisResult {
    const degree = this.extractDegree(profileData);
    const skills = this.analyzeSkills(profileData);
    const careerFit = this.calculateCareerFit(degree, skills, profileData);
    
    return {
      summary: this.generateSummary(profileData, careerFit),
      topRoles: this.getTopRoles(careerFit),
      skillsAssessment: skills,
      learningPath: this.generateLearningPath(profileData, careerFit),
      marketInsights: this.getMarketInsights(careerFit),
      actionItems: this.generateActionItems(profileData, careerFit)
    };
  }

  private static extractDegree(profileData: FormData): string {
    const pgDegree = profileData.pgDegree?.toLowerCase() || '';
    const ugDegree = profileData.ugDegree?.toLowerCase() || '';
    
    if (pgDegree.includes('pharm.d') || ugDegree.includes('pharm.d')) return 'pharm.d';
    if (pgDegree.includes('m.pharm')) return 'm.pharm';
    if (ugDegree.includes('b.pharm')) return 'b.pharm';
    if (ugDegree.includes('d.pharm')) return 'd.pharm';
    
    return 'b.pharm'; // default
  }

  private static analyzeSkills(profileData: FormData): {
    technical: number;
    soft: number;
    domain: number;
    gaps: string[];
  } {
    const technicalSkills = profileData.technicalSkills?.toLowerCase() || '';
    const softSkills = profileData.softSkills?.toLowerCase() || '';
    const experience = profileData.internships?.toLowerCase() || '';
    
    let technical = 60; // base score
    let soft = 65;
    let domain = 70;
    const gaps: string[] = [];

    // Technical skills assessment
    if (technicalSkills.includes('gcp') || technicalSkills.includes('clinical')) technical += 15;
    if (technicalSkills.includes('regulatory') || technicalSkills.includes('compliance')) technical += 10;
    if (technicalSkills.includes('research') || technicalSkills.includes('data')) technical += 10;
    if (technicalSkills.includes('pharmacovigilance') || technicalSkills.includes('safety')) technical += 12;

    // Soft skills assessment
    if (softSkills.includes('communication')) soft += 10;
    if (softSkills.includes('leadership') || softSkills.includes('team')) soft += 8;
    if (softSkills.includes('problem') || softSkills.includes('analytical')) soft += 7;

    // Domain knowledge from experience
    if (experience.includes('hospital') || experience.includes('clinical')) domain += 10;
    if (experience.includes('research') || experience.includes('trial')) domain += 12;
    if (experience.includes('industry') || experience.includes('pharma')) domain += 8;

    // Identify gaps
    if (technical < 75) gaps.push('Advanced technical certifications (GCP, PV)');
    if (soft < 75) gaps.push('Professional communication and leadership skills');
    if (domain < 80) gaps.push('Industry-specific knowledge and experience');

    return {
      technical: Math.min(technical, 95),
      soft: Math.min(soft, 95),
      domain: Math.min(domain, 95),
      gaps
    };
  }

  private static calculateCareerFit(degree: string, skills: any, profileData: FormData): any {
    const weights = this.degreeWeights[degree as keyof typeof this.degreeWeights] || this.degreeWeights['b.pharm'];
    const goals = profileData.careerGoals?.toLowerCase() || '';
    
    let fit = {
      clinical: weights.clinical * 0.4 + (skills.domain / 100) * 0.3 + (skills.technical / 100) * 0.3,
      research: weights.research * 0.4 + (skills.technical / 100) * 0.4 + (skills.domain / 100) * 0.2,
      regulatory: weights.regulatory * 0.3 + (skills.technical / 100) * 0.4 + (skills.soft / 100) * 0.3,
      industry: weights.industry * 0.3 + (skills.soft / 100) * 0.4 + (skills.domain / 100) * 0.3
    };

    // Adjust based on stated goals
    if (goals.includes('clinical')) fit.clinical += 0.1;
    if (goals.includes('research')) fit.research += 0.1;
    if (goals.includes('regulatory')) fit.regulatory += 0.1;
    if (goals.includes('industry') || goals.includes('business')) fit.industry += 0.1;

    return fit;
  }

  private static getTopRoles(careerFit: any): Array<{
    title: string;
    description: string;
    matchScore: number;
    requirements: string[];
    salaryRange: string;
    growthPotential: string;
  }> {
    const allRoles: any[] = [];
    
    Object.entries(this.roleDatabase).forEach(([category, roles]) => {
      roles.forEach(role => {
        allRoles.push({
          ...role,
          matchScore: Math.round((careerFit[category] || 0) * 100),
          category
        });
      });
    });

    return allRoles
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5)
      .map(({ category, ...role }) => role);
  }

  private static generateSummary(profileData: FormData, careerFit: any): string {
    const degree = this.extractDegree(profileData);
    const topCategory = Object.entries(careerFit).reduce((a, b) => careerFit[a[0]] > careerFit[b[0]] ? a : b)[0];
    
    const degreeMap = {
      'pharm.d': 'PharmD',
      'm.pharm': 'M.Pharm',
      'b.pharm': 'B.Pharm',
      'd.pharm': 'D.Pharm'
    };

    const categoryMap = {
      clinical: 'clinical pharmacy and patient care',
      research: 'pharmaceutical research and development',
      regulatory: 'regulatory affairs and compliance',
      industry: 'pharmaceutical industry and business'
    };

    return `Based on your ${degreeMap[degree as keyof typeof degreeMap]} background and profile analysis, you show strong potential in ${categoryMap[topCategory as keyof typeof categoryMap]}. Your combination of education and skills positions you well for growth in the pharmaceutical sector.`;
  }

  private static generateLearningPath(profileData: FormData, careerFit: any): Array<{
    step: string;
    priority: 'High' | 'Medium' | 'Low';
    timeframe: string;
    resources: string[];
  }> {
    const topCategory = Object.entries(careerFit).reduce((a, b) => careerFit[a[0]] > careerFit[b[0]] ? a : b)[0];
    
    const pathMap = {
      clinical: [
        {
          step: "Complete clinical pharmacy certification",
          priority: 'High' as const,
          timeframe: "2-3 months",
          resources: ["ACCP certification", "Hospital pharmacy training", "Clinical guidelines study"]
        },
        {
          step: "Gain hands-on clinical experience",
          priority: 'High' as const,
          timeframe: "6-12 months",
          resources: ["Hospital internships", "Clinical rotations", "Patient care programs"]
        }
      ],
      research: [
        {
          step: "Obtain GCP certification",
          priority: 'High' as const,
          timeframe: "1-2 months",
          resources: ["ICH-GCP training", "ACRP certification", "Clinical research courses"]
        },
        {
          step: "Learn statistical analysis tools",
          priority: 'Medium' as const,
          timeframe: "3-4 months",
          resources: ["SAS training", "R programming", "Biostatistics courses"]
        }
      ],
      regulatory: [
        {
          step: "Study regulatory guidelines",
          priority: 'High' as const,
          timeframe: "2-3 months",
          resources: ["FDA guidelines", "ICH guidelines", "Regulatory affairs courses"]
        },
        {
          step: "Get pharmacovigilance certification",
          priority: 'Medium' as const,
          timeframe: "1-2 months",
          resources: ["PV certification", "Drug safety courses", "Adverse event reporting"]
        }
      ],
      industry: [
        {
          step: "Develop business acumen",
          priority: 'High' as const,
          timeframe: "3-6 months",
          resources: ["MBA courses", "Business strategy", "Pharmaceutical marketing"]
        },
        {
          step: "Build leadership skills",
          priority: 'Medium' as const,
          timeframe: "Ongoing",
          resources: ["Leadership training", "Project management", "Team building workshops"]
        }
      ]
    };

    return pathMap[topCategory as keyof typeof pathMap] || pathMap.clinical;
  }

  private static getMarketInsights(careerFit: any): {
    demand: string;
    trends: string[];
    opportunities: string[];
  } {
    return {
      demand: "High demand for pharmaceutical professionals in India with 15-20% annual growth",
      trends: [
        "Digital health and telemedicine integration",
        "Personalized medicine and genomics",
        "Regulatory harmonization and compliance",
        "AI and data analytics in drug development"
      ],
      opportunities: [
        "Clinical research expansion in India",
        "Regulatory consulting services",
        "Digital health startups",
        "International pharmaceutical companies"
      ]
    };
  }

  private static generateActionItems(profileData: FormData, careerFit: any): Array<{
    task: string;
    deadline: string;
    importance: 'Critical' | 'Important' | 'Nice to have';
  }> {
    return [
      {
        task: "Update LinkedIn profile with pharmaceutical focus",
        deadline: "1 week",
        importance: 'Critical' as const
      },
      {
        task: "Apply for relevant certifications",
        deadline: "1 month",
        importance: 'Critical' as const
      },
      {
        task: "Network with industry professionals",
        deadline: "Ongoing",
        importance: 'Important' as const
      },
      {
        task: "Create a portfolio of projects",
        deadline: "2 months",
        importance: 'Important' as const
      },
      {
        task: "Join pharmaceutical associations",
        deadline: "2 weeks",
        importance: 'Nice to have' as const
      }
    ];
  }
}