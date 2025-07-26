import type { FC } from 'react';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';
import { UserForm } from 'features/UserForm';

export const UserPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className={styles.userPage}>
      <UserForm id={id === 'create' ? undefined : id} />
    </div>
  );
};
