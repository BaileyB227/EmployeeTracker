const mysql = require('mysql2');
const inquirer = require ('inquirer');
const PORT = process.env.PORT || 3001;
const express = require ('express')
const app = express();
require("console.table");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

app.get('/api/employee', (req, res) => {
    const sql = 'SELECT * FROM employee'

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
             return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
})

app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});