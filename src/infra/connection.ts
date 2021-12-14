import mysql from 'mysql';

 export const connection = mysql.createConnection({
     host: 'localhost',
     port: 3307,
     user: 'root',
     password: 'root',
     database: 'agenda-petshop'
 })