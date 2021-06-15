import { v4 as uuid } from "uuid";

class Specification {
  id?: string;
  name: string | undefined;
  description: string | undefined;
  created_at: Date | undefined;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Specification };
