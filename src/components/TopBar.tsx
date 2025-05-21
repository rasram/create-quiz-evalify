import styles from '@/styles/createQuiz.module.css';

interface TopBarProps {
  username: string;
}

export default function TopBar({ username }: TopBarProps) {
  return (
    <div className={styles.topBar}>
      <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">
  Create Quiz
</h1>
      <div>{username}</div>
    </div>
  );
}
