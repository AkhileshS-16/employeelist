import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import AbstractEntity from "./abstract-identity";
import Address from "./address.entity";
import { Role } from "../utils/enums/role.enums";
import Department from "./department.enitity";

@Entity()
class Employee extends AbstractEntity {
  @Column()
  email: string;

  @Column()
  ename: string;

  @Column()
  status: string;

  @OneToOne(() => Address, (address) => address.employee, {
    cascade: true,
    onDelete: "CASCADE",
  })
  address: Address;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  Role: Role;

  @ManyToOne(() => Department, (department) => department.employees)
  department: Department;
}

export default Employee;
