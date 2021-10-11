const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Post = require('../models/Post');
const isValidUrl = (url) => {
  return url.match(
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,
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

  if (url.trim() !== '' && !isValidUrl(url)) {
    return next(new AppError('Url is invalid', 400));
  }

  const newPost = await Post.create({
    title,
    description,
    url: url.trim() && !url.startsWith('https') && `https://${url.trim()}`,
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

  if (url?.trim() && !isValidUrl(url)) {
    return next(new AppError('Url is invalid', 400));
  }

  if (url.trim() && !url.startsWith('https'))
    req.body.url = `https://${url.trim()}`;

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
    post: updatedPost,
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
