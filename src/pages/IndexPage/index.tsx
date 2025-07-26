import type { FC } from 'react';
import styles from './index.module.scss';
import { UsersList } from 'widgets/UsersList';

export const IndexPage: FC = () => {
  return (
    <div className={styles.indexPage}>
      <UsersList />
    </div>
  );
};
