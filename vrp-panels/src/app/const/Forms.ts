import { WEAPONS } from './Names';

export const ADMIN_ITEMS_FORM = [
  {
    itemType: 'Jedzenie',
    firstParamLabel: 'Liczba HP do zregenerowania',
  },
  {
    itemType: 'Broń',
    firstParamLabel: 'Typ broni',
    firstParamValues: WEAPONS,
    secondParamLabel: 'Liczba amunicji'
  },
  {
    itemType: 'Magazynek',
    firstParamLabel: 'Typ broni',
    firstParamValues: WEAPONS,
    secondParamLabel: 'Liczba amunicji jaką dodaje'
  },
  {
    itemType: 'Maska',
    firstParamLabel: 'Liczba użyć'
  },
  { itemType: 'Narkotyk' },
  {
    itemType: 'Kość do gry',
    firstParamLabel: 'Liczba oczek'
  },
  { itemType: 'Zegarek' },
  { itemType: 'Ubranie' },
  { itemType: 'Krótkofalówka' },
  { itemType: 'Alkohol' },
  { itemType: 'Ubranie' },
  {
    itemType: 'Telefon komórkowy',
    firstParamLabel: 'Liczba kontaktów',
    secondParamLabel: 'Liczba wiadomości',
    thirdParamLabel: 'Numer',
    fourthParamLabel: 'Skórka'
  },
  {
    itemType: 'Tuning pojazdu',
    firstParamLabel: 'Typ tuningu',
    firstParamValues: [
      { value: 0, viewValue: 'Prędkość' },
      { value: 1, viewValue: 'Hamowanie' }
    ],
    secondParamLabel: 'Mnożnik przyśpieszenia/hamowania',
    thirdParamLabel: 'Moment obrotowy'
  }
];
