import { useNavigate } from 'react-router-dom';
import * as styles from './Ticket.css';
import TicketIcon from '@/assets/TicketIcon.svg?react';
import Button from '@/components/common/button';

const Ticket = () => {
  const navigate = useNavigate();

  const handleStartExhibition = () => {
    navigate('/upload');
  };

  const handleEntryExhibition = () => {
    navigate('/entry');
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>
          나만의 전시회,<br />
          기억의 차원에서<br />
          추억여행을 떠나보세요!
        </h2>

        <div className={styles.ticketWrapper}>
          <TicketIcon className={styles.ticketIcon} role="img" aria-label="Ticket" />
        </div>

        <div className={styles.buttonContainer}>
          <Button
            variant="primary"
            size="lg"
            className={styles.startButtonCustom}
            onClick={handleStartExhibition}
          >
            지금 바로 나만의 전시 만들기
          </Button>
        </div>

        <div className={styles.option}>
          <span className={styles.optionText}>이미 전시를 만들었다면? </span>
          <button className={styles.linkButton} onClick={handleEntryExhibition}>전시회 입장하기</button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;