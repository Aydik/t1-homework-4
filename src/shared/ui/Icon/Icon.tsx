import type { FC } from 'react';

interface Props {
  name: string;
  size?: { width: number; height: number };
  className?: string;
}

/**
 * Компонент Icon отображает SVG-иконку из спрайта по имени.
 * Позволяет задать размер и дополнительные стили.
 *
 * @param {Props} props - Свойства компонента
 * @returns JSX элемент с SVG иконкой
 */
export const Icon: FC<Props> = ({
  name,
  size = { width: 24, height: 24 },
  className = '',
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: size.width,
        height: size.height,
      }}
      className={className}
    >
      <use xlinkHref={`${import.meta.env.BASE_URL}assets/images/vector/sprites.svg#${name}`} />
    </svg>
  );
};
