require('dotenv').config();
const {PORT} = process.env;
const server = require('./src/app.js');
const { sequelize } = require('./src/db.js');

// Syncing all the models at once.
sequelize.sync({ force: false })
.then(() => {
  server.listen(PORT, () => {
    console.log('%s listening at ' + PORT); // eslint-disable-line no-console
  });
});
