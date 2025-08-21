import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toggle from './components/toggle';
import UploadImage from './components/uploadImage';
import UploadTip from './components/uploadTip';
import * as styles from './Upload.css';
// import { CreateLanternRequestBody } from '@/apis/lantern';
import { Alert } from '@/components/common/alert';
import Button from '@/components/common/button';
import TextField from '@/components/common/input/textfield';
import Spacing from '@/components/common/spacing';
import { Toast } from '@/components/common/toast';
// import { usePostLantern } from '@/queries/lantern/postLantern';

const Upload = () => {
  const [isOn, setIsOn] = useState(true);
  const [name, setName] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  // const { mutate, isPending } = usePostLantern();
  const [showCompletionAlert, setShowCompletionAlert] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImagesChange = (uploadedFiles: File[]) => {
    setImages(uploadedFiles);
  };

  const handleShowAlert = () => {
    if (!name.trim()) {
      setToast({ message: '이름을 입력해주세요.', type: 'error' });
      return;
    }
    if (images.length !== 3) {
      setToast({ message: '사진을 3장 업로드해주세요.', type: 'error' });
      return;
    }
    setShowCompletionAlert(true);
  };

  const handleSubmit = () => {
    // const requestBody: CreateLanternRequestBody = {
    //   name: name,
    //   images: images,
    //   is_public: isOn,
    // };
    // mutate(requestBody);

    // 목 데이터 생성
    const newLantern = {
      lantern_id: `${name}-3897`,
      owner_name: name,
      emotion: '',
      is_current_lantern: true,
    };

    setTimeout(() => {
      navigate('/loading', { state: { lantern_id: newLantern.lantern_id } });
    }, 1000);
  };

  return (
    <div className={styles.mainContainer}>
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
          <Button className={styles.mobileOnly} variant="secondary">
            취소
          </Button>
          <Button onClick={handleShowAlert}>전시하기</Button>
        </div>
      </div>
      <Alert
        isOpen={showCompletionAlert}
        title="전시 업로드"
        message={`전시를 업로드하면 수정 및 삭제가 불가능합니다.\n${name}님의 사진을 "${
          isOn ? '공개' : '비공개'
        }" 전시로 업로드하시나요?`}
        confirmText="확인했어요"
        cancelText="취소"
        onConfirm={handleSubmit}
        onCancel={() => setShowCompletionAlert(false)}
        // disabled={isPending}
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Upload;
