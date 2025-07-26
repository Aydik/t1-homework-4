import * as yup from 'yup';

export const userSchema = yup.object({
  id: yup.string().required(),

  firstName: yup.string().max(64, 'Максимальная длина — 64 символа').required('Имя обязательно'),

  lastName: yup.string().max(64, 'Максимальная длина — 64 символа').required('Фамилия обязательна'),

  fullName: yup
    .string()
    .max(130, 'Максимальная длина — 130 символов')
    .required('Полное имя обязательно'),

  email: yup.string().email('Неверный формат email').required('Поле обязательно'),

  password: yup.string().required('Пароль обязателен'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Подтверждение пароля обязательно'),

  birthDate: yup.date().typeError('Неверный формат даты').optional(),

  phoneNumber: yup
    .string()
    .matches(/^\+7\d{10}$/, 'Неверный формат телефона. Пример: +79991231231')
    .optional(),

  employment: yup.string().optional(),

  userAgreement: yup
    .boolean()
    .oneOf([true], 'Необходимо согласие с пользовательским соглашением')
    .optional(),
});
