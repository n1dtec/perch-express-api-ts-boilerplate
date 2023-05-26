import express from 'express';

import people from './people';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Root API response',
  });
});

router.use('/people', people);

export default router;
