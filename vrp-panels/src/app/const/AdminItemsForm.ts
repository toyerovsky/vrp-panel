export interface ItemFormInfo {
  itemType: string;
  firstParamLabel?: string;
  secondParamLabel?: string;
  thirdParamLabel?: string;
  fourthParamLabel?: string;
}

export const ITEMS_FORM: ItemFormInfo[] = [
  {
    itemType: 'Jedzenie',
    firstParamLabel: 'Liczba HP do zregenerowania'
  },
  {
    itemType: 'Broń',
    firstParamLabel: 'Skrót broni',
    secondParamLabel: 'Liczba amunicji'
  },
  {
    itemType: 'Magazynek',
    firstParamLabel: 'Skrót broni do jakiej pasuje',
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
    secondParamLabel: 'Mnożnik przyśpieszenia/hamowania',
    thirdParamLabel: 'Moment obrotowy'
  }
];
