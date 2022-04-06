import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { Posts, Register, registerSchema } from './auth.model';

@Injectable()
export class authService {
  constructor(
    @InjectModel('Register') private readonly authModel: Model<Register>,
  ) {}

  async insertUser(name:string, role:string, email: string, password: string) {
    console.log(name,email ,"server")
    const newRegister = new this.authModel({
      name,
      role,
      email,
      password,
      });

    const userExist =  await this.authModel.findOne({email:email});

    if (!role || !email || !password ||!name ) {
      return { error: "filled all the field" };   
    }
    else
    if (userExist) {
      return { error: "email already exist" };
    }

    else{
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      newRegister.password = await bcrypt.hash(newRegister.password, salt);
    const result = await newRegister.save();
   // console.log(result)
     return result; 
    }
  }

  async Login(email: string, password: string) {
    console.log('enter in login')
    const Registered = new this.authModel({
      email,
      password,
    });

    const userExist =  await this.authModel.findOne({email:email});
    if (!email || !password) {
      console.log(userExist)
      //console.log(userExist.role)
      return { error: "filled all the field" };   
    }
    if (userExist) {
      const match = await bcrypt.compare(password, userExist.password)

      if (!match) {
         return{ error: "Invalid detail" };
      } else {
        return{userExist,message: "Login succesfully" };
      }
    } else {
      return{ message: "Invalid detail" };
    }
  }

  // async findUser(email: string) {
    
  //   const user = await this.authModel.findOne({email:email});
  //   console.log(`username:${user}`)
  //   if (!user) {
  //     return ("user not found");
  //   }
  //   if (user) {
  //     return (`user return here :${user}`);
  //   }

  // }
 
  

  async postSave(email: string,posts: object) {
    console.log("posts",posts)

    const userExist =  await this.authModel.findOne({email:email});
    
    if (userExist) {
      console.log("user",userExist)
      //const match = await bcrypt.compare(password, userExist.password)
      const post = await this.authModel.findOneAndUpdate({email},{posts:[...userExist.posts,posts]})
      console.log("post",post) 
      const result= post.save()
      console.log("result",result)
        return{result,message: "add post",post };
      
    } else {
      return{ message: "Invalid data" };
    }
  }
  


  async proposalSave(email: string,proposals: object) {
    console.log(" get in proposals is here",proposals)

    const userExist =  await this.authModel.findOne({email:email});
    
    if (userExist) {
      //console.log("user",userExist)
      //const match = await bcrypt.compare(password, userExist.password)
      const post = await this.authModel.findOneAndUpdate({email},{proposals:[...userExist.proposals,proposals]})
     // console.log("proposals",post) 
      const result= post.save()
      console.log("resultProposals: ",result)
        return{result,message: "add prposals",post };
      
    } else {
      return{ message: "Invalid data" };
    }
  }
  

  async AcceptProposalSave(email: string,accepts: object) {
    console.log(" get in acceptproposals is here",accepts)
    console.log("email",email)

    const userExist =  await this.authModel.findOne({email:email});
    
    if (userExist) {
      console.log("user",userExist)
      //const match = await bcrypt.compare(password, userExist.password)
      const post = await this.authModel.findOneAndUpdate({email},{accepts:[...userExist.accepts,accepts]})
     // console.log("proposals",post) 
      const result= post.save()
      console.log("resultProposals: ",result)
        return{result,message: "add acceptprposals",post };
      
    } else {
      return{ message: "Invalid data" };
    }
  }

   
  async getPostSave(role: string) {
   role="student";

    const userExist =  await this.authModel.find({role:role});
    
    if (userExist) {
      console.log("user",userExist)
      //const match = await bcrypt.compare(password, userExist.password)
      const post = userExist;
      console.log("post",post) 
        return{post,message: "successfully get post" };
      
    } else {
      return{ message: "Invalid data" };
    }
  }

  async getAllUsers() {
    const products = await this.authModel.find().exec();
    return products.map(prod => ({
      id: prod.id,
      name: prod.name,
      email: prod.email,
      role: prod.role,
    }));
  }

  async getAllPost() {
    const allUser = await this.authModel.find().exec();
    //console.log(allUser)
    return allUser
  }



  async deleteData(email: string) {
    console.log('enter in delete')
    const Registered = new this.authModel({
      email,
    });

    const userExist =  await this.authModel.deleteOne({email:email});
    if (userExist.n === 0) {
      throw new NotFoundException('Could not find post.');
    }
  }


  
  async deletePost(id: string) {
    console.log('enter in deletepost')
    console.log(id)
     new this.authModel({
      id
    });

    const user =  await this.authModel.update({},{$pull:{"proposals":{"_id":id}}},{multi:true})
    console.log("end",user)


  }

  async deletePos(id: string) {
    console.log('enter in deletepost')
    console.log(id)
     new this.authModel({
      id
    });

    const user =  await this.authModel.update({},{$pull:{"posts":{"_id":id}}},{multi:true})
    console.log("end",user)


  }

  // async insertPost(email: string, posts: string) {
  //   console.log(email ,"server")
  //   const newRegister = new this.authModel({
  //     posts,
  //     });

  //   const userExist =  await this.authModel.findOne({email:email});

  //   if ( !userExist ) {
  //     return { error: "user not found" };   
  //   }
  //   else{
  //   const result = await newRegister.save();
  //   console.log(`save post ${result}`)
  //    return result; 
  //   }
  // }



  


//   async LoginUser(email: string, password: string) {
//     const newRegister = new this.authModel({
//       email,
//       password,
//     });

//     const userExist =  await this.authModel.findOne({email:email});
//     if (!userExist) {
//       return { error: "could not find user" };   
//     }
//     if (userExist) {
//       console.log(userExist); 
//       console.log("login get api")  
//       return userExist
      
//   } else {
//     ({ loggedIn: false });
//   }
// }
}
 
  // private async findProduct(id: string): Promise<Register> {
  //   let product;
  //   try {
  //       product = await this.authModel.findById(id).exec();
  //       console.log(product)
  //   } catch(error) {
  //       throw new NotFoundException('Could Not Find Product for error given ID.');
  //   }
  //   if (!product) {
  //       throw new NotFoundException('Could Not Find Product for !product given ID.');
  //   }
  //   return product;
  // }


  
