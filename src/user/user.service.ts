import { HttpException, HttpStatus, Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileDto } from '../dto/profile.dto';
import { ProfileEntity } from '../entities/profile.entity';
import { UserEntity } from '../entities/user.entity';
import { SerializeUsers } from '../auth/serializer/users.serialize';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';


@Injectable()
export class UserService {
  constructor ( 
    @InjectRepository(UserEntity)
     private userRepo: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepo: Repository<ProfileEntity>,
    ){}
    
  

    async GetAllusers(){
      const Users = await this.userRepo.find()

      const serializeAllUsers = Users.map((users) => new SerializeUsers(users))
      
      return serializeAllUsers;
    }

    async getUser(@Req() req:Request){
     const users = req.user
     const name = users['userName']

      const user = await this.profileRepo.findOne({where:{userName: name}})
      if(!user){
        throw new UnauthorizedException('user not found')
      }
      return user;
    }



    async createProfile( payload: ProfileDto, @Req() req:Request){
      try{
        const user = req.user
        const id = user['userId']
        const findUser = await this.userRepo.findOne({where:{userId: id} });
   
       if (!findUser) {
         throw new UnauthorizedException('Invalid credentials');
       }
       
      //   const name = user['userName']
      // const repeatedName = await this.profileRepo.findOne({where:{userName: name}})

      // if(repeatedName){
      //   throw new UnauthorizedException('userName already exist')
      // }


       const profile = await this.profileRepo.create({...payload, user});
       findUser.profile = profile
      
       const savedprofile = await this.profileRepo.save(profile);
     
       return {
         message: 'Successfully created',
         result: savedprofile,
       };
      }catch(error){
        return 'profile has already been created, update profile to make changes'
      }
    
  
}


// ONE user to ONE profile
async updateprofile(payload: ProfileDto, @Req() req: Request) {
  const user = req.user;
  const userId = user['userId'];

  const finduser = await this.userRepo.findOne({ where: { userId }, relations: ['profile'] });

  if (!finduser) {
    throw new NotFoundException('User not found');
  }

  if (!finduser.profile) {
    throw new HttpException('no existing profile found, create a new profile', HttpStatus.NOT_FOUND)
    // const profile = await this.profileRepo.create({...payload, user});
    // return await this.profileRepo.save(profile)
  }
  
  const updateProfile = await this.profileRepo
    .createQueryBuilder()
    .update(ProfileEntity) 
    .where('user_id = :userId', { userId }) 
    .set(payload)
    .execute();

  if (updateProfile.affected === 0) {
    throw new NotFoundException('Profile not found or not updated');
  }

  const updatedProfile = updateProfile; 

  console.log(updatedProfile);

  return {
    success: true,
    message: 'Successfully updated profile',
    updatedProfile,
  };
}
 


  }
