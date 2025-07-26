export type EmploymentType = '' | 'full-time' | 'part-time' | 'freelance';

export const employmentOptions: { value: EmploymentType; label: string }[] = [
  { value: '', label: 'Не выбрано' },
  { value: 'full-time', label: 'Полная' },
  { value: 'part-time', label: 'Частичная' },
  { value: 'freelance', label: 'Фриланс' },
];
