import express from "express";
import DepartmentService from "../service/department.service";
import { plainToInstance } from "class-transformer";
import { CreateDepartmentDto } from "../dto/department.dto";
import { validate } from "class-validator";
import HttpException from "../exceptions/http.exceptions";
import authorize from "../middleware/authorization.middleware";
import { Role } from "../utils/enums/role.enums";

class DepartmentController {
  public router: express.Router;

  constructor(private departmentService: DepartmentService) {
    this.router = express.Router();

    this.router.get("/", authorize, this.getAllDepartments);
    this.router.get("/:id", authorize, this.getDepartmentById);
    this.router.post("/", authorize, this.createDepartment);
    this.router.delete("/:id", authorize, this.deleteDepartment);
    this.router.put("/:id", authorize, this.updateDepartment);
  }

  public getAllDepartments = async (req, res) => {
    const departments = await this.departmentService.GetAllDepartments();
    res.status(200).send(departments);
  };

  public getDepartmentById = async (req, res, next) => {
    try {
      const department = await this.departmentService.GetDepartmentById(
        req.params.id
      );
      res.status(200).send(department);
    } catch (err) {
      next(err);
    }
  };

  public createDepartment = async (req, res, next) => {
    try {
      const role = req.role;
      if (role !== Role.HR) {
        throw new HttpException(
          401,
          "You are not authorized to create department"
        );
      }
      const createDepartmentDto = plainToInstance(
        CreateDepartmentDto,
        req.body
      );
      const errors = await validate(createDepartmentDto);
      if (errors.length) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const savedDepartment = await this.departmentService.CreateDepartment(
        createDepartmentDto.name
      );
      res.status(201).send(savedDepartment);
    } catch (err) {
      next(err);
    }
  };

  public deleteDepartment = async (req, res, next) => {
    try {
      const role = req.role;
      if (role !== Role.HR) {
        throw new HttpException(
          401,
          "You are not authorized to delete department"
        );
      }
      const department = await this.departmentService.GetDepartmentById(
        req.params.id
      );
      const deleteDepartment = await this.departmentService.DeleteDepartment(
        department
      );
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

  public updateDepartment = async (req, res, next) => {
    try {
      const role = req.role;
      if (role !== Role.HR) {
        throw new HttpException(
          401,
          "You are not authorized to update department"
        );
      }
      const createDepartmentDto = plainToInstance(
        CreateDepartmentDto,
        req.body
      );
      const errors = await validate(createDepartmentDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }

      const updateDepartment = await this.departmentService.UpdateDepartment(
        req.params.id,
        createDepartmentDto.name
      );
      res.status(201).send(updateDepartment);
    } catch (err) {
      next(err);
    }
  };
}

export default DepartmentController;
