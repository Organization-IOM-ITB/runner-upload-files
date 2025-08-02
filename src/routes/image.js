const { Router } = require('express');
const { uploadFile } = require('../controllers/file');
const upload  = require('../middlewares/multer');

const router = Router();

router.post('/upload', upload.fields([{ name: 'image', maxCount: 1 }]), uploadFile);

module.exports = router;
