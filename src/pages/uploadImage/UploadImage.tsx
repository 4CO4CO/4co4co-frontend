import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import * as styles from './UploadImage.css';

const UploadImage = () => {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<File>();
  const [name, setName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [lanternId, setLanternId] = useState('');

  const navigator = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return; // file 없으면 early return
    setImage(file[0]);
  };

  const handleSubmitImage = async () => {
    const URL = import.meta.env.VITE_API_BASE_URL + '/lanterns';
    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }
    try {
      const response = await fetch(URL, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      alert(result.data.lantern_id);
      if (result.data.lantern_id) {
        setStep(2);
        setLanternId(result.data.lantern_id);
      }
    } catch (error) {
      console.error(error);
      alert('다시 시도해주세요');
    }
  };

  const handleSubmitPrompt = async () => {
    const URL = import.meta.env.VITE_API_BASE_URL + `/lanterns/${lanternId}/music`;
    try {
      const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify({ prompt: prompt }),
      });
      const result = await response.json();
      alert(result.data.file_path);
      navigator('/');
    } catch (error) {
      console.error(error);
      alert('다시 시도해주세요');
    }
  };

  return (
    <>
      {step === 1 && (
        <>
          <div className={styles.image_container}>
            {!image ? (
              <div className={styles.button_container}>
                이미지 업로드하기
                <input
                  className={styles.file_input}
                  type="file"
                  accept=".png, .jpeg, .jpg, .webp, .heic, .heif"
                  multiple
                  onChange={handleImageUpload}
                />
              </div>
            ) : (
              <img className={styles.image} src={URL.createObjectURL(image)} alt="추억 이미지" />
            )}
          </div>
          <input
            className={styles.text_input}
            type="text"
            placeholder="이름을 작성해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" onClick={handleSubmitImage}>
            제출하기
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <input
            className={styles.text_input}
            type="text"
            placeholder="이미지에 대해 설명해주세요"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button type="submit" onClick={handleSubmitPrompt}>
            제출하기
          </button>
        </>
      )}
    </>
  );
};

export default UploadImage;
