export enum UserRole {
  Normal = 'Normal',
  Manager = 'Manager',
  Admin = 'Admin',
}

type IRoleLevel = {
  [key in UserRole]: number;
};

export const roleLevel: IRoleLevel = {
  Admin: 0,
  Manager: 1,
  Normal: 2,
};

export enum UserGender {
  Man = 'Man',
  Woman = 'Woman',
  Etc = 'Etc',
  Private = 'Private',
}
