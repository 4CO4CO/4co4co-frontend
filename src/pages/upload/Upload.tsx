import UploadImage from './components/uploadImage';
import UploadTip from './components/uploadTip';
import * as styles from './Upload.css';
import Button from '@/components/button';
import TextField from '@/components/input/textfield';
import Spacing from '@/components/spacing';

const Upload = () => {
  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <div>
          <h1 className={styles.title}>{`2025\n당신의\nTOP 3 사진은?`}</h1>
          <Spacing size={2.8} />
          <pre
            className={styles.description}
          >{`2025년은 당신에게 어떤 한 해였나요?\n기억하고 싶은 순간을 알려주세요.\n기억의 차원이 그 순간들을 잊지 않도록\n우리의 전시에 고이 담아둘게요.
      `}</pre>
        </div>
        <UploadTip className={styles.desktopOnly} />
      </section>
      <Spacing size={4} />
      <UploadImage />
      <Spacing size={1.8} />
      <UploadTip className={styles.mobileOnly} />
      <Spacing size={2.5} />
      <label className={styles.label}>이름</label>
      <TextField onChange={() => {}} placeholder="풍등에 적을 이름을 작성해주세요." />
      <label className={styles.label}>상세 설명</label>
      <TextField onChange={() => {}} placeholder="사진에 대해 설명해주세요." />
      <div className={styles.button_wrapper}>
        <Button className={styles.mobileOnly} variant="secondary" style={{ width: '9.4rem' }}>
          취소
        </Button>
        <Button>전시하기</Button>
      </div>
    </div>
  );
};

export default Upload;
