import { type FC, useEffect, useState } from 'react';
import {
  Button,
  Divider,
  InputField,
  SelectField,
  DateField,
  Option,
  Checkbox,
} from '@admiral-ds/react-ui';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { employmentOptions } from 'shared/types';
import { formatPhone, formatPhoneBeforeRequest } from 'shared/utils/phoneFormatter.ts';
import { ValidationError } from 'yup';
import { createUser, getUserById, updateUser } from 'entities/User/services/user.service.ts';
import type { UserCreateDto, UserPatchDto } from 'entities/User/types';
import { AxiosError } from 'axios';
import { updateUserSchema, createUserSchema } from 'features/UserForm/schemas';
import { formatDate } from 'shared/utils/dateFormatter.ts';

interface Props {
  id?: string;
}

type UserFormState = yup.InferType<typeof createUserSchema>;

/**
 * Форма создания и редактирования пользователя.
 *
 * Используется как для создания нового пользователя, так и для редактирования существующего.
 * При переданном `id` загружает данные пользователя и заполняет поля формы.
 * Выполняет валидацию через Yup и отображает ошибки.
 *
 * @param {string} [id] - ID пользователя для редактирования. Если не передан, форма работает в режиме создания.
 */
export const UserForm: FC<Props> = ({ id }) => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState<UserFormState>({
    name: '',
    surName: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: undefined,
    telephone: '',
    employment: '',
    userAgreement: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserFormState, string>>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getUserById(id)
        .then((user) => {
          setFormState({
            name: user.name,
            surName: user.surName,
            fullName: user.fullName,
            email: user.email,
            password: '',
            confirmPassword: '',
            birthDate: user.birthDate,
            telephone: user.telephone ? formatPhone(user.telephone) : '',
            employment: user.employment ?? '',
            userAgreement: user.userAgreement ?? false,
          });
        })
        .catch(() => {
          navigate('/');
          alert('Пользователь не найден');
        });
    } else {
      setFormState({
        name: '',
        surName: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDate: undefined,
        telephone: '',
        employment: '',
        userAgreement: false,
      });
    }
  }, [id, navigate]);

  useEffect(() => {
    const fullName = formState.name + ' ' + formState.surName;
    if (fullName.length > 0) handleChange('fullName', fullName);
  }, [formState.surName, formState.name]);

  const handleChange = <K extends keyof UserFormState>(field: K, value: UserFormState[K]) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      setError(null);

      if (id) {
        const validated = await updateUserSchema.validate(formState, { abortEarly: false });
        const prepared: UserPatchDto = {
          name: validated.name.trim(),
          surName: validated.surName.trim(),
          fullName: validated.fullName.trim(),
          birthDate: validated.birthDate,
          telephone: validated.telephone?.trim()
            ? formatPhoneBeforeRequest(validated.telephone)
            : undefined,
          employment: validated.employment,
          userAgreement: validated.userAgreement,
        };
        await updateUser(id, prepared);
      } else {
        const validated = await createUserSchema.validate(formState, { abortEarly: false });
        const prepared: UserCreateDto = {
          name: validated.name.trim(),
          surName: validated.surName.trim(),
          fullName: validated.fullName.trim(),
          email: validated.email.trim(),
          password: validated.password.trim(),
          birthDate: validated.birthDate,
          telephone: validated.telephone?.trim()
            ? formatPhoneBeforeRequest(validated.telephone)
            : undefined,
          employment: validated.employment,
          userAgreement: validated.userAgreement,
        };
        alert(prepared.birthDate);
        await createUser(prepared);
      }

      navigate('/');
    } catch (err) {
      if (err instanceof ValidationError) {
        const formErrors: Partial<Record<keyof UserFormState, string>> = {};
        err.inner.forEach((e) => {
          if (e.path) {
            formErrors[e.path as keyof UserFormState] = e.message;
          }
        });
        setErrors(formErrors);
      } else if (err instanceof AxiosError && err?.response?.status === 409) {
        setErrors((prev) => ({
          ...prev,
          email: 'Пользователь с таким email уже существует',
        }));
      } else {
        setError('Произошла ошибка при сохранении пользователя');
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
            key="firstName"
            value={formState.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Введите имя"
            label="Имя"
            status={errors.name ? 'error' : undefined}
            extraText={errors.name}
            required
          />
          <InputField
            key="lastName"
            value={formState.surName}
            onChange={(e) => handleChange('surName', e.target.value)}
            placeholder="Введите фамилию"
            label="Фамилия"
            status={errors.surName ? 'error' : undefined}
            extraText={errors.surName}
            required
          />
        </div>
        <InputField
          key="fullName"
          value={formState.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="Введите полное имя"
          label="Полное имя (заполянется автоматически)"
          status={errors.fullName ? 'error' : undefined}
          extraText={errors.fullName}
          required
        />
        {!id && (
          <>
            <InputField
              key="email"
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
                key="password"
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
                key="confirmPassword"
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
          </>
        )}
        <div className={styles.fieldsGroup}>
          <InputField
            key="phoneNumber"
            value={formState.telephone ?? undefined}
            onChange={(e) => handleChange('telephone', formatPhone(e.target.value))}
            placeholder="+7 (999) 999 99 99"
            label="Телефон"
            status={errors.telephone ? 'error' : undefined}
            extraText={errors.telephone}
          />
          <DateField
            data-container-id="birthDateField"
            key="birthDate"
            value={formState.birthDate ? formatDate(formState.birthDate) : undefined}
            onChange={(e) => handleChange('birthDate', new Date(e.target.value))}
            placeholder="DD.MM.YYYY"
            label="Дата рождения"
            status={errors.birthDate ? 'error' : undefined}
            extraText={errors.birthDate}
          />
        </div>
        <SelectField
          key="employment"
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
        <div className={styles.checkboxWrapper}>
          <Checkbox
            key="userAgreement"
            checked={formState.userAgreement}
            onChange={(e) => handleChange('userAgreement', e.target.checked)}
          />
          <Typography type="p" variant="Additional/S" className={styles.agreement}>
            Я согласен с условиями пользования и политикой компании
          </Typography>
        </div>
        {error && (
          <Typography type="p" variant="Additional/S" className={styles.error}>
            {error}
          </Typography>
        )}
      </div>
      <div className={styles.buttons}>
        <Button type="button" dimension="s" appearance="secondary" onClick={() => navigate('/')}>
          Отменить
        </Button>
        <Button type="submit" dimension="s" appearance="primary">
          Сохранить
        </Button>
      </div>
      ;
    </form>
  );
};
