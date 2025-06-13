
import React, { useState } from 'react';
import DashboardHeader from '@/components/recruiter/DashboardHeader';
import TabNavigation from '@/components/recruiter/TabNavigation';
import OverviewTab from '@/components/recruiter/OverviewTab';
import ProgressTab from '@/components/recruiter/ProgressTab';
import JobsTab from '@/components/recruiter/JobsTab';
import ApplicationsTab from '@/components/recruiter/ApplicationsTab';
import PostJobTab from '@/components/recruiter/PostJobTab';

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const handlePostJobClick = () => {
    setActiveTab('post-job');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-navy-600 to-autumn-500 rounded-2xl p-8 text-white animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">
              Welcome to the ZaneProEd Talent Portal
            </h1>
            <p className="text-xl opacity-90">Hire Smart, Hire Right.</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content based on active tab */}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'progress' && <ProgressTab />}
        {activeTab === 'jobs' && <JobsTab onPostJobClick={handlePostJobClick} />}
        {activeTab === 'applications' && <ApplicationsTab />}
        {activeTab === 'post-job' && <PostJobTab />}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
