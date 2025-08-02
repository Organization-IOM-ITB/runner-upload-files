const fs = require('fs');
const path = require('path');

const preview = async (fileName) => {
  try {
    // Gunakan path absolut untuk memastikan direktori yang benar
    const uploadDir = path.join(__dirname, '../../uploads');
    const filePath = path.join(uploadDir, fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }

    // Baca file dan kembalikan isinya serta path
    const fileContent = fs.readFileSync(filePath);
    
    return { fileContent, filePath };
  } catch (error) {
    throw error;
  }
};

module.exports = { preview };
