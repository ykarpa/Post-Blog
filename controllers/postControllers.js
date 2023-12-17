let Post = require("../models/postModel");

let getAddPost = (req, res) => {

  res.render('add-post', { title: "Add post" });
}

let addPost = (req, res) => {

  let { title, description, author } = req.body;
  let post = new Post({ title, description, author });

  post
    .save()
    .then(() => res.redirect("/posts"))
    .catch((error) => {
      console.log(error);
      res.render("error");
    });
}

let getPost = (req, res) => {
  const postId = req.params.id;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).render('error', { message: 'Стаття не знайдена' });
      }

      res.render('Post', { post });
    })
    .catch((error) => {
      console.log(error);
      res.render('error');
    });
};

let getPosts = (req, res) => {
  Post.find()
    .then((posts) => res.render("posts", { title: "Posts", posts }))
    .catch((error) => {
      console.log(error);
      res.render("error");
    });
}

let getEditPost = (req, res) => {
  let id = req.params.id;
  Post.findById(id)
    .then((post) => {
      res.render("edit-post", { title: post.title, description: post.description, author: post.author, id: post._id, post });
    })
    .catch((error) => {
      console.log(error);
      res.render("error");
    });
}

let editPost = (req, res) => {
  let id = req.params.id;
  let { title, description } = req.body;
  
  Post.findById(id)
    .then((post) => {
      post.title = title;
      post.description = description;

      return post.save();
    })
    .then(() => res.redirect(`/posts`))
    .catch((error) => {
      console.log(error);
      res.render("error");
    });
}

let deletePost = (req, res) => {
  let id = req.params.id;
  Post.findByIdAndDelete(id)
    .then(() => res.redirect("/posts"))
    .catch((error) => {
      console.log(error);
      res.render("error");
    });
}

const getLatestArticles = async (req, res) => {
  try {
    const latestArticles = await Post.find().sort({ createdAt: 'desc' }).limit(10);

    res.render('index', { latestArticles, title: 'Останні статті' });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Помилка при завантаженні статей' });
  }
};

module.exports = {
    getAddPost,
    addPost,
    getPost,
    getPosts,
    getEditPost,
    editPost,
    deletePost,
    getLatestArticles,
}