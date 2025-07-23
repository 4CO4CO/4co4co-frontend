interface SpacingProps {
  size: number;
}

const Spacing = ({ size }: SpacingProps) => {
  return <div style={{ marginBottom: `${size}rem` }} />;
};

export default Spacing;
