const express = require('express');

const postDb = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  postDb.get()
  .then(posts => res.status(200).json(posts))
  .catch(err => res.status(500).json({ error: "There was a problem getting all the posts"}))
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  postDb.getById(req.params.id)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ error: "We can't seem to find that post anymore..."}))
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  postDb.remove(req.params.id)
    .then(post => res.status(204).json(post))
    .catch(err => res.status(500).json({ error: "Um, something happened while trying to remove that post."}))
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  postDb.update(req.params.id, req.body)
    .then(post => res.status(201).json(post))
    .catch(err => res.status(500).json({ error: "There was an error updating the post."}))
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  if(!req.params.id){
    res.status(400).json({ error: "Uh, what post are you looking for?"})
  }else{
    postDb.getById(req.params.id)
      .then(post => {
        if(!post){
          res.status(400).json({ error: "The post you are looking for is gone!"})
        } else {
          next()
        }
      })
      .catch(err => res.status(500).json({ error: "I'm sorry. Chad I can't post that."}))
  }
}

module.exports = router;
