const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

let tasks = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/add-task', (req, res) => {
  const task = req.body.task;
  if (task) tasks.push(task);
  res.redirect('/');
});

app.post('/delete-task', (req, res) => {
  const taskIndex = req.body.index;
  tasks.splice(taskIndex, 1);
  res.redirect('/');
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Сервер запущен: http://localhost:${port}`);
});
