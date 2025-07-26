import { type FC } from 'react';
import styles from './index.module.scss';
import { Icon } from 'shared/ui/Icon/Icon.tsx';
import { deleteUser } from 'entities/User/services/user.service.ts';

interface Props {
  id: string;
  updateUsers: () => void;
}

export const DeleteUserButton: FC<Props> = ({ id, updateUsers }) => {
  const handleDeleteUser = () => {
    deleteUser(id).then(() => updateUsers());
  };

  return (
    <>
      <button className={styles.button} onClick={handleDeleteUser}>
        <Icon name="delete" />
      </button>
    </>
  );
};
