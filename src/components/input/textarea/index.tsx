import React, { InputHTMLAttributes } from 'react';
import * as style from './index.css';

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  placeholder: string;
}

const TextArea = ({ onChange, value, maxLength, placeholder }: TextAreaProps) => {
  return (
    <textarea
      value={value}
      className={style.input}
      onChange={onChange}
      maxLength={maxLength}
      placeholder={placeholder}
    />
  );
};

export default TextArea;
