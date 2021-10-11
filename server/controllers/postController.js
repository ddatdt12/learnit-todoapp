const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Post = require('../models/Post');
const isValidUrl = (url) => {
  return url.match(
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g,
  );
};

//@desc         get all post of logged in user
//@route        POST /api/posts
//@access       PRIVATE
exports.getPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    data: posts,
  });
});

//@desc         Create new post
//@route        POST /api/posts
//@access       PRIVATE
exports.createPost = catchAsync(async (req, res, next) => {
  const { title, description, url, status } = req.body;
  const newPost = await Post.create({
    title,
    description,
    url: url.startsWith('https://') ? url : `https://${url}`,
    status,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    data: newPost,
  });
});

//@desc         Update  post
//@route        POST /api/posts/:id
//@access       PRIVATE
exports.updatePost = catchAsync(async (req, res, next) => {
  const { url } = req.body;
  req.body.url = url && url.startsWith('https://') ? url : `https://${url}`;

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedPost) {
    return next(new AppError(`No post found with id ${req.params.id}`, 404));
  }

  if (updatedPost.user.toString() !== req.user._id.toString()) {
    return next(
      new AppError('You do not have permission to update this post !', 403),
    );
  }

  res.status(200).json({
    success: true,
    data: updatedPost,
  });
});

//@desc         Delete  post
//@route        DELETE /api/posts/:id
//@access       PRIVATE
exports.deletePost = catchAsync(async (req, res, next) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.id);

  if (!deletedPost) {
    return next(new AppError(`Post not found with ${req.params.id} `));
  }

  if (deletedPost.user.toString() !== req.user._id.toString()) {
    return next(
      new AppError('You do not have permission to delete this post !', 403),
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
