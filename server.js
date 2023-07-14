const express = require("express");
const app = express();
const session = require("express-session");
const port = 4000;
const bcrypt = require("bcryptjs");
const { Post, Comment, User } = require("./models");
require("dotenv").config();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // 1 hour
    },
  })
);

const authenticateUser = (req, res, next) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ message: "You must be logged in to view this page." });
  }
  next();
};

app.get("/", (req, res) => {
  res.send("Welcome to the Blog !!!!");
});

// Get all the posts
app.get("/posts", authenticateUser, async (req, res) => {
  try {
    const allPosts = await Post.findAll();

    res.status(200).json(allPosts);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Create a new Post
app.post("/posts", authenticateUser, async (req, res) => {
  try {
    const newPost = await Post.create(req.body);

    res.status(201).json(newPost);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Get a specific Post
app.get("/posts/:id", authenticateUser, async (req, res) => {
  const blogId = parseInt(req.params.id, 10);

  try {
    const Post = await Post.findOne({ where: { id: blogId } });

    if (Post) {
      res.status(200).json(Post);
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Update a specific Post
app.patch("/posts/:id", authenticateUser, async (req, res) => {
  const blogId = parseInt(req.params.id, 10);

  try {
    const record = await Post.findOne({ where: { id: blogId } });
    if (record && record.UserId !== parseInt(req.session.userId, 10)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform that action." });
    }

    const [numberOfAffectedRows, affectedRows] = await Post.update(req.body, {
      where: { id: blogId },
      returning: true,
    });

    if (numberOfAffectedRows > 0) {
      res.status(200).json(affectedRows[0]);
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Delete a specific Post
app.delete("/posts/:id", authenticateUser, async (req, res) => {
  const blogId = parseInt(req.params.id, 10);

  try {
    const record = await Post.findOne({ where: { id: blogId } });
    if (record && record.UserId !== parseInt(req.session.userId, 10)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform that action." });
    }

    const deleteOp = await Post.destroy({ where: { id: blogId } });

    if (deleteOp > 0) {
      res.status(200).send({ message: "Post deleted successfully" });
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

//////////////////////////// comments routes
// Get all the posts
app.post("/comments", authenticateUser, async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);

    res.status(201).json(newComment);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Get all comments
app.get("/comments", authenticateUser, async (req, res) => {
  try {
    const allcomments = await Comment.findAll();

    res.status(200).json(allcomments);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Get a specific comment
app.get("/comments/:id", authenticateUser, async (req, res) => {
  const commentId = parseInt(req.params.id, 10);

  try {
    const comment = await Comment.findOne({ where: { id: commentId } });

    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).send({ message: "Comment not found" });
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Update a specific recipe
app.patch("/comments/:id", authenticateUser, async (req, res) => {
  const commentId = parseInt(req.params.id, 10);

  try {
    const record = await Comment.findOne({ where: { id: commentId } });
    if (record && record.UserId !== parseInt(req.session.userId, 10)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform that action." });
    }

    const [numberOfAffectedRows, affectedRows] = await Comment.update(
      req.body,
      { where: { id: commentId }, returning: true }
    );

    if (numberOfAffectedRows > 0) {
      res.status(200).json(affectedRows[0]);
    } else {
      res.status(404).send({ message: "Comment not found" });
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    res.status(500).send({ message: err.message });
    console.error(err);
  }
});

// Delete a specific recipe
app.delete("/comments/:id", authenticateUser, async (req, res) => {
  const commentId = parseInt(req.params.id, 10);

  try {
    const record = await Comment.findOne({ where: { id: commentId } });
    if (record && record.UserId !== parseInt(req.session.userId, 10)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform that action." });
    }

    const deleteOp = await Comment.destroy({ where: { id: commentId } });

    if (deleteOp > 0) {
      res.status(200).send({ message: "Comment deleted successfully" });
    } else {
      res.status(404).send({ message: "Comment not found" });
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

app.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    req.session.userId = user.id;
    // Send a response to the client informing them that the user was successfully created
    res.status(201).json({
      message: "User created!",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(422)
        .json({ errors: error.errors.map((e) => e.message) });
    }
    res.status(500).json({
      message: "Error occurred while creating user",
      error: error,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    // First, find the user by their email address
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user === null) {
      // If the user isn't found in the database, return an 'incorrect credentials' message
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }

    // If the user is found, we then use bcrypt to check if the password in the request matches the hashed password in the database
    bcrypt.compare(req.body.password, user.password, (error, result) => {
      if (result) {
        // Passwords match
        // TODO: Create a session for this user
        req.session.userId = user.id;
        res.status(200).json({
          message: "Logged in successfully",
          user: {
            name: user.name,
            email: user.email,
          },
        });
      } else {
        // Passwords don't match
        res.status(401).json({ message: "Incorrect credentials" });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred during the login process" });
  }
});

app.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.sendStatus(500);
    }

    res.clearCookie("connect.sid");
    return res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
