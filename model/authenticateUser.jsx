import { db } from "./database";

const authenticateUser = (username, password) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM users WHERE username = ? AND password = ?',
          [username, password],
          (_, result) => {
            if (result.rows.length > 0) {
              resolve(true); 
            } else {
              resolve(false); 
            }
          },
        );
      });
    });
  };
  
  export { authenticateUser };
  