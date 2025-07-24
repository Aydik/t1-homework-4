import { type FC } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import { Button, InputField } from '@admiral-ds/react-ui';
import { useForm } from 'react-hook-form';
import type { LoginDto } from 'features/auth/types';

export const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>();

  const onSubmit = (data) => {
    console.log('Данные формы:', data);
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
      <Typography type="p" variant="Header/H2" className={styles.title}>
        Войти
      </Typography>
      <div className={styles.fieldsContainer}>
        <div className={styles.inputWrapper}>
          <InputField
            placeholder="admin@inno.tech"
            label="Email"
            {...register('email', {
              required: 'Введите email',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Неверный формат email',
              },
            })}
          />
          {errors.email && (
            <Typography type="p" variant="Additional/XS" className={styles.error}>
              {errors.email.message}
            </Typography>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <InputField
            placeholder="********"
            type="password"
            label="Пароль"
            {...register('password', { required: 'Введите пароль' })}
          />
          {errors.password && (
            <Typography type="p" variant="Additional/XS" className={styles.error}>
              {errors.password.message}
            </Typography>
          )}
        </div>
      </div>
      <Button type="submit" dimension="m" appearance="primary" className={styles.submitButton}>
        Войти
      </Button>
    </form>
  );
};
