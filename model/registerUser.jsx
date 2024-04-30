import { db } from './database';

const registerUser = (username, email, password, dob, cpf) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (_, results) => {
          if (results.rows.length > 0) {
            reject(new Error('O nome de usuário já está em uso.'));
          } else {
            tx.executeSql(
              'INSERT INTO users (username, email, password, dob, cpf) VALUES (?, ?, ?, ?, ?)',
              [username, email, password, dob, cpf],
              (_, result) => {
                resolve(result.insertId);
              },
              (_, error) => {
                reject(error);
              }
            );
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export { registerUser };
