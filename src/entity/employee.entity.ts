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
// import Department from "./department.enitity";

@Entity()
class Employee extends AbstractEntity {
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @OneToOne(() => Address, (address) => address.employee, {
    cascade: true,
    onDelete: "CASCADE",
  })
  address: Address;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  role: Role;

  // @ManyToOne(() => Department, (department) => department.employees)
  // departmeent: Department;
}

export default Employee;
