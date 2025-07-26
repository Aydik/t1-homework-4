import { type FC } from 'react';
import styles from './index.module.scss';
import { Icon } from 'shared/ui/Icon/Icon.tsx';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: string;
}

/**
 * Кнопка для перехода на страницу редактирования пользователя.
 *
 * При клике выполняется навигация к маршруту редактирования пользователя по его ID.
 *
 * @param {string} id - ID пользователя, для которого открывается страница редактирования.
 */
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
