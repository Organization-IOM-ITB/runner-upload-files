const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const router = require('./routes/index');

// Konfigurasi CORS
const corsOptions = {
  origin: [
    process.env.WEB_APP_URL,
    process.env.WEB_ADMIN_URL,
    process.env.API_URL
  ].filter(Boolean), 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
};

console.log('CORS Origins:', corsOptions.origin);

const app = express();

const swaggerOption = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'API RUNNER UPLOAD FILE IOM',
      version: '1.0.0',
      description: 'Description of API IOM',
    },
    server: [
      {
        uri: process.env.BASE_URL,
      },
    ],
  },
  apis: ['./src/routes/swagger/*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOption);
app.use(
  '/api',
  swaggerUi.serveFiles(swaggerSpec),
  swaggerUi.setup(swaggerSpec),
);

app.use(morgan('dev'));
// app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '')), (req, res, next) => {
  console.log(`Serving static file: ${req.path}`);
  next();
});

app.use(router);


app.get('/', (req, res) => {
  res.json({
    message: 'SELAMAT DATANG DI API RUNNER UPLOAD FILE IOM',
  });
});

// forgotPasswordJob.start();

app.use(router);

// const endpoints = expressListEndpoints(app);
// console.log(endpoints);

module.exports = app;
