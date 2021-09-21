import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("specifications")
class Specification {
  @PrimaryColumn("uudi")
  id?: string;

  @Column()
  name: string | undefined;

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

export { Specification };
