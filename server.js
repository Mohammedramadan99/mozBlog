const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

require("colors");
dotenv.config();
const dbConnect = require("./config/db/dbConnect");

const userRoutes = require("./route/users/usersRoute");
const postRoute = require("./route/posts/postRoute");
const commentRoute = require("./route/comments/commentRoute");
const categoryRoute = require("./route/category/categoryRoute");
const emailMsgRoute = require("./route/emailMsg/emailMsgRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");

const app = express();
//DB
dbConnect();

//Middleware
app.use(express.json());
app.use(cors());
//Users route
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/category", categoryRoute);
app.use("/api/email", emailMsgRoute);

// err handler -- put those below all routes
app.use(notFound);
app.use(errorHandler);
app.use("/api", () => {
  res.send("hellow");
});
if (process.env.NODE_ENV == "production") {
  const path = require("path");

  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
console.log(__dirname);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
