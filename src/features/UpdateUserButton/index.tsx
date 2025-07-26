import { type FC } from 'react';
import styles from './index.module.scss';
import { Icon } from 'shared/ui/Icon/Icon.tsx';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: string;
}

export const UpdateUserButton: FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  return (
    <>
      <button className={styles.button} onClick={() => navigate(`user/${id}`)}>
        <Icon name="edit" />
      </button>
    </>
  );
};
