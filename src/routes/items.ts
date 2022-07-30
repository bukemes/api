import express from 'express';

const itemsRouter = express.Router();

// GET
itemsRouter.get('/', (req, res) => {
  res.json({ mssg: 'GET all items' });
});

itemsRouter.get('/:type', (req, res) => {
  res.json({ mssg: 'GET all items of a specific type' });
});

itemsRouter.get('/:type/:id', (req, res) => {
  res.json({ mssg: 'GET a specific item of a specific type' });
});

// POST
itemsRouter.post('/:type', (req, res) => {
  res.json({ mssg: 'POST a type' });
});

itemsRouter.post('/:type/:id', (req, res) => {
  res.json({ mssg: 'POST a new item of a type' });
});

// DELETE all of a type
itemsRouter.delete('/:type', (req, res) => {
  res.json({ mssg: 'DELETE all of a type' });
});

itemsRouter.delete('/:type/:id', (req, res) => {
  res.json({ mssg: 'DELETE a specific' });
});

// PUT
itemsRouter.put('/:type', (req, res) => {
  res.json({ mssg: 'PUT a type' });
});

itemsRouter.put('/:type/:id', (req, res) => {
  res.json({ mssg: 'PUT a specific item' });
});

export default itemsRouter;
