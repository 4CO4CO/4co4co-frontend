import { InputHTMLAttributes } from 'react';
import * as style from './index.css';

const TextField = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  const inputClasses = className ? `${style.input} ${className}` : style.input;

  return <input type="text" className={inputClasses} {...props} />;
};

export default TextField;
