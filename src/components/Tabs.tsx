import styles from '@/styles/createQuiz.module.css';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

interface Tab {
  id: string;
  label: string;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const tabs: Tab[] = [
    { id: 'metadata', label: 'Quiz Metadata' },
    { id: 'organisation', label: 'Quiz Organisation' }
  ];
  
  return (
    <div className={styles.tabs}>
      {tabs.map(tab => (
        <div 
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}
