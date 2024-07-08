import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
  constructor(private repository: Repository<Employee>) {}

  public find = async (): Promise<Employee[]> => {
    return this.repository.find({ relations: ["address", "department"] });
  };

  findoneby = async (filter: Partial<Employee>) => {
    return this.repository.findOne({
      where: filter,
      relations: ["address"],
    });
  };

  save = async (newEmployee: Employee) => {
    return this.repository.save(newEmployee);
  };

  delete = async (filter: Partial<Employee>) => {
    return this.repository.softDelete(filter);
  };

  softremove = async (filter) => {
    return this.repository.softRemove(filter);
  };
}

export default EmployeeRepository;
