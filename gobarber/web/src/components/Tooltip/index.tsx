import React from 'react';

import { Container } from './styles';

const Tooltip: React.FC<{ title: string; className?: string }> = ({
  className,
  title,
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
