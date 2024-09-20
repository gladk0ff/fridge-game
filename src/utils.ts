export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}


export function getRandomNumber(minValue:number, maxValue: number) {
  if (minValue > maxValue) {
      // Перестановка minValue и maxValue, если minValue больше maxValue
      let temp = minValue;
      minValue = maxValue;
      maxValue = temp;
  }
  
  // Генерация случайного числа между minValue и maxValue
  const range = maxValue - minValue + 1; // Разница между maxValue и minValue плюс 1
  const randomNumber = Math.floor(Math.random() * range) + minValue;
  return randomNumber;
}