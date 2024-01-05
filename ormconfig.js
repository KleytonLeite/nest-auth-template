const { createDataSource } = require('./src/data-source.js');

const dataSource = createDataSource();
module.exports = dataSource.options;
