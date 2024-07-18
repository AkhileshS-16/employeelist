import { Column, Entity, OneToMany } from "typeorm";
import AbstractEntity from "./abstract-identity";
import Employee from "./employee.entity";

@Entity()
class Department extends AbstractEntity {
  @Column()
  dname: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}

export default Department;
