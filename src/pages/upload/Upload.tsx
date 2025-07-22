import { ChangeEvent, useState } from 'react';
import Toggle from './components/toggle';
import UploadImage from './components/uploadImage';
import UploadTip from './components/uploadTip';
import * as styles from './Upload.css';
import { CreateLanternRequestBody } from '@/apis/lantern';
import Button from '@/components/button';
import TextField from '@/components/input/textfield';
import Spacing from '@/components/spacing';
import { usePostLantern } from '@/queries/lantern/postLantern';

const Upload = () => {
  const [isOn, setIsOn] = useState(false);
  const [name, setName] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const { mutate, isPending } = usePostLantern();

  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImagesChange = (uploadedFiles: File[]) => {
    setImages(uploadedFiles);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    if (images.length === 0) {
      alert('사진을 최소 1장 이상 업로드해주세요.');
      return;
    }

    const requestBody: CreateLanternRequestBody = {
      name: name,
      images: images,
      is_public: isOn,
    };

    mutate(requestBody);
  };

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
      <UploadImage onImagesChange={handleImagesChange} uploadedImages={images} />
      <Spacing size={1.8} />
      <UploadTip className={styles.mobileOnly} />
      <Spacing size={2.5} />
      <label className={styles.label}>이름</label>
      <TextField onChange={handleNameChange} placeholder="풍등에 적을 이름을 작성해주세요." />
      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', margin: '2.5rem 0' }}>
        <span className={styles.inline_label}>해당 사진의 전시를 공개하시나요?</span>
        <Toggle isOn={isOn} onToggle={handleToggle} />
      </div>
      <div className={styles.button_wrapper}>
        <Button className={styles.mobileOnly} variant="secondary" style={{ width: '9.4rem' }}>
          취소
        </Button>
        <Button onClick={handleSubmit} disabled={isPending}>
          전시하기
        </Button>
      </div>
    </div>
  );
};

export default Upload;
