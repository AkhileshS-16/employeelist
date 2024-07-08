import { plainToInstance } from "class-transformer";
import HttpException from "../exceptions/http.exceptions";
import EmployeeService from "../service/employee.service";
import express, { NextFunction } from "express";
import { CreateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";
import authorize from "../middleware/authorization.middleware";
import { RequestWithUser } from "../utils/requestwithuser";
import { Role } from "../utils/enums/role.enums";

class EmployeeController {
  public router: express.Router;

  constructor(private employeeService: EmployeeService) {
    this.router = express.Router();

    this.router.get("/", authorize, this.getAllEmployees);
    this.router.get("/:id", authorize, this.getEmployeeById);
    this.router.post("/", authorize, this.createEmployee);
    this.router.delete("/:id", authorize, this.deleteEmployee);
    this.router.put("/:id", authorize, this.updateEmployee);
    this.router.post("/login", this.loginEmployee);
  }

  public getAllEmployees = async (req, res) => {
    const employees = await this.employeeService.GetAllEmployees();
    res.status(200).send(employees);
  };

  public getEmployeeById = async (req, res, next) => {
    try {
      const employeeid = Number(req.params.id);
      const employee = await this.employeeService.GetEmployeeById(employeeid);
      if (!employee) {
        const error = new HttpException(
          404,
          `No Employee found with id: ${employeeid}`
        );
        throw error;
      }
      res.status(200).send(employee);
    } catch (err) {
      next(err);
    }
  };

  public createEmployee = async (
    req: RequestWithUser,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const role = req.role;
      if (role !== Role.HR) {
        throw new HttpException(
          401,
          "You are not authorized to create employee"
        );
      }

      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const savedEmployee = await this.employeeService.CreateEmployee(
        createEmployeeDto.name,
        createEmployeeDto.email,
        createEmployeeDto.age,
        createEmployeeDto.address,
        createEmployeeDto.password,
        createEmployeeDto.role,
        createEmployeeDto.department_id
      );
      // const savedEmployee = await this.employeeService.CreateEmployee(
      //   req.body.name,
      //   req.body.email,
      //   req.body.age,
      //   req.body.address,
      //   req.body.password,
      //   req.body.role
      // );
      res.status(201).send(savedEmployee);
    } catch (error) {
      next(error);
    }
  };

  public deleteEmployee = async (req, res, next) => {
    try {
      const role = req.role;
      if (role !== Role.HR) {
        throw new HttpException(
          401,
          "You are not authorized to delete employee"
        );
      }
      const employee = await this.employeeService.DeleteEmployee(req.params.id);
      console.log(employee);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

  public updateEmployee = async (req, res, next) => {
    try {
      const role = req.role;
      if (role !== Role.HR) {
        throw new HttpException(
          401,
          "You are not authorized to update employee"
        );
      }
      const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(employeeDto);

      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }

      const employee = await this.employeeService.UpdateEmployee(
        req.params.id,
        employeeDto.name,
        employeeDto.email,
        employeeDto.age,
        employeeDto.address,
        employeeDto.department_id
      );

      res.status(200).send(employee);
    } catch (err) {
      next(err);
    }
  };

  public loginEmployee = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const token = await this.employeeService.loginEmployee(email, password);
      res.status(200).send(token);
    } catch (error) {
      next(error);
    }
  };
}
export default EmployeeController;
