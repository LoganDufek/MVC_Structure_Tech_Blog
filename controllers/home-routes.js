const router = require('express').Router();
const sequelize = require('../config/connection');
// const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
 
  console.log(req.session);
 
    res.render('homepage', {
    loggedIn: req.session.loggedIn });
    })

router.get('/login', (req, res) => {
 
  console.log(req.session);
 
    res.render('login', {
    loggedIn: req.session.loggedIn });
    })
   

module.exports = router;