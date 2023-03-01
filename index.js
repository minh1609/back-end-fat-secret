const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./controller");

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

//routing
app.use("/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
