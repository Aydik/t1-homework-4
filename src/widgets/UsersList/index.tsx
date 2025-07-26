import styles from './index.module.scss';
import { type FC, useEffect, useState } from 'react';
import { type Column, Table, type TableRow } from '@admiral-ds/react-ui';
import { getUsers } from 'entities/User/services/user.service.ts';
import { type EmploymentType, translateEmployment } from 'shared/types';
import { formatPhone } from 'shared/utils/phoneFormatter.ts';
import { formatDate } from 'shared/utils/dateFormatter.ts';
import { UpdateUserButton } from 'features/UpdateUserButton';
import type { User } from 'entities/User/types';
import { DeleteUserButton } from 'features/DeleteUserButton';

const columns: Column[] = [
  {
    name: 'id',
    title: 'id',
    width: 140,
  },
  {
    name: 'name',
    title: 'Имя',
    width: 100,
  },
  {
    name: 'surName',
    title: 'Фамилия',
    width: 100,
  },
  {
    name: 'email',
    title: 'Email',
    width: 150,
  },
  {
    name: 'birthDate',
    title: 'Дата рождения',
    width: 100,
  },
  {
    name: 'telephone',
    title: 'Номер телефона',
    width: 150,
  },
  {
    name: 'employment',
    title: 'Занятость',
    width: 150,
  },
  {
    name: 'actions',
    title: 'Действия',
    width: 150,
  },
];

export const UsersList: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userRows, setUserRows] = useState<TableRow[]>([]);

  const fetchUsers = () => getUsers().then((users) => setUsers(users));

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setUserRows(
      users.map((user) => ({
        id: user.id,
        name: user.name,
        surName: user.surName,
        email: user.email,
        birthDate: user.birthDate ? formatDate(user.birthDate) : '',
        telephone: user.telephone ? formatPhone(user.telephone) : '',
        employment: user.employment ? translateEmployment(user.employment as EmploymentType) : '',
        actions: (
          <div className={styles.actions}>
            <UpdateUserButton key={user.id} id={user.id} />
            {user.id !== '1' && (
              <DeleteUserButton key={user.id} id={user.id} updateUsers={fetchUsers} />
            )}
          </div>
        ),
      })),
    );
  }, [users]);

  return <Table className={styles.table} columnList={columns} rowList={userRows} />;
};
