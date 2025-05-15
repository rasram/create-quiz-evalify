import styles from '@/styles/createQuiz.module.css';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h1>Evalify</h1>
      <a className={styles.active}>+ Create Quiz</a>
      <a>Manage Quizzes</a>
      <a>Settings</a>
    </div>
  );
}
