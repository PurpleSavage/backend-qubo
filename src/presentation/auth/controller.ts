import { Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUser, RegisterUserDto } from "../../domain"
import { LoginUserDto } from "../../domain"
import { UserModel } from "../../data/mongodb"
import { LoginUser } from "../../domain"
import { VerifyUserDto } from "../../domain/dtos/auth/verify-user.dto"
import { VerifyUser } from "../../domain"
export class AuthController {
    constructor(
        private readonly authRepository:AuthRepository
    ){}

    private handlerError =(error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message})
        }
        console.log(error)
        res.status(500).json({error:'Internal Server error'})
    }

    registerUser=(req:Request,res:Response)=>{
        const [error,registerUserDto] =  RegisterUserDto.create(req.body)
        if(error) {
            return res.status(400).json({error})
        }
        new RegisterUser(this.authRepository)
        .execute(registerUserDto!)
        .then((data)=>res.json(data))
        .catch(error=>this.handlerError(error, res))
    }

    loginUser=(req:Request,res:Response)=>{
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if ( error ) return res.status(400).json({ error });
        new LoginUser(this.authRepository)
        .execute( loginUserDto! )
        .then( data => res.json(data) )
        .catch( error => this.handlerError(error, res) );

    }
    verifyEmail =(req:Request,res:Response)=>{
        const [error, verifyUserDto]=VerifyUserDto.create(req.body)
        if ( error ) return res.status(400).json({ error });
        new VerifyUser(this.authRepository)
        .execute(verifyUserDto!)
        .then( data => res.json(data) )
        .catch( error => this.handlerError(error, res) );
    }
    
    getUsers=(req:Request,res:Response)=>{
        UserModel.find()
        .then(users=>{
            res.json({
                user:req.body.user
            })
        })
        .catch(()=>res.status(500).json({error:'Internal sever error'}))
    }
} 