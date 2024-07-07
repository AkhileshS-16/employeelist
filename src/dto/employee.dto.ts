import {
  IsEmail,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { CreateAddressDto } from "./address.dto";
import { Type } from "class-transformer";
import "reflect-metadata";
import { Role } from "../utils/enums/role.enums";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
