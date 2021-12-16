import mysql from 'mysql';

export const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'user',
    password: 'password',
    database: 'agendapetshop'
}
)