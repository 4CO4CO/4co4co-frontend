import * as styles from './Intro.css';
import BeamBack from '@/assets/BeamBack.svg?react';
import BeamFront from '@/assets/BeamFront.svg?react';
import Cube from '@/assets/Cube.svg?react';

const Intro = () => {
  return (
    <div className={styles.container}>
      <BeamBack className={styles.beamBack} role="img" aria-label="Beam Back" />
      <Cube className={styles.cube} role="img" aria-label="Cube" />
      <BeamFront className={styles.beamFront} role="img" aria-label="Beam Front" />

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
