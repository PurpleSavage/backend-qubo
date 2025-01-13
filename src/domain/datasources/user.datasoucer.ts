import { SharedLocationDto } from "../dtos/user/shared-location.dto";
import { PositionEntity } from "../entities/position.entity";
import { SearchNearestLocationsDto } from "../dtos/user/search-nearest-locations.dto";
export abstract class UserDataSource {
    abstract sharedLocation (sharedLocationDto:SharedLocationDto):Promise<PositionEntity>
    abstract searchNearestLocations(searchNearestLocationsDto:SearchNearestLocationsDto): Promise<PositionEntity[]>
}
