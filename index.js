const express = require("express");
const app = express();

//Endpoint setup
require('./src/serve').setup(app);

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
