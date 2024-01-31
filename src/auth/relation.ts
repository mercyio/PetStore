// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { UserEntity } from "./entities/user.entity";
// import { ProfileEntity } from "./entities/profile.entity";
// import { PetEntity } from "src/auth/entities/pets.entity";
// import { Repository } from "typeorm";
// import { userInfo } from "os";
// import { createPetsDto } from "src/Pets/pet-dto/create-pet.dto";
// import { ProfileDto } from "./dto/profile.dto";

// @Injectable()
// export class relation {
//     constructor(
//         @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
//         @InjectRepository(ProfileEntity) private profileRepo: Repository<ProfileEntity>,
//         @InjectRepository(PetEntity) private petRepo: Repository<PetEntity>,
//     ){}

// //    async seed(userId:string){
// //        const user =this.userRepo.create({userId})
// //        await this.userRepo.save(user) ;

// //        const profile = this.profileRepo.create({user})
// //        profile.user = user
// //        await this.profileRepo.save(profile)

// //        const pet = this.petRepo.create

       
// //     }
// async createProfile(userName: string, payload: ProfileDto){
//     const {firstname, lastname, ...rest} = payload

//      try {
//     const findUser = await this.userRepo.findOne({where:{userName} });

//     if (!findUser) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     const user = this.userRepo.create({userName });
//     const profile = await this.profileRepo.create({ firstname, lastname, });
//     user.profile = profile
//     await this. profileRepo.save(profile)
//     const savedUser = await this.userRepo.save(user);
  
//     return {
//       message: 'Successfully created',
//       result: savedUser,
//     };
//   } catch (error) {
//     throw new UnauthorizedException(`Failed to create profile`);
//   }
// }

// }