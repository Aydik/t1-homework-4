import { type FC, useState } from 'react';
import { Button, Divider, InputField, SelectField, DateField, Option } from '@admiral-ds/react-ui';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { userSchema } from 'features/UserForm/schemas';
import { employmentOptions } from 'shared/types';
import { formatPhone } from 'shared/utils/phoneFormatter.ts';

interface Props {
  id?: string;
}

type UserFormState = yup.InferType<typeof userSchema>;

export const UserForm: FC<Props> = ({ id }) => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState<UserFormState>({
    id: id ?? '',
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: undefined,
    phoneNumber: '',
    employment: '',
    userAgreement: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserFormState, string>>>({});

  const handleChange = (field: keyof UserFormState, value: unknown) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const validated = await userSchema.validate(formState, { abortEarly: false });
      console.log('Validated data:', validated);

      // Тут можно делать POST или PATCH
      // if (id) {
      //   await fakeAPIRequest('PATCH', `users/${id}`, validated);
      // } else {
      //   await fakeAPIRequest('POST', 'users', validated);
      // }

      navigate('/');
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        const formErrors: Partial<Record<keyof UserFormState, string>> = {};
        err.inner.forEach((e: yup.ValidationError) => {
          if (e.path) formErrors[e.path as keyof UserFormState] = e.message;
        });
        setErrors(formErrors);
      }
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Typography type="h1" variant="Header/H1" className={styles.caption}>
        {id ? 'Редактировать пользователя' : 'Создать пользователя'}
      </Typography>
      <Divider />
      <div className={styles.fields}>
        <div className={styles.fieldsGroup}>
          <InputField
            value={formState.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Введите имя"
            label="Имя"
            status={errors.firstName ? 'error' : undefined}
            extraText={errors.firstName}
            required
          />
          <InputField
            value={formState.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Введите фамилию"
            label="Фамилия"
            status={errors.lastName ? 'error' : undefined}
            extraText={errors.lastName}
            required
          />
        </div>
        <InputField
          value={formState.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="Введите полное имя"
          label="Полное имя"
          status={errors.fullName ? 'error' : undefined}
          extraText={errors.fullName}
          required
        />
        <InputField
          value={formState.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Введите email"
          label="Email"
          status={errors.email ? 'error' : undefined}
          extraText={errors.email}
          required
        />
        <div className={styles.fieldsGroup}>
          <InputField
            value={formState.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Введите пароль"
            label="Пароль"
            type="password"
            status={errors.password ? 'error' : undefined}
            extraText={errors.password}
            required
          />
          <InputField
            value={formState.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            placeholder="Повторите пароль"
            label="Подтверждение пароля"
            type="password"
            status={errors.confirmPassword ? 'error' : undefined}
            extraText={errors.confirmPassword}
            required
          />
        </div>
        <div className={styles.fieldsGroup}>
          <InputField
            value={formState.phoneNumber ?? ''}
            onChange={(e) => handleChange('phoneNumber', formatPhone(e.target.value))}
            placeholder="+7 (999) 999 99 99"
            label="Телефон"
            status={errors.phoneNumber ? 'error' : undefined}
            extraText={errors.phoneNumber}
          />
          <DateField
            value={formState.birthDate?.toString() ?? ''}
            onChange={(e) => handleChange('birthDate', e.target.value)}
            placeholder="YYYY-MM-DD"
            label="Дата рождения"
            status={errors.birthDate ? 'error' : undefined}
            extraText={errors.birthDate}
          />
        </div>
        <SelectField
          label="Занятость"
          mode="searchSelect"
          value={formState.employment ?? ''}
          onChange={(e) => handleChange('employment', e.target.value)}
        >
          {employmentOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </SelectField>
      </div>
      <div className={styles.buttons}>
        <Button type="submit" dimension="s" appearance="primary">
          Сохранить
        </Button>
        <Button type="button" dimension="s" appearance="secondary" onClick={() => navigate('/')}>
          Отменить
        </Button>
      </div>
    </form>
  );
};
