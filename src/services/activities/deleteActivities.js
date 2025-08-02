const { Activities, sequelize } = require('../../models');
const { StatusCodes } = require('http-status-codes');
const fs = require('fs');
const path = require('path');

const DeleteActivities = async (id) => {
  const transaction = await sequelize.transaction(); // Start a transaction
  try {
    // Find activity by id
    const activity = await Activities.findByPk(id, { transaction });

    // If activity not found, throw an error
    if (!activity) {
      throw {
        status: StatusCodes.NOT_FOUND,
        message: 'Activity not found',
      };
    }

    // If an image file URL exists, extract the file name and delete it
    if (activity.image) {
      const imageFileName = activity.image.split('/').pop(); // Get the file name from the URL

      // Define the path to the storage directory and the file
      const imagePath = path.join(__dirname, '../../storage', imageFileName);

      // Delete the file if it exists
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete the activity
    await activity.destroy({ transaction });

    // Commit the transaction
    await transaction.commit();

    return {
      status: StatusCodes.OK,
      message: 'Activity deleted successfully',
    };
  } catch (error) {
    // Rollback the transaction in case of error
    await transaction.rollback();
    throw new Error(`Failed to delete activity: ${error.message || error}`);
  }
};

module.exports = DeleteActivities;
