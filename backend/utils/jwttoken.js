const sendJwtToken=(user,statusCode,res)=>{

    const token=user.getJwtToken(user);

    const options={

        expiresIn:new Date(Date.now+7*24*60*60*1000),

        httpOnly:true
    }

    res.status(statusCode).cookie('token',token,options).json({


        success:true,
        user,
        token
    })
}

module.exports=sendJwtToken;