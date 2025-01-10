import { PositionEntity, SharedLocationDto, UserDataSource, UserRepository } from "../../domain";

export class UserRepositoryImpl implements UserRepository{
    constructor(private readonly userDataSource: UserDataSource){}
    sharedLocation(sharedLocationDto: SharedLocationDto): Promise<PositionEntity> {
        return this.userDataSource.sharedLocation(sharedLocationDto)
    }
}