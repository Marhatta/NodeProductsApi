module.exports = function(req,res,next) {
    //auth middleware sets req.user

    if(!req.user.isSuperAdmin) return res.status(403).send('Access Denied');
    next();
}