import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exceptions";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/enums/role.enums";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { jwtPayload } from "../utils/jwtPayload";
import { JWT_SECRET, JWT_validity } from "../utils/constants";

class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  GetAllEmployees = async () => {
    return this.employeeRepository.find();
  };

  GetEmployeeById = async (id: number) => {
    return this.employeeRepository.findoneby({ id: id });
  };

  CreateEmployee = async (
    name: string,
    email: string,
    age: number,
    address: any,
    password: string,
    role: Role
  ) => {
    const newEmployee = new Employee();
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.age = age;

    const newaddress = new Address();
    newaddress.line1 = address.line1;
    newaddress.pincode = address.pincode;
    newEmployee.address = newaddress;
    newEmployee.password = password ? await bcrypt.hash(password, 10) : "";
    newEmployee.role = role;

    return this.employeeRepository.save(newEmployee);
  };

  UpdateEmployee = async (
    id: number,
    name: string,
    email: string,
    age: number,
    address: any
  ): Promise<Employee | null> => {
    const employee = await this.employeeRepository.findoneby({ id });
    if (!employee) return null;
    employee.name = name;
    employee.email = email;
    employee.age = age;
    employee.address.line1 = address.line1;
    employee.address.pincode = address.pincode;
    return this.employeeRepository.save(employee);
  };

  DeleteEmployee = async (id: number) => {
    const employee = await this.employeeRepository.findoneby({ id });
    return this.employeeRepository.softremove(employee);
  };

  loginEmployee = async (email: string, password: string) => {
    const employee = await this.employeeRepository.findoneby({ email });
    if (!employee) {
      throw new HttpException(404, "Employee Not Found");
    }

    const result = await bcrypt.compare(password, employee.password);

    if (!result) {
      throw new HttpException(401, "Invalid Credentials");
    }

    const payload: jwtPayload = {
      name: employee.name,
      email: employee.email,
      role: employee.role,
    };

    const token = jsonwebtoken.sign(payload, JWT_SECRET, {
      expiresIn: JWT_validity,
    });

    return { token };
  };
}
export default EmployeeService;
