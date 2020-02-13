module.exports = {
  logger,
  validatePostId
}

function logger (req, res, next){
  const {method, originalUrl} = req;
  console.log(`[${new Date().toISOString()}] ${method} to ${originalUrl}`);
  next(); 
}

function validatePostId(req, res, next){
  // do your magic!
}