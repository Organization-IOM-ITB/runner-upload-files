const { Activities, sequelize } = require('../../models');
const { StatusCodes } = require('http-status-codes');
const BaseError = require('../../schemas/responses/BaseError');
const fs = require('fs');

const CreateActivities = async (body, files, path) => {
  // Start transaction
  const transaction = await sequelize.transaction();
  // Handle image file
  const imageFile = files && files['imageActivity'] ? files['imageActivity'][0] : null;
  const imageFileName = imageFile ? `${path}/storage/${imageFile?.filename}` : null;
  try {
    // Validate required fields
    const { title, date } = body;

    if (!title || !date) {
      throw new BaseError({
        status: StatusCodes.BAD_REQUEST,
        message: 'Title and date are required fields',
      });
    }

    // Create the activity record within a transaction
    const newActivity = await Activities.create(
      {
        title,
        image: imageFileName, // store the file name in the database or null if no image
        description: body.description || '', // optional
        date,
        url: body.url || '', // optional
      },
      { transaction }
    );

    // Commit the transaction
    await transaction.commit();

    return newActivity;
  } catch (error) {
    // Rollback the transaction in case of error
    await transaction.rollback();

    // Clean up uploaded files if any errors occur
    if (files && imageFile) {
      const imageFilePath = path.join(__dirname, '../../storage', imageFile.filename);
      if (fs.existsSync(imageFilePath)) {
        fs.unlinkSync(imageFilePath);
      }
    }
    // Re-throw the error for handling
    throw new BaseError({
      status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      message: `Failed to create activity: ${error.message || error}`,
    });
  }
};

module.exports = CreateActivities;