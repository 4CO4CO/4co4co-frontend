import * as styles from './ProcessItem.css';

interface ProcessItemProps {
  icon: string;
  title: string;
  description: string;
}

const ProcessItem = ({ icon, title, description }: ProcessItemProps) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.iconWrapper}>
        <img src={icon} alt={title} className={styles.icon} />
      </div>
      <pre className={styles.description}>{description}</pre>
    </div>
  );
};

export default ProcessItem;