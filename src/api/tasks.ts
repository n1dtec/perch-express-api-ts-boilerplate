import express from 'express';
import Task from '../database/models/task.model';
import { errorHandler, notFound } from '../middlewares';

const router = express.Router();
const validStatus = ['INCOMPLETE', 'COMPLETE'];

router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.findAll();

    // Handle the case when no tasks are found
    if (tasks.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(tasks);
  } catch (error: any) {
    errorHandler(error, req, res, next);
  }
});

router.post('/', async (req, res, next) => {
  try {
    // Status verification
    const { status } = req.body;
    if (!validStatus.includes(status.toUpperCase())) {
      return res.status(400).json({ message: 'Invalid status value provided.' });
    }

    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error: any) {
    errorHandler(error, req, res, next);
  }
});

router.patch('/:id', async (req, res, next) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: 'Update requires a valid "status" field.' });
  }
  try {
    // Status verification
    if (!validStatus.includes(status.toUpperCase())) {
      return res.status(400).json({ message: 'Invalid status value provided.' });
    }

    // Update the status of the target task
    const result = await Task.update({ status }, {
      where: { id: req.params.id },
      returning: true,
    });

    if (result[0] === 0) {
      // Task was not found
      notFound(req, res, next);
    } else {
      // Return the updated task
      const updatedTask = result[1][0].get({ plain: true });
      res.status(200).json(updatedTask);
    }
  } catch (error: any) {
    errorHandler(error, req, res, next);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Task.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      notFound(req, res, next);
    }
  } catch (error: any) {
    errorHandler(error, req, res, next);
  }
});

export default router;
