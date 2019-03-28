module.exports = {
    
    isLoggedIn : function(req, res, next){
        if(req.isAuthenticated()) return next()
        return res.redirect('/')
    },
    
    isAdmin : function(req, res, next){
    if(req.user && req.user._id.equals(process.env.ADMIN_PASSWORD)){
        return next();
        }else{
        return res.redirect("/")
        }
    }
    
    
}