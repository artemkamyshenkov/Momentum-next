export function getGreetingDeclination(hours: number) {
  switch (true) {
    case hours >= 6 && hours < 12:
      return 'Доброе утро';
    case hours >= 12 && hours < 18:
      return 'Добрый день';
    case hours >= 18 && hours <= 23:
      return 'Добрый вечер';
    case hours > 23 && hours < 6:
      return 'Доброй ночи';
    default:
      return 'Здравствуйте';
  }
}
