import { Role } from "./enums/role.enums";

export type jwtPayload = {
  name: string;
  email: string;
  role: Role;
};
