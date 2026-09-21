const express = require("express");
require("./mongo/index");
const userRoutes = require("./Routes/user.route");

const PORT = 8000;
const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
   console.log(`server is runing on ${PORT}`);
});