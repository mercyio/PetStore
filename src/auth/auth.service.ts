import { BadRequestException, Body, ExecutionContext, HttpException, HttpStatus, Injectable, NotFoundException, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from '../dto/order.dto';
import { createPetsDto } from '../dto/pet-dto/create-pet.dto';
import { ProfileDto } from '../dto/profile.dto';
import { SignupDto } from '../dto/signup.dto';
import { PetEntity } from '../entities/pets.entity';
import { ProfileEntity } from '../entities/profile.entity';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { SerializeUsers } from './serializer/users.serialize';
import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import { reviewDto } from 'src/dto/review.dto';
import { ReviewEntity } from 'src/entities/review.entity';
import { OrderEntity } from 'src/entities/order.entity';



// import { generate } from 'rxjs';

@Injectable()
export class AuthService {

  constructor ( 
    @InjectRepository(UserEntity)
     private userRepo: Repository<UserEntity>,

     @InjectRepository(ProfileEntity)
     private profileRepo: Repository<ProfileEntity>,

     @InjectRepository(PetEntity)
     private petRepo: Repository<PetEntity>,

     
     @InjectRepository(OrderEntity)
     private orderRepo: Repository<OrderEntity>,

     @InjectRepository(ReviewEntity)
     private reviewRepo: Repository<ReviewEntity>,

     private jwtService :JwtService,
    ){}

    async signup(payload: SignupDto) {
      payload.Email=payload.Email.toLowerCase()

      const {Email, Password, ...rest}=payload
      
      const userEmail= await this.userRepo.findOne({where:{Email:Email}})

      if(userEmail){
        throw new HttpException('EMAIL ALREADY EXIST', 400)
      }
      
      // const repeatedName = await this.userRepo.findOne({where:{userName}})

      // if(repeatedName){
      //   throw new UnauthorizedException('userName already exist')
      // }

      const saltOrRounds = 10;

      const hashedPassword = await bcrypt.hash(Password, saltOrRounds);
      try{
        const user = await this.userRepo.save({...payload, Password: hashedPassword});
        await this.userRepo.save(user);
        delete user.Password;
        return user;
      }
      catch(err){
        if(err.code === '22P02'){
          throw new BadRequestException('ADMIN ROLE SHOULD BE LOWERCASE')
        }
        return err
      }   
    }
  


    async login(Email:string, Password:string, @Req()req:Request, @Res()res:Response) {

      const findUser = await this.userRepo.findOne({where : {Email}});
     
      if(!findUser){
        throw new UnauthorizedException('INVALID CREDENTIALS')
      }
  
      // console.log(comparePassword)
  
      const comparePassword = await bcrypt.compare(Password,findUser.Password)
  
      if(comparePassword !== true){
        throw new UnauthorizedException("invalid credential")
      }
  
        const payload = {
        userId: findUser.userId,
        // Username: findUser.userName,
        Email: findUser.Email,
        Password: findUser.Password,
        Role: findUser.role
      };
      

      const Token = await this.jwtService.sign(payload)

     res.cookie('isAuthenticated',Token,{
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000
   });

   return res.send ({
      success: true,
      message:`USER SUCCESSFULLY LOGGED-IN`,
      accessToken:Token
       })
     }



     async logout(@Req()req:Request, @Res()res:Response){
      const clearCookie = res.clearCookie('isAuthenticated')
       const response = res.send(`user sucessfully logedout`)
       return{
         clearCookie,
         response
      }
     }


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


    async getUserbyId(@Req() req:Request){
      const users = req.user
      const userId = users['userId']
 
       const user = await this.userRepo.findOne({where:{userId}})
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
 


// ONE user to MANY pets
async petOwned (payload: createPetsDto, @Req() req:Request){
   const user = req.user
   const userId = user['userId']

   const findUser = await this.userRepo.findOne({where:{userId}, relations: ['pet']})
   if(!findUser){
    throw new NotFoundException('user not found')
   }

  // if (!findUser.profile) {
  //   throw new HttpException('no existing profile found, create a new profile', HttpStatus.NOT_FOUND)
  // }

   const ownedpets = await this.petRepo.create({...payload, user})
   const pets = []
   const savePet = await this. petRepo.save(ownedpets)
   pets.push(savePet)

   return {
    message: 'sucessful',
    pets
   }

}


// MANY pet to MANY orders
async petsOrder (payload: OrderDto, @Req() req:Request){
  // try{
  const pet = req.user
  const userId = pet['userId']

  const findUser = await this.userRepo.findOne({where:{userId}, relations: ['pet']})
  // console.log(findUser);
  
  if(!findUser){
   throw new NotFoundException('user not found')
  }

  if(!findUser.pet){
   throw new HttpException('null', HttpStatus.NOT_FOUND)
  }
  console.log(findUser.pet);
  
  const createOrder = await this.orderRepo.create({...payload, pet})
  const orders = []
  const saveOrder = await this. orderRepo.save(createOrder)
  orders.push(saveOrder)
  console.log(orders);
  
  
  // return {
  //  message: 'sucessful',
  //  orders
  // }
  // }
  // catch(error){
  //   return error
  // }

// }

}

// ONE pet to Many REVIEW
async review(id: string,payload: reviewDto, @Req() req: Request, ) {
  const user = req.user;
  const userId = user['userId'];

  const findUser = await this.userRepo.findOne({
    where: { userId },
    relations: ['pet'],
  });

  if (!findUser ) {
    throw new HttpException('User or associated pet not found', HttpStatus.NOT_FOUND);
  }
  const findpet = await this.petRepo.findOne({where:{id}})
  const pet = findpet
  // const pet = user
  const newReview = this.reviewRepo.create({...payload, pet});
  const reviews = []
  const savedReview = await this.reviewRepo.save(newReview);
  // reviews.push(savedReview)
  // return {
  //   message: 'Successful',
  //   review: savedReview,
  // };
  return savedReview
}


}
    // async updateProfile(userName:string, payload:UpdateProfileDto){
    //   const findProfile = await this.userRepo.findOne({where:{userName}})
    //   if(!findProfile){
    //     throw new UnauthorizedException('invalid profile')
    //   }
    //   const update = await this.userRepo
    //   .createQueryBuilder()
    //   .update(ProfileEntity)
    //   .where('userName = :userName', {userName})
    //   .set(payload)
    //   .execute();

    //   return {
    //     success: true,
    //     message: 'Successfully updated profile',
    //   };
    // }
    
    

  // async login (Email:string, Password: string, @Req() req:Request, @Res() res:Response) {
    
  //   const findUser = await this.UserEntity.findOne({where : {Email}});

  //   if(!findUser){
  //     throw new UnauthorizedException('EMAIL NOT FOUND')
  //   }

  //   const comparePassword = await bcrypt.compare(Password,findUser.Password)

  //   if(comparePassword !== true){
  //     throw new UnauthorizedException("INVALID PASSWORD")
  //   }

  //     const payload = {
  //     userId: findUser.userId,
  //     Username: findUser.username,
  //     Email: findUser.Email,
  //     Password: findUser.Password,
  //     PhoneNumber:findUser.PhoneNumber,
  //     Role: findUser.role
  //   };

  //   const Token = await this.jwtService.signAsync(payload)

  //   res.cookie('isAuthenticated',Token,{
  //     httpOnly: true,
  //     maxAge: 1 * 60 * 60 * 1000
  //   });

  //   return {
  //     success:true,
  //     accessToken:Token
  //     }
  //   }
    
  //   async user(Email:string){
  //     const locateUser = await this.UserEntity.findOne({where:{Email}})
  //     return locateUser
  //   }



    // async logout(@Req()req:Request, @Res()res:Response){
    //   const clearCookie = res.clearCookie('isAuthenticated')
    //   const response = res.send(`user sucessfully logedout`)
    //   return{
    //     clearCookie,
    //     response
    //   }
    // }
    

