export interface GroupRights {
  groupType: string;
  rights: GroupRight[];
}

export interface GroupRight {
  label: string;
  field: string;
  value: number;
}

export const GROUP_RIGHTS: GroupRights[] = [
  {
    groupType: 'Taxi',
    rights: []
  },
  {
    groupType: 'Bar',
    rights: []
  },
  {
    groupType: 'Klub',
    rights: []
  },
  {
    groupType: 'Organizacja przestępcza',
    rights: []
  },
  {
    groupType: 'Warsztat',
    rights: []
  },
  {
    groupType: 'Policja',
    rights: []
  },
  {
    groupType: 'Szpital',
    rights: []
  },
  {
    groupType: 'Wiadomości',
    rights: []
  }
];
