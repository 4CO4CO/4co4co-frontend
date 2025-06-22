import * as styles from './Intro.css';
import BeamBack from '@/assets/BeamBack.svg';
import BeamFront from '@/assets/BeamFront.svg';
import Cube from '@/assets/Cube.svg';

const Intro = () => {
  return (
    <div className={styles.container}>
      <img src={BeamBack} alt="Beam Back" className={styles.beamBack} />
      <img src={Cube} alt="Cube" className={styles.cube} />
      <img src={BeamFront} alt="Beam Front" className={styles.beamFront} />

      <div className={styles.textWrapper}>
        <p className={styles.subTitle}>사진 한 장, 떠오르는 추억 한 편</p>
        <h1 className={styles.mainTitle}>
          Dimension<br />of<br />Memory
        </h1>
      </div>
    </div>
  );
};

export default Intro;
