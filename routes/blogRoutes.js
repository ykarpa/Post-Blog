let express = require("express");
let router = express.Router();
let { getAddPost,
  addPost,
  getPost,
  getPosts,
  getEditPost,
  editPost,
  deletePost,
  getLatestArticles, } = require('../controllers/postControllers');

router.get("/add-post", getAddPost);

router.post("/add-post", addPost);

router.get("/post/:id", getPost);

router.get("/posts", getPosts);

router.get("/edit-post/:id", getEditPost);

router.put("/edit-post/:id", editPost);

router.delete("/posts/:id", deletePost);

router.get("/", getLatestArticles);

module.exports = router;