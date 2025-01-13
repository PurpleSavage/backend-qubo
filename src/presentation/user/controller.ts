import { CustomError, SearchNearestLocations, SearchNearestLocationsDto, SharedLocation, SharedLocationDto, UserRepository } from "../../domain"
import { Request, Response } from "express"


export class UserController{
    constructor(
        private readonly userRepository:UserRepository
    ){}
    private handlerError =(error:unknown,res:Response)=>{
        if(error instanceof CustomError){
                return res.status(error.statusCode).json({error:error.message})
        }
        console.log(error)
        res.status(500).json({error:'Internal Server error'})
    }

    sharedLocation=(req:Request,res:Response)=>{
        const [error,sharedLocationDto]=SharedLocationDto.create(req.body)
        if(error) {
            return res.status(400).json({error})
        }
       
        new SharedLocation(this.userRepository)
        .execute(sharedLocationDto!)
        .then(data => res.json(data) )
        .catch(error => this.handlerError(error, res) )

    }
    searchNEarestLocations=(req:Request,res:Response)=>{
        const [error,searchNearestLocationsDto]=SearchNearestLocationsDto.create(req.body)
        if(error) {
            return res.status(400).json({error})
        }

        new SearchNearestLocations(this.userRepository)
        .execute(searchNearestLocationsDto!)
        .then(data => res.json(data))
        .catch(error => this.handlerError(error, res))
    }
}