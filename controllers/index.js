const Post = require("../models/post.js");
const User = require("../models/user");
const cloudinary = require("cloudinary");
const passport = require("passport");


module.exports={
    
    // Get All Posts
    async getPosts(req, res, next){
        let posts = await Post.find({});
        res.render('index', {posts})
    },
    getAbout(req, res, next){
        res.render('about')  
    },
    
    // Get New post form
    newPost(req, res, next){
        res.render('new')
    },
    
    // Create New post
    async createPost(req, res, next){
        
        // add image 
        req.body.post.image = {
            url : req.file.secure_url,
            public_id : req.file.public_id
        };
        let post = await Post.create(req.body.post);
        res.redirect('/')
    },
  
    // Show Drawings
    async showPost(req, res, next){
        let posts = await Post.paginate({},
        { page: req.query.page || 1, 
        limit: 1 });
        posts.page = Number(posts.page)    
        res.render("show",{posts})
    },
    
    // Delete post
    async deletePost(req, res, next){
        let post = await Post.findById(req.params.id);
        // Delete image from cloudinary
        await cloudinary.v2.uploader.destroy(post.image.public_id);
        post.remove();
        res.redirect("/")
    },
    // GET Register 
    getRegister(req, res, next){
        res.render("register")
    },
    // GET login 
    getLogin(req, res, next){
        res.render("login")
    },
    
    // POST Register
    async postRegister(req, res, next){
        
        let user = await User.register(new User({username: req.body.username}), req.body.password);
        passport.authenticate("local")(req,res,function(){
        res.redirect("/")
        })
    },
    // POST Login
    async postLogin(req, res, next){
         passport.authenticate('local', { failureRedirect: '/login' , successRedirect : '/' })(req, res,next)
    },
    // GET logout
    getLogout(req, res, next){
        req.logout();
        res.redirect('/');
    }

}
