import express from 'express';

const newRouter = express.Router();

newRouter.get('/', function(req, res, next) {
  res.render('pages/new');
});

export { newRouter };
