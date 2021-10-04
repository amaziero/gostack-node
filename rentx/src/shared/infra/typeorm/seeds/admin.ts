import { hash } from "bcrypt";
import { v4 as uudiV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connetcion = createConnection("localhost");

  const id = uudiV4();
  const password = await hash("admin", 8);

  (await connetcion).query(
    `INSERT INTO USERS(id,  name, email, password, "isAdmin", created_at, driver_license)
			values('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXXX')
		`
  );

  (await connetcion).close();
}

create().then(() => console.log("user admin created"));
