'use client'
import { useState } from 'react';
import Sidebar from '@/components/SideBar';
import TopBar from '@/components/TopBar';
import Tabs from '@/components/Tabs';
import MetadataTab from '@/components/MetadataTab';
import OrganisationTab from '@/components/OrganisationTab';
import ScoringTab from '@/components/ScoringTab';
import PublishingTab from '@/components/PublishingTab';
import styles from '@/styles/createQuiz.module.css';

export default function CreateQuiz() {
  const [activeTab, setActiveTab] = useState('metadata');
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'metadata':
        return <MetadataTab />;
      case 'organisation':
        return <OrganisationTab />;
      case 'scoring':
        return <ScoringTab />;
      case 'publishing':
        return <PublishingTab />;
      default:
        return <MetadataTab />;
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <TopBar username="User123" />
        <div className='mb-8'>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        {renderTabContent()}
      </main>
    </div>
  );
}
