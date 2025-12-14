const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.app.locals.db.query('SELECT * FROM tasks', (err, tasks) => {
    if (err) return res.status(500).send('Database error');
    res.render('tasks/index', { tasks });
  });
});

router.get('/tasks/new', (req, res) => {
  res.render('tasks/new');
});

router.post('/tasks', (req, res) => {
    const { title, description, status } = req.body;
    req.app.locals.db.query(
      'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
      [title, description, status],
      (err) => {
        if (err) return res.status(500).send('Database error');
        res.redirect('/');
      }
    );
});

router.get('/tasks/:id', (req, res) => {
  req.app.locals.db.query(
    'SELECT * FROM tasks WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send('Database error');
      if (!result.length) return res.status(404).send('Task not found');
      res.render('tasks/show', { task: result[0] });
    }
  );
});

router.get('/tasks/:id/edit', (req, res) => {
  req.app.locals.db.query(
    'SELECT * FROM tasks WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send('Database error');
      if (!result.length) return res.status(404).send('Task not found');
      res.render('tasks/edit', { task: result[0] });
    }
  );
});

router.post('/tasks/:id/edit', (req, res) => {
  const { title, description, status } = req.body;
  req.app.locals.db.query(
    'UPDATE tasks SET title=?, description=?, status=? WHERE id=?',
    [title, description, status, req.params.id],
    (err) => {
      if (err) return res.status(500).send('Database error');
      res.redirect('/');
    }
  );
});

router.post('/tasks/:id/delete', (req, res) => {
  req.app.locals.db.query(
    'DELETE FROM tasks WHERE id=?',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send('Database error');
      res.redirect('/');
    }
  );
});

module.exports = router;
