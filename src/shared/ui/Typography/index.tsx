import type { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { typography } from '@admiral-ds/react-ui';

interface Props {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  variant: keyof typeof typography;
  className?: string;
  children: ReactNode;
}

const StyledTypography = styled.div<{ $variant: keyof typeof typography }>`
  ${({ $variant }) => typography[$variant]}
`;

/**
 * Компонент Typography для отображения текста с заданным HTML-тегом и стилем.
 * Использует styled-components для применения типографических стилей из '@admiral-ds/react-ui'.
 *
 * @param {Props} props - Свойства компонента
 * @returns JSX элемент с текстом и нужным стилем
 */
export const Typography: FC<Props> = ({
  type: Component = 'span',
  variant,
  className,
  children,
}: Props) => {
  return (
    <StyledTypography as={Component} $variant={variant} className={className}>
      {children}
    </StyledTypography>
  );
};
