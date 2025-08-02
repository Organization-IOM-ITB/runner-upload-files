const fs = require('fs');
const path = require('path');

const download = async (fileName) => {
  try {
    // Gunakan path absolut untuk memastikan direktori yang benar
    const uploadDir = path.join(__dirname, '../../uploads');
    const filePath = path.join(uploadDir, fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }

    // Kembalikan path file agar bisa digunakan untuk stream
    return filePath;
  } catch (error) {
    throw error;
  }
};

module.exports = { download };
