import * as yup from 'yup';

export const userSchema = yup.object({
  name: yup.string().max(64, 'Максимальная длина — 64 символа').required('Имя обязательно'),

  surName: yup.string().max(64, 'Максимальная длина — 64 символа').required('Фамилия обязательна'),

  fullName: yup
    .string()
    .max(130, 'Максимальная длина — 130 символов')
    .required('Полное имя обязательно'),

  email: yup
    .string()
    .email('Неверный формат email')
    .matches(/^[^\s@]+@[^\s@]+\.[A-Za-z]+$/, 'Неверный формат email')
    .required('Email обязателен'),

  password: yup.string().required('Пароль обязателен'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Подтверждение пароля обязательно'),

  birthDate: yup.date().typeError('Неверный формат даты').optional(),

  telephone: yup
    .string()
    .test(
      'is-valid-phone',
      'Неверный формат телефона. Пример: +7 (999) 123 45 67',
      (value) => !value || /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/.test(value),
    )
    .optional(),

  employment: yup.string().optional(),

  userAgreement: yup.boolean().optional(),
});
