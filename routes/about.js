import express from 'express';

const aboutRouter = express.Router();

aboutRouter.get('/', function(req, res, next) {
  res.render('pages/about');
});

export { aboutRouter };
