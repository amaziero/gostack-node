interface ICreateUserDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
  driver_license: string;
  isAdmin?: boolean;
  avatar?: string;
  created_at?: string | Date;
}

export { ICreateUserDTO };
