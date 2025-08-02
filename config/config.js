module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'cyeQ9o2AMoSU66uPYJkL9f4mxY8mDdRrDYbInWWqm2qWV6MEETvVDzR4Xswa2eKa',
    database: process.env.DB_NAME || 'iom-itb',
    host: process.env.DB_HOST || '195.110.58.17',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
  },
  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'cyeQ9o2AMoSU66uPYJkL9f4mxY8mDdRrDYbInWWqm2qWV6MEETvVDzR4Xswa2eKa',
    database: process.env.DB_NAME || 'iom-itb',
    host: process.env.DB_HOST || '195.110.58.17',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'cyeQ9o2AMoSU66uPYJkL9f4mxY8mDdRrDYbInWWqm2qWV6MEETvVDzR4Xswa2eKa',
    database: process.env.DB_NAME || 'iom-itb',
    host: process.env.DB_HOST || '195.110.58.17',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
  },
};

