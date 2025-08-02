const { Router } = require('express');
const { uploadFile, downloadFile, previewFile } = require('../controllers/file');
const upload  = require('../middlewares/multer');

const router = Router();

router.post('/upload', upload.fields([{ name: 'file', maxCount: 1 }]), uploadFile);
router.get('/download', [], downloadFile);
router.get('/preview', [], previewFile);

module.exports = router;
