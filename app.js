let express = require("express");
let app = express();
//let PORT = process.env.PORT || 3000;
let path = require("path");
let mongoose = require("mongoose")
let methodOverride = require("method-override");
let postRoutes = require("./routes/blogRoutes");

require("dotenv").config();
let db = process.env.MONGO_URL;
let PORT = process.env.PORT;

//let db = 'mongodb+srv://yurakarpa27:qwerty123@cluster0.cwzsimc.mongodb.net/Node-blog';

mongoose.connect(db);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(postRoutes);

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

async function start() {
  try {
    await mongoose.connect(db);
    console.log(`Connection to MongoDb is success!`);
    app.listen(PORT, () => {
      console.log(`Server is listening PORT ${PORT}...`);
    });
  } catch (error) {
    console.log(" \n Connection error!!! \n\n", error);
  }
}

start();
