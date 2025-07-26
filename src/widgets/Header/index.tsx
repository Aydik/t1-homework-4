import { type FC } from 'react';
import styles from './index.module.scss';
import { Button } from '@admiral-ds/react-ui';
import { useNavigate } from 'react-router-dom';
import { logout } from 'features/auth/services/auth.service.ts';

/**
 * Компонент `Header` — это верхняя панель с кнопкой выхода из аккаунта.
 *
 * При нажатии кнопки выполняет логаут пользователя и перенаправляет на страницу входа.
 */
export const Header: FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout().then(() => navigate('/login'));
  };
  return (
    <header className={styles.header}>
      <Button dimension="s" appearance="ghost" className={styles.logout} onClick={handleLogout}>
        Выйти
      </Button>
    </header>
  );
};
