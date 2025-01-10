import { SharedLocationDto } from "../dtos/user/shared-location.dto";
import { PositionEntity } from "../entities/position.entity";

export abstract class UserRepository {
    abstract sharedLocation (sharedLocationDto:SharedLocationDto):Promise<PositionEntity>
}