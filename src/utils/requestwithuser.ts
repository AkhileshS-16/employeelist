import { Role } from "./enums/role.enums";
import express from "express";

export interface RequestWithUser extends express.Request {
  name: string;
  email: string;
  role: Role;
}
