import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb.db');

const setupDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT, dob TEXT, cpf TEXT)'
    );
  });
};
export { db, setupDatabase };

  

