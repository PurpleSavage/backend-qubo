import { SearchNearestLocationsDto } from "../dtos/user/search-nearest-locations.dto";
import { SharedLocationDto } from "../dtos/user/shared-location.dto";
import { PositionEntity } from "../entities/position.entity";

export abstract class UserRepository {
    abstract sharedLocation (sharedLocationDto:SharedLocationDto):Promise<PositionEntity>
    abstract searchNearestLocations(searchNearestLocationsDto:SearchNearestLocationsDto): Promise<PositionEntity[]> 
}