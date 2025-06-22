import React from 'react';
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
      <p className={styles.description}>
        {description.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < description.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default ProcessItem;