import type { FC } from 'react';
import styles from './index.module.scss';
import { Outlet } from 'react-router-dom';
import { NavBar } from 'widgets/NavBar';
import { Header } from 'widgets/Header';

export const MainLayout: FC = () => {
  return (
    <div className={styles.mainLayout}>
      <NavBar />
      <div className={styles.content}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.outletWrapper}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
