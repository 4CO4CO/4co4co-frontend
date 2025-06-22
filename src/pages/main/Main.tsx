import Intro from './components/Intro/Intro';
import * as styles from './Main.css';

const Main = () => {
  return (
    <div className={styles.mainContainer}>
      <Intro />
    </div>
  );
};

export default Main;