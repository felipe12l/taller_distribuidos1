const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); 

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Shiromaru01',
  database: 'universidad'
};


app.get('/api/estudiantes', async (req, res) => {
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.execute('SELECT * FROM Estudiante');
  conn.end();
  res.json(rows);
});

app.post('/api/estudiantes', async (req, res) => {
  const { nombre, email } = req.body;
  const conn = await mysql.createConnection(dbConfig);
  await conn.execute('INSERT INTO Estudiante (nombre, email) VALUES (?, ?)', [nombre, email]);
  conn.end();
  res.sendStatus(201);
});


app.get('/api/cursos', async (req, res) => {
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.execute('SELECT * FROM Curso');
  conn.end();
  res.json(rows);
});

app.post('/api/cursos', async (req, res) => {
  const { nombre, creditos } = req.body;
  const conn = await mysql.createConnection(dbConfig);
  await conn.execute('INSERT INTO Curso (nombre, creditos) VALUES (?, ?)', [nombre, creditos]);
  conn.end();
  res.sendStatus(201);
});

// Endpoints para inscripciones
app.get('/api/inscripciones', async (req, res) => {
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.execute(`
    SELECT i.id_inscripcion, e.nombre AS nombre_estudiante, c.nombre AS nombre_curso, i.fecha
    FROM Inscripcion i
    JOIN Estudiante e ON i.id_estudiante = e.id_estudiante
    JOIN Curso c ON i.id_curso = c.id_curso
  `);
  conn.end();
  res.json(rows);
});

app.post('/api/inscripciones', async (req, res) => {
  const { id_estudiante, id_curso, fecha } = req.body;
  const conn = await mysql.createConnection(dbConfig);
  await conn.execute(
    'INSERT INTO Inscripcion (id_estudiante, id_curso, fecha) VALUES (?, ?, ?)',
    [id_estudiante, id_curso, fecha]
  );
  conn.end();
  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});