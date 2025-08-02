const express = require('express');

const router = express.Router();
const fileRouter = require('./file');
const imageRouter = require('./image');
const pdfRouter = require('./pdf');

router.get('/', (req, res) => {
  res.json({
    version: '3.9.0',
  });
});

router.use('/files', fileRouter);
router.use('/images', imageRouter);
router.use('/pdf', pdfRouter);

module.exports = router;
