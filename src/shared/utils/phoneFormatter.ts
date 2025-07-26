export const formatPhone = (value: string) => {
  let cleanedValue = value.replace(/[^0-9]/g, '');
  if (!cleanedValue) return '';

  if (cleanedValue === '8' || cleanedValue === '7') {
    return '+7';
  }

  // Если нет 7 в начале, добавляем
  if (!cleanedValue.startsWith('7')) {
    cleanedValue = '7' + cleanedValue;
  }

  // Формируем части номера
  const part1 = cleanedValue.substring(1, 4);
  const part2 = cleanedValue.substring(4, 7);
  const part3 = cleanedValue.substring(7, 9);
  const part4 = cleanedValue.substring(9, 11);

  // Формируем строку по длине
  if (cleanedValue.length < 1) {
    return '';
  }
  if (cleanedValue.length === 1) {
    return '+7 ';
  }

  if (cleanedValue.length <= 4) {
    return `+7 (${part1}`;
  }

  if (cleanedValue.length <= 7) {
    return `+7 (${part1}) ${part2}`;
  }

  if (cleanedValue.length <= 9) {
    return `+7 (${part1}) ${part2} ${part3}`;
  }

  return `+7 (${part1}) ${part2} ${part3} ${part4}`;
};

export const formatPhoneBeforeRequest = (value: string) => {
  return value.replace(/[^0-9]/g, '');
};
