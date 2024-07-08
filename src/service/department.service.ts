import dataSource from "../db/data-source.db";
import Department from "../entity/department.enitity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exceptions";
import DepartmentRepository from "../repository/department.repository";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeService from "./employee.service";

class DepartmentService {
  constructor(private departmentRepository: DepartmentRepository) {}

  GetAllDepartments = async () => {
    return this.departmentRepository.find();
  };

  GetDepartmentById = async (id: number) => {
    const department = await this.departmentRepository.findoneby({ id });
    if (!department) throw new HttpException(404, "Department not Found");
    return department;
  };

  CreateDepartment = async (name: string) => {
    const newDepartment = new Department();
    newDepartment.name = name;

    return this.departmentRepository.save(newDepartment);
  };

  DeleteDepartment = async (department) => {
    if (department.employees.length)
      throw new HttpException(401, "Employee Present");
    return this.departmentRepository.softremove(department);
  };

  UpdateDepartment = async (id: number, name: string) => {
    const department = await this.departmentRepository.findoneby({ id });
    if (!department) throw new HttpException(404, "Department Not Found");
    department.name = name;
    return this.departmentRepository.save(department);

    // const employeeRepository = new EmployeeRepository(
    //   dataSource.getRepository(Employee)
    // );
    // let employeeslist: Employee[];
    // for (let i of employees) {
    //   const employee = await employeeRepository.findoneby({ id: i });
    //   if (!employee) throw new HttpException(404, `Employee ${i} not Found`);
    //   employeeslist.push(employee);
    // }
    // const department = new Department();
    // department.id;
    // department.name = name;
    // department.employees = employeeslist;
    // return this.departmentRepository.save(department);
  };
}
export default DepartmentService;
