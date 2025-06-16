import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Main.css';
import Logo from '@/public/assets/logo.svg?react';
import Ticket from '@/public/assets/ticket.svg?react';

const Main = () => {
  const navigate = useNavigate();
  const navigateWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigateWrapperRef.current) {
        const top = navigateWrapperRef.current.offsetTop;
        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={S.mainWrapper}>
      <div className={S.logoWrapper}>
        <Logo />
      </div>
      <section className={S.navigateWrapper} ref={navigateWrapperRef}>
        <h1 className={S.titleStyle}>
          나만의 전시회,
          <br /> 기억의 차원에서
          <br /> 추억여행을 떠나보세요!
        </h1>
        <Ticket />
        <button className={S.buttonStyle} onClick={() => navigate('/upload')}>
          지금 바로 나만의 전시 만들기
        </button>
      </section>
    </div>
  );
};

export default Main;
