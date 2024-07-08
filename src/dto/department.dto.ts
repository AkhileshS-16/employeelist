import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateEmployeeDto } from "./employee.dto";
import { Type } from "class-transformer";

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
