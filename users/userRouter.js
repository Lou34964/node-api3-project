const express = require('express');

const userDb = require('./userDb');
const postDb = require('../posts/postDb');

const router = express.Router();

const gd = 200, bd = 500, ny = 404, rm = 204;

router.post('/', (req, res) => {
  // do your magic!
  userDb.insert(req.body)
    .then(user =>{
      res.status(gd).json(user);
    })
    .catch(err =>{ console.log(err); res.status(bd).json({errorMessage: "Error adding a new user", error: err}) })
});

router.post('/:id/posts',validateUserId, validatePost, (req, res) => {
  // do your magic!
  postDb.insert({user_id: req.param.id, text:req.body.text})
    .then(newPost => res.status(gd).json(newPost))
    .catch(err => res.status(bd).json({errorMessage: "Error while adding new post", error: err}))
});

router.get('/', (req, res) => {
  // do your magic!
  userDb.get()
    .then(users => res.status(gd).json(users))
    .catch(err => res.status(bd).json({errorMessage: "Error while retrieving users.", error: err}))
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  userDb.getById()
    .then(user=>{
      res.status(gd).json(user);
    })
    .catch(err => res.status(bd).json({errorMessage: "Error: user not found", error: err}))
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  userDb.getUserPosts(req.params.id)
    .then(userPosts =>{
      if(!userPosts){
        res.status(ny),json({errorMessage: "Error: User posts do not exsist", error: "Unknown"})
        return null;
      }
      res.status(gd).json(userPosts);
    })
    .catch(err => res.status(bd).json({errorMessage: "Error while retrieving user posts.", error: err}))
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  userDb.remove(req.params.id)
    .then(user=>{
      res.status(rm).json(user);
    })
    .catch(err => res.status(bd).json({errorMessage: "Unable to remove user.", error: err}))
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  userDb.update(req.params.id, req.body)
    .then(user => {
      res.status(gd).json(user);
    })
    .catch(err => res.status(500).json({errorMessage: "Unable to update user information.", error: err}))
});

//custom middleware

function validateUserId(req, res, next) {
  const userId = req.params.id
  // do your magic!
  if(userId){
    req.user = userId;
    userDb.getById(req.params.id)
      .then(user => {
        if(!user){
          res.status(400).json({ message: "The user has been lost on the trail."})
        }else{
          next();
        }
      })
      .catch(err =>  res.status(500).json({ error: "Uh oh, there was a problem looking for that user."}));
  } else {
      res.status(400).json({message: "invalid user id"});
  }
}


function validateUser(req, res, next) {
  // do your magic!
  if(!req.body || !req.body.name) {
    res.status(400).json({ message: "Please provide a name for the new user."});
  }else{
    next();
  }  
}

function validatePost(req, res, next) {
  // do your magic!
  if(req.body && !req.body.text){
    res.status(400).json({message: "missing required text field"})
  }else if(!req.body){
    res.status(400).json({message: "missing post data"})
  }else{
    next();
}
}

module.exports = router;
