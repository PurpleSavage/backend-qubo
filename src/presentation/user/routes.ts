import { Router } from "express";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";
import { UserController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
export class UserRoutes{
    static get routes():Router{
        const router = Router()
        const userDataSource= new UserDatasourceImpl()
        const userRepository = new UserRepositoryImpl(userDataSource)
        const controller = new UserController(userRepository)


        router.post('/shared-location',AuthMiddleware.validateJWT,controller.sharedLocation) 
        router.post('/nearest-locations',AuthMiddleware.validateJWT,)
        return router
    }
}