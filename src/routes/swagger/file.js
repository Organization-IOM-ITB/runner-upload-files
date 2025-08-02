/**
 * @swagger
 *
 * /files/upload:
 *   post:
 *     summary: Upload a file
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 description: The file to upload
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File successfully uploaded
 *       400:
 *         description: Bad request, invalid input data
 *       500:
 *         description: Internal Server Error
 */
