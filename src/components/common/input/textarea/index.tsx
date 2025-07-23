import { InputHTMLAttributes } from 'react';
import * as style from './index.css';

const TextArea = ({ className, ...props }: InputHTMLAttributes<HTMLTextAreaElement>) => {
  const textAreaClasses = className ? `${style.input} ${className}` : style.input;
  return <textarea className={textAreaClasses} {...props} />;
};

export default TextArea;
