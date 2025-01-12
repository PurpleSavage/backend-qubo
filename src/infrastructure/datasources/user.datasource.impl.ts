import { PositionModel } from "../../data/mongodb";
import { CustomError, SharedLocationDto, UserDataSource } from "../../domain";
import { PositionEntity } from "../../domain";
import { PositionMapper } from "../mappers/position.mapper";


export class UserDatasourceImpl implements UserDataSource{
    async sharedLocation(sharedLocationDto: SharedLocationDto): Promise<PositionEntity> {
        const {reason,coordinates,email,userId}=sharedLocationDto
    
        try {
            const userPositionExist = await PositionModel.findOne({userId:userId})
            if(userPositionExist) throw CustomError.badRequest('Your location has already been recorded.')
            const position = await PositionModel.create({
                userId,
                email,
                reason,
                coordinates
            })
            await position.save()
            return PositionMapper.positionEntityFromObject(position)
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer()
        }
    }
}