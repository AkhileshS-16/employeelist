import {
  IsEmail,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { CreateAddressDto } from "./address.dto";
import { Type } from "class-transformer";
import "reflect-metadata";
import { Role } from "../utils/enums/role.enums";

export class CreateEmployeeDto {
  @IsNotEmpty()
  ename: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  Role: Role;

  @IsNumber()
  @IsOptional()
  department_id?: number;
}
