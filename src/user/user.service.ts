import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileDto } from 'src/auth/dto/profile.dto';
import { UpdateProfileDto } from 'src/auth/dto/update-profile.dto';
import { ProfileEntity } from 'src/auth/entities/profile.entity';
import { UserEntity } from 'src/auth/entities/user.entity';
import { SerializeUsers } from 'src/auth/serializer/users.serialize';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor ( 
    @InjectRepository(UserEntity)
     private userRepo: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepo: Repository<ProfileEntity>,
    ){}
    
  

  async createProfile(payload:ProfileDto){
      const createUser = await this.profileRepo.save(payload)
      return createUser;
  }



  async updateProfile(id:string, payload:UpdateProfileDto){
    const update = await this.profileRepo.update(id, payload)
  }



  findOne(id: number) {
    return `This action returns a #${id} user`;
  }



  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
