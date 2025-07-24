import type { FC } from 'react';
import styles from './index.module.scss';
import { PAGES } from 'widgets/NavBar/constants';
import { NavLink } from 'widgets/NavBar/ui/NavLink';
import { useLocation } from 'react-router-dom';

export const NavBar: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isSelected = (path: string) => currentPath === path;
  return (
    <nav className={styles.navBar}>
      <ul className={styles.navList}>
        {PAGES.map((page) => (
          <li key={page.url} className={styles.navList__item}>
            <NavLink
              url={page.url}
              icon={page.icon}
              text={page.text}
              selected={isSelected(page.url)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
