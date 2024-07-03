import express from "express";
import { Request, Response } from "express";
import Employee from "./employeeClass";
import dataSource from "./data-source";
import { FindOptionsUtils } from "typeorm";

const employeeRouter = express.Router();

const employees: Employee[] = [
  {
    id: 1,
    name: "Akhilesh",
    email: "akhilesh@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

employeeRouter.get("/", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employee);
  const employees = await employeeRepository.find();
  res.status(200).send(employees);
});

employeeRouter.get("/:id", async (req: Request, res: Response) => {
  const employeeRepository = dataSource.getRepository(Employee);
  const employee = await employeeRepository.findOneBy({
    id: Number(req.params.id),
  });
  res.status(200).send(employee);
});

employeeRouter.post("/", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employee);
  const newEmployee = new Employee();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;
  const savedEmployee = await employeeRepository.save(newEmployee);
  res.status(200).send(savedEmployee);
});

employeeRouter.put("/:id", async (req: Request, res: Response) => {
  const employeeRepository = dataSource.getRepository(Employee);
  const emp = await employeeRepository.findOneBy({
    id: Number(req.params.id),
  });
  emp.name = req.body.name;
  emp.email = req.body.email;
  const savedEmployee = await employeeRepository.save(emp);
  res.status(200).send("Updated Employee\n\n" + emp);
});

employeeRouter.delete("/:id", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employee);
  const result = await employeeRepository.softDelete(Number(req.params.id));
  res.status(200).send(result);
});

export default employeeRouter;
