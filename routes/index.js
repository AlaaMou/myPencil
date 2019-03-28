const express = require('express');
const router = express.Router();
const {cloudinary, storage} = require("../cloudinary")
const multer  = require('multer');
const upload     = multer({ storage});
const {isLoggedIn, isAdmin} = require("../middlewares");

const {getPosts, newPost, createPost, showPost, deletePost, getAbout, getRegister, getLogin, postRegister, postLogin, getLogout} = require("../controllers");


/* GET home page. */
router.get('/', getPosts);

/* GET About page. */
router.get('/about', getAbout);

/* GET new post form. */
router.get('/new', isLoggedIn, isAdmin, newPost);

/* Post new post . */
router.post('/', isLoggedIn, isAdmin, upload.single('image'), createPost);

/* Get show post . */
router.get('/drawings', showPost);

/* DELETE post . */
router.delete('/drawings/:id', isLoggedIn, isAdmin, deletePost);

/* GET Register */
router.get('/register', getRegister);

/* GET Login */
router.get('/login', getLogin);

/* POST Register */
router.post('/register', postRegister);

/* POST Login */
router.post("/login", postLogin )

/* GET Logout */
router.get("/logout", getLogout )


module.exports = router;
