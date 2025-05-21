'use client'
import TopBar from '@/components/TopBar';
import MetadataTab from '@/components/MetadataTab';
import ScoringTab from '@/components/ScoringTab';
import PublishingTab from '@/components/PublishingTab';
import styles from '@/styles/createQuiz.module.css';
import Footer from '@/components/Footer';

export default function CreateQuiz() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <TopBar username="John Doe" />
        <div className="max-w-7xl mx-auto p-4 pb-24">
          <MetadataTab />
          <ScoringTab />
          <PublishingTab />
          <Footer />
        </div>
      </main>
    </div>
  );
}
