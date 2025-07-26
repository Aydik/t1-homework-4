import { type FC, useLayoutEffect } from 'react';
import styles from './index.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { NavBar } from 'widgets/NavBar';
import { Header } from 'widgets/Header';
import { getProfile } from 'features/auth/services/auth.service.ts';

/**
 * Компонент `MainLayout` — это главный макет приложения.
 *
 * При монтировании проверяет профиль пользователя (авторизацию).
 * Если профиль не получен (пользователь не авторизован), перенаправляет на страницу логина.
 *
 * Вёрстка включает боковую навигационную панель (`NavBar`),
 * верхний хедер (`Header`) и область для отображения вложенных маршрутов (`Outlet`).
 */
export const MainLayout: FC = () => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    getProfile().catch(() => navigate('/login'));
  }, [navigate]);
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
