// typeof date.getMonth === 'function';

export function isValidDate(dateString: string): boolean {
  const potentialDate = new Date(dateString);
  return potentialDate instanceof Date && !isNaN(potentialDate.getTime());
}

export function isValidNumber(numberString: string): boolean {
  const potentialNumber = Number(numberString);
  return potentialNumber !== null && !isNaN(potentialNumber);
}
