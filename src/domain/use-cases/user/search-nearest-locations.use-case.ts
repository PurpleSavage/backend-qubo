import { SearchNearestLocationsDto } from "../../dtos/user/search-nearest-locations.dto";
import { PositionEntity } from "../../entities/position.entity";
import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories/user.repository";

interface SearchNearestLocationsUseCase {
    execute(searchNearestLocations:SearchNearestLocationsDto): Promise<PositionEntity[]>
}

export class SearchNearestLocations implements SearchNearestLocationsUseCase{
    constructor(
        private readonly userRepository:UserRepository
    ){}
    async execute(searchNearestLocations: SearchNearestLocationsDto): Promise<PositionEntity[]> {
        const nearestLocations = this.userRepository.searchNearestLocations(searchNearestLocations)
        if(!nearestLocations) throw CustomError.internalServer('A problem occurred while searching nearest locations.')

        return nearestLocations
    }
}