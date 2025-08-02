const upload = async (req, files) => {
    let file = null;

    if (files && files['file']) {
    file = files['file'][0];
    } else if (files && files['image']) {
    file = files['image'][0];
    } else if (files && files['pdf']) {
    file = files['pdf'][0];
    }

    if (!file) {
        throw new Error('No file provided');
    }

    // Ambil domain URL dari request
    const protocol = req.protocol; // http atau https
    const host = req.get('host');  // domain + port (jika ada)
    const fileUrl = `${protocol}://${host}/uploads/${file.filename}`;

    return fileUrl;
};

module.exports = { upload };
