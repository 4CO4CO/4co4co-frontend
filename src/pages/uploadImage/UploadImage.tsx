import React, { useState } from 'react';
import * as styles from './UploadImage.css';
import { post } from '@/apis';

const UploadImage = () => {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<File>();
  const [name, setName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [lanternId, setLanternId] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return; // file 없으면 early return
    setImage(file[0]);
  };

  const handleSubmitImage = async () => {
    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await post<{
        status: string;
        message: string;
        data: {
          lantern_id: string;
        };
      }>('/lanterns', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.lantern_id) {
        setStep(2);
        setLanternId(response.data.lantern_id);
      }
    } catch (error) {
      console.error(error);
      alert('다시 시도해주세요');
    }
  };

  const handleSubmitPrompt = async () => {
    try {
      const response = await post<{
        data: {
          status: string;
          message: string;
          data: {
            file_path: string;
          };
        };
      }>(
        `/lanterns/${lanternId}/music`,
        { prompt: prompt },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      alert('성공');
      if (response.data.data.file_path) {
        alert(response.data.data.file_path);
      }
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
