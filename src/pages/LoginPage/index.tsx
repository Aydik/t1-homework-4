import type { FC } from 'react';
import styles from './index.module.scss';
import { LoginForm } from 'features/auth';

export const LoginPage: FC = () => {
  return (
    <div className={styles.loginPage}>
      <LoginForm />
    </div>
  );
};
