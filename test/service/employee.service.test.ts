// import { getRepository } from "typeorm";
// import EmployeeRepository from "../../src/repository/employee.repository";
// import Employee from "../../src/entity/employee.entity";
// import EmployeeService from "../../src/service/employee.service";
// import DepartmentService from "../../src/service/department.service";
// import DepartmentRepository from "../../src/repository/department.repository";
// import Department from "../../src/entity/department.enitity";
// import Address from "../../src/entity/address.entity";
// import { Role } from "../../src/utils/enums/role.enums";

// describe("Employee Service", () => {
//   let employeeRepository: EmployeeRepository;
//   let employeeService: EmployeeService;
//   let departmentService: DepartmentService;

//   beforeAll(() => {
//     const dataSource = {
//       getRepository: jest.fn(),
//     };
//     employeeRepository = new EmployeeRepository(
//       dataSource.getRepository(Employee)
//     ) as jest.Mocked<EmployeeRepository>;
//     departmentService = new DepartmentService(
//       new DepartmentRepository(dataSource.getRepository(Department))
//     );
//     employeeService = new EmployeeService(
//       employeeRepository,
//       departmentService
//     );
//   });

//   it("should return All Employees", async () => {
//     const mock = jest.fn(employeeRepository.find).mockResolvedValue([]);
//     employeeRepository.find = mock;
//     const users = await employeeService.GetAllEmployees();

//     expect(users).toEqual([]);
//     expect(mock).toHaveBeenCalledTimes(1);
//   });

//   it("Should Get Employee with ID", async () => {
//     const mock = jest
//       .fn(employeeRepository.findoneby)
//       .mockResolvedValue({ id: 1, name: "sample" } as Employee);
//     employeeRepository.findoneby = mock;
//     const users = await employeeService.GetEmployeeById(1);

//     expect(users.name).toEqual("sample");
//     expect(mock).toHaveBeenCalledTimes(1);
//   });

//   it("should update an employee", async () => {
//     let mockAddress = new Address();
//     mockAddress.line1 = "Kollam";
//     mockAddress.pincode = "123324";
//     let mockDepartment1 = new Department();
//     mockDepartment1.id = 1;
//     mockDepartment1.name = "Devops";
//     let mockDepartment2 = new Department();
//     mockDepartment2.id = 2;
//     mockDepartment2.name = "Operations";
//     const mockEmployee1: Partial<Employee> = {
//       id: 1,
//       name: "Alice",
//       age: 22,
//       role: Role.HR,
//       address: mockAddress,
//       department: mockDepartment1,
//     };
//     // const mockEmployee2: Partial<Employee> = {
//     //   id: 1,
//     //   name: "Bob",
//     //   email: "bob@gmail.com",
//     //   age: 32,
//     //   role: Role.UI,
//     //   address: mockAddress,
//     //   department: mockDepartment2,
//     // };
//     const mockfn = jest
//       .fn(employeeRepository.save)
//       .mockResolvedValue(mockEmployee1);
//     const user1 = await employeeService.UpdateEmployee(
//       1,
//       "alice@gmail.com",
//       "Alica",
//       22,
//       mockAddress,
//       1
//     );
//     expect(user1.name).toEqual("Alica");
//   });
// });
