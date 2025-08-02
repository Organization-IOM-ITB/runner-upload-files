const BaseResponse = require("../schemas/responses/BaseResponse");
const downloadService = require("../services/file/download");
const uploadService = require("../services/file/upload");
const previewService = require("../services/file/preview");
const { StatusCodes } = require('http-status-codes');
const path = require('path');

const uploadFile = async (req, res) => {
  try {
    if (!req.files) {
      throw new Error('No file uploaded');
    }

    const result = await uploadService.upload(req, req.files);
    res.status(StatusCodes.OK).json(new BaseResponse({
      status: StatusCodes.OK,
      message: 'Berhasil',
      data: result
    }));
  } catch (error) {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(status).json(
      new BaseResponse({
        status: status,
        message: error.message
      })
    );
  }
}

const downloadFile = async (req, res) => {
  try {
    const { fileName } = req.query;

    if (!fileName) {
      throw new Error('Missing fieldName or fileName');
    }

    const fileContent = await downloadService.download(fileName);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.status(StatusCodes.OK).send(fileContent);
  } catch (error) {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(status).json(
      new BaseResponse({
        status: status,
        message: error.message
      })
    );
  }
};

const previewFile = async (req, res) => {
  try {
    const { fileName } = req.query;

    if (!fileName) {
      throw new Error('Missing fileName');
    }

    const { fileContent, filePath } = await previewService.preview(fileName);
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream';

    switch (ext) {
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      default:
        break;
    }

    console.log(`Setting response headers for content type: ${contentType}`);

    res.setHeader('Content-Type', contentType);
    res.status(StatusCodes.OK).send(fileContent);
  } catch (error) {
    console.error(`Error in previewFile controller: ${error.message}`);
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(status).json(
      new BaseResponse({
        status: status,
        message: error.message
      })
    );
  }
};

module.exports = {
  uploadFile,
  downloadFile,
  previewFile
};
