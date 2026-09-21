const express = require("express");
const connectDB = require("./connection");
const urlRoutes = require("./routes/url.route")

const app = express();
console.log(app);
const PORT = 8000;

connectDB("mongodb://localhost:27017/mydb1");

app.use(express.json());

app.use("/api/urls", urlRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});
console.log("hello1");

app.listen(PORT, () => {
   console.log(`server is runing on ${PORT}`);
});