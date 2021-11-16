import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";

Entity("rentals");
class Rental {
  @PrimaryColumn("uuid")
  id: string;

  @ManyToOne(() => Cars)
  @JoinColumn({ name: "car_id" })
  car: Cars;

  @OneToOne(() => Cars)
  @JoinColumn({ name: "id" })
  car_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "id" })
  user_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expected_return_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.created_at = new Date();
    }
  }
}

export { Rental };
