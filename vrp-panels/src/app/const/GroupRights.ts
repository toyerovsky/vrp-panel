export interface GroupRights {
  groupType: string;
  rights: GroupRight[];
}

export interface GroupRight {
  label: string;
  field: string;
}

export const GROUP_RIGHTS: GroupRights[] = [
];