const authRole=(role)=>{

    return async(req,res,next)=>{

        if(req.user.role===role){
        
            return next();
        }
    
    
        res.status(400).json({
    
            success:false,
            message:'you are not authorized to do this'
        })
    } 
}
module.exports=authRole;