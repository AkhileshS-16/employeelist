import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";
import Department from "../entity/department.enitity";

class DepartmentRepository {
  constructor(private repository: Repository<Department>) {}

  public find = async (): Promise<Department[]> => {
    return this.repository.find({ relations: ["employees"] });
  };

  findoneby = async (filter: Partial<Department>) => {
    return this.repository.findOne({
      where: filter,
      relations: ["employees"],
    });
  };

  save = async (newDepartment: Department) => {
    return this.repository.save(newDepartment);
  };

  softremove = async (filter) => {
    return this.repository.softRemove(filter);
  };
}
export default DepartmentRepository;
