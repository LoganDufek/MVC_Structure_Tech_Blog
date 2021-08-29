const router = require('express').Router();
const {Post, User, Comment} = require('../models');


router.get('/', (req, res) => { // Fine all of the posts
    Post.findAll({
        attributes: [
            'id', 'post_content', 'title', 'created_at',

        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }, {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(dbPostData => {
        const posts = dbPostData.map(post => post.get({plain: true}));
        // render the post objects into the homepage template
        res.render('homepage', {posts, loggedIn: req.session.loggedIn});
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Find a specific post
router.get('/posts/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id', 'post_content', 'title', 'created_at',

        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }, {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(dbPostData => {
        const post = dbPostData.get({plain: true});
        // render a single post on its own page
        res.render('single-post', {
            title: dbPostData.title,
            post_content: dbPostData.post_content,
            username: dbPostData.username,
            post,
            loggedIn: req.session.loggedIn
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Renders login page when navigating to it
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});


router.get('/newpost', (req, res) => {

    res.render('newpost', {loggedIn: req.session.loggedIn});

});


module.exports = router;
