import { SharedLocationDto } from "../../dtos/user/shared-location.dto";
import { PositionEntity } from "../../entities/position.entity";
import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories/user.repository";


interface SharedLocationUseCase {
    execute( sharedLocationDto:SharedLocationDto): Promise<PositionEntity>
}

export class SharedLocation implements SharedLocationUseCase{
    constructor(
        private readonly userRepository : UserRepository
    ){}
    async execute(sharedLocationDto: SharedLocationDto): Promise<PositionEntity> {
       
        const position = await this.userRepository.sharedLocation(sharedLocationDto)
        if(!position) throw CustomError.internalServer('A problem occurred while registering your location.')
        return {
            id:position.id,
            userId:position.userId,
            email:position.email,
            reason: position.reason,
            coordinates:position.coordinates
        }
    }
}