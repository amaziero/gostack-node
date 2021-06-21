import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string | undefined;

  @Column()
  name: string | undefined;

  @Column()
  password: string | undefined;

  @Column()
  email: string | undefined;

  @Column()
  driver_license: string | undefined;

  @Column()
  isAdmin: boolean | undefined;

  @Column()
  description: string | undefined;

  @CreateDateColumn()
  created_at: Date | undefined;

  @UpdateDateColumn()
  updated_at: Date | undefined;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
