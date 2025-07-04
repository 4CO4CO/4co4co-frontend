import Chip from '@/components/chip';

interface UploadTipProps {
  className?: string;
}

const UploadTip = ({ className }: UploadTipProps) => {
  return (
    <div className={className}>
      <Chip />
    </div>
  );
};

export default UploadTip;
