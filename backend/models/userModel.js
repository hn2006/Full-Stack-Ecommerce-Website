const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const crypto=require('crypto');

const UserSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"please enter your name"],
        maxLength:[30,'cannot exceed more than 30 characters'],
        minLength:[5,'name cannot be shorter than 4 characters']
    },

    email:{

        type:String,
        required:[true,"please enter your email"],
        unique:true,
        validate:[validator.isEmail,"please enter a valid email"]
    },

    password:{

        type:String,
        required:[true,"password is required"],
        select:false,
        minLength:[6,'password cannot be less than 6 characters']
    },
    avatar:{     
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
    },
    role:{

        type:String,
        default:"user"
    },
    resertPasswordToken:String,
    resetTokenExpiration:Date

});


UserSchema.methods.getJwtToken=(user)=>{


    console.log(user._id);

    return jwt.sign({ name:"token",id:user._id},'HHASHJKDHSHKHDHSAHHKSAHKHDHDHASKHKHNBSB',{

        expiresIn:'7d'
    })
}

UserSchema.methods.getResetPasswordToken=(user)=>{
    

    const token=crypto.randomBytes(20).toString();

    console.log(token);


    const resetToken=crypto.createHash('sha256').update(token).digest('hex');

    user.resertPasswordToken = resetToken;

    user.resetTokenExpiration=Date.now()+5*60*1000;

    return resetToken;
}



module.exports=mongoose.model('User',UserSchema);