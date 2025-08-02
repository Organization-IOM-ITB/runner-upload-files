const { Activities, sequelize } = require('../../models');
const { StatusCodes } = require('http-status-codes');
const BaseError = require('../../schemas/responses/BaseError');
const fs = require('fs');
const path = require('path');

const UpdateActivities = async (id, body, files, basePath) => {
  const transaction = await sequelize.transaction();
  let imageFile = files && files['imageActivity'] ? files['imageActivity'][0] : null;
  const imageFileName = imageFile ? `${basePath}/storage/${imageFile.filename}` : null;

  try {
    const activity = await Activities.findByPk(id, { transaction });

    if (!activity) {
      throw new BaseError({
        status: StatusCodes.NOT_FOUND,
        message: 'Activity not found',
      });
    }

    const { title, date } = body;

    if (!title && !date && !imageFileName && !body.description && !body.url) {
      throw new BaseError({
        status: StatusCodes.BAD_REQUEST,
        message: 'At least one of title, date, or image must be provided for update',
      });
    }

    // Delete the previous image if a new one is uploaded
    if (imageFile && activity.image) {
      const previousImagePath = activity.image; 
      console.log('Previous Image Path:', previousImagePath); // Log previous image path
      const previousImageFileName = path.basename(previousImagePath);
      const previousImageFilePath = path.join(__dirname, '../../storage', previousImageFileName);
      
      // Check if the file exists
      if (fs.existsSync(previousImageFilePath)) {
        console.log('Deleting file:', previousImageFilePath); // Log file path being deleted
        fs.unlinkSync(previousImageFilePath);
        console.log('deleted');
      } else {
        console.log('File does not exist:', previousImageFilePath); // Log if file does not exist
      }
    }

    // Update activity with new data
    const updatedActivity = await Activities.update(
      {
        title: title || activity.title,
        image: imageFileName || activity.image,
        description: body.description || activity.description,
        date: date !== undefined ? date : activity.date,
        url: body.url !== undefined ? body.url : activity.url,
      },
      {
        where: { id },
        transaction,
      }
    );

    await transaction.commit();

    return updatedActivity;
  } catch (error) {
    await transaction.rollback();

    if (files && imageFile) {
      const imageFilePath = path.join(__dirname, '../../storage', imageFile.filename);
      if (fs.existsSync(imageFilePath)) {
        fs.unlinkSync(imageFilePath);
      }
    }

    throw new BaseError({
      status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      message: `Failed to update activity: ${error.message || error}`,
    });
  }
};

module.exports = UpdateActivities;