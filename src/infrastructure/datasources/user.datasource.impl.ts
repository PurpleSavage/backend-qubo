import { PositionModel } from "../../data/mongodb";
import { CustomError, SearchNearestLocationsDto, SharedLocationDto, UserDataSource } from "../../domain";
import { PositionEntity } from "../../domain";
import { PositionMapper } from "../mappers/position.mapper";


export class UserDatasourceImpl implements UserDataSource{
    async sharedLocation(sharedLocationDto: SharedLocationDto): Promise<PositionEntity> {
        const {reason,coordinates,email,userId}=sharedLocationDto
    
        try {
            const userLocationExist = await PositionModel.findOne({userId:userId})
            if(userLocationExist) throw CustomError.badRequest('Your location has already been recorded.')
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
    async searchNearestLocations(searchNearestLocationsDto:SearchNearestLocationsDto): Promise<PositionEntity[]> {
        const {email,radiusDistance,coordinates} =searchNearestLocationsDto
        try {
            const nearestLocations = await PositionModel.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: "Point",  
                            coordinates: coordinates.coordinates, 
                        },
                        distanceField: "distance", 
                        maxDistance: radiusDistance,  
                        spherical: true,  // Asegura que la consulta use la distancia esférica
                    }
                },
                {
                    $match: { email: { $ne: email } }  //  para evitar que se incluya la ubicación del mismo usuario si ya está registrada
                },
            ]);
    
            return nearestLocations.map(location => PositionMapper.positionEntityFromObject(location));
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer()
        } 
    }
}