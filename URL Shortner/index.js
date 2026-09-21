const express = require("express");
const connectDB = require("./connection");
// const urlRoutes = require("./routes/url.route");
const staticRoutes = require("./routes/static.route");
// const authRoutes = require("./routes/  auth.route");
const path = require("path");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

connectDB("mongodb://localhost:27017/mydb1");

// app.get("/", (req, res) => {
//     res.render("home", {
//         shortId: null
//     });
// });

// app.use("/auth", authRoutes);
// app.use("/api/urls", urlRoutes);
app.use("/", staticRoutes)

app.listen(PORT, () => {
   console.log(`server is runing on ${PORT}`);
});