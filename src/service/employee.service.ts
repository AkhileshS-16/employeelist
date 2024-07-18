import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exceptions";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/enums/role.enums";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { jwtPayload } from "../utils/jwtPayload";
import { JWT_SECRET, JWT_validity } from "../utils/constants";
import DepartmentService from "./department.service";
import DepartmentRepository from "../repository/department.repository";
import dataSource from "../db/data-source.db";
import Department from "../entity/department.enitity";

class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private departmentService: DepartmentService
  ) {}

  GetAllEmployees = async () => {
    return this.employeeRepository.find();
  };

  GetEmployeeById = async (id: number) => {
    return this.employeeRepository.findoneby({ id: id });
  };

  CreateEmployee = async (
    name: string,
    email: string,
    status: string,
    address: any,
    password: string,
    role: Role,
    department_id: number
  ) => {
    const newEmployee = new Employee();
    newEmployee.ename = name;
    newEmployee.email = email;
    newEmployee.status = status;
    // const add_department = await this.departmentService.GetDepartmentById(
    //   department_id
    // );
    // if (!add_department) throw new HttpException(404, "Department Not Found");
    // newEmployee.department = add_department;

    const newaddress = new Address();
    newaddress.line1 = address.line1;
    newaddress.pincode = address.pincode;
    newEmployee.address = newaddress;
    newEmployee.password = password ? await bcrypt.hash(password, 10) : "";
    newEmployee.Role = role;

    return this.employeeRepository.save(newEmployee);
  };

  UpdateEmployee = async (
    id: number,
    ename: string,
    email: string,
    status: string,
    Role: Role,
    address: any,
    department_id: number
  ): Promise<Employee | null> => {
    const employee = await this.employeeRepository.findoneby({ id });
    // const add_department = await this.departmentService.GetDepartmentById(
    //   department_id
    // );
    if (!employee) throw new HttpException(404, "Employee Not Found");
    // if (!add_department) throw new HttpException(404, "Employee Not Found");
    employee.ename = ename;
    employee.email = email;
    employee.status = status;
    employee.Role = Role;
    employee.address.line1 = address.line1;
    employee.address.pincode = address.pincode;
    //employee.department = add_department;
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
      name: employee.ename,
      email: employee.email,
      role: employee.Role,
    };

    const token = jsonwebtoken.sign(payload, JWT_SECRET, {
      expiresIn: JWT_validity,
    });

    return { token };
  };
}
export default EmployeeService;
