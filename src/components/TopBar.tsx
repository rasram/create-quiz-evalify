import styles from '@/styles/createQuiz.module.css';

interface TopBarProps {
  username: string;
}

export default function TopBar({ username }: TopBarProps) {
  return (
    <div className={styles.topBar}>
      <h2>Create Quiz</h2>
      <div>{username}</div>
    </div>
  );
}
