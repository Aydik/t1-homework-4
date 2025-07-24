import { type FC, useCallback, useEffect } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import { Button, InputField } from '@admiral-ds/react-ui';
import { useForm } from 'react-hook-form';
import type { LoginDto } from 'features/auth/types';
import { loginUser, getProfile } from 'features/auth/services/auth.service.ts';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const LoginForm: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getProfile().then(() => navigate('/'));
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginDto>();

  const onSubmit = useCallback(
    async (data: LoginDto) => {
      try {
        await loginUser({
          email: data.email,
          password: data.password,
        });
        navigate('/');
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          setError('password', {
            type: 'manual',
            message: 'Неверный email или пароль',
          });
        } else {
          console.error('Ошибка авторизации:', error);
        }
      }
    },
    [navigate, setError],
  );

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
                value: /^\S+@\S+\.[A-Za-z]+$/,
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
