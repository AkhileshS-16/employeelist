import { getRepository } from "typeorm";
import EmployeeRepository from "../../src/repository/employee.repository";
import Employee from "../../src/entity/employee.entity";
import EmployeeService from "../../src/service/employee.service";

describe("Employee Service", () => {
  let employeeRepository: EmployeeRepository;
  let employeeService: EmployeeService;

  beforeAll(() => {
    const dataSource = {
      getRepository: jest.fn(),
    };
    employeeRepository = new EmployeeRepository(
      dataSource.getRepository(Employee)
    ) as jest.Mocked<EmployeeRepository>;
    employeeService = new EmployeeService(employeeRepository);
  });

  it("should return All Employees", async () => {
    const mock = jest.fn(employeeRepository.find).mockResolvedValue([]);
    employeeRepository.find = mock;
    const users = await employeeService.GetAllEmployees();

    expect(users).toEqual([]);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("Should Get Employee with ID", async () => {
    const mock = jest
      .fn(employeeRepository.findoneby)
      .mockResolvedValue({ id: 1, name: "sample" } as Employee);
    employeeRepository.findoneby = mock;
    const users = await employeeService.GetEmployeeById(1);

    expect(users.name).toEqual("sample");
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
