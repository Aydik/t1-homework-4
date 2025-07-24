import type { FC } from 'react';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';

export const UserPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  return <div className={styles.userPage}>UserPage: {id}</div>;
};
