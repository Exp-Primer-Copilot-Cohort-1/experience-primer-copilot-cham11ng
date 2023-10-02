// Create web server
// 1. Get comments from database
// 2. Save comments to database
// 3. Delete comments from database

const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')

// Get comments from database
router.get('/comments', (req, res) => {
  Comment.find({}).sort({ createdAt: -1 }).exec((err, comments) => {
    if (err) {
      console.log(err)
    } else {
      res.json(comments)
    }
  })
})

// Save comments to database
router.post('/comments', (req, res) => {
  const comment = new Comment(req.body)

  comment.save((err, comment) => {
    if (err) {
      console.log(err)
    } else {
      res.json(comment)
    }
  })
})

// Delete comments from database
router.delete('/comments/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err, comment) => {
    if (err) {
      console.log(err)
    } else {
      res.json(comment)
    }
  })
})

module.exports = router
