import type { FC } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import type { NavLink as NavLinkType } from 'widgets/NavBar/types';
import { Icon } from 'shared/ui/Icon/Icon.tsx';
import { Typography } from 'shared/ui/Typography';

interface Props extends NavLinkType {
  selected?: boolean;
}

export const NavLink: FC<Props> = ({ url, text, icon, selected = false }: Props) => {
  return (
    <Link to={url} className={`${styles.navLink} ${selected ? styles.navLink_selected : ''}`}>
      <Icon name={icon} size={{ width: 24, height: 22 }} className={styles.icon} />
      <Typography type="span" variant="Button/M" className={styles.text}>
        {text}
      </Typography>
    </Link>
  );
};
