import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,

} from '@nestjs/common';
import { Posts } from './auth.model';

import { authService } from './auth.service';


@Controller('register')
export class authController {
  constructor(private readonly authService: authService) {}
 

  @Post()
  async addUser(
    @Body('name') authname:string,
    @Body('role') authrole :string,
    @Body('email') authEmail: string,
    @Body('password') authPassword: string,
     ) {
    
    const generatedId = await this.authService.insertUser(
      authname,
      authrole,
      authEmail,
      authPassword,
      );
    return { id: generatedId };
  }

  @Post("login")
  async loginUser(
    @Body('email') authEmail: string,
    @Body('password') authPassword: string,
  ) {
    const login = await this.authService.Login(
    authEmail,
    authPassword,  
    );
    return login
 
  }

  @Post("post")
  async getData(
    @Body('email') authEmail: string,
    @Body('posts') authPosts: object,
) {
       console.log("authEmail",authEmail)
       console.log("authPosts",authPosts)
  return await this.authService.postSave(
    authEmail,
    authPosts
    );
    
}


@Post("proposals")
async getProposal(
  @Body('email') authEmail: string,
  @Body('proposals') authProposal: object,
) {
     console.log("authEmail",authEmail)
     console.log("authProposal",authProposal)
const generateId= await this.authService.proposalSave(
  authEmail,
  authProposal
  );
  return {_id:generateId}

}

@Post("accepts")
async getAcceptProposal(
  @Body('email') authEmail: string,
  @Body('accepts') authAccepts: object,
) {
     console.log("authEmail",authEmail)
     console.log("accepts",authAccepts)
const generateId= await this.authService.AcceptProposalSave(
  authEmail,
  authAccepts
  );
  return {_id:generateId}

}


@Get("allusers")
async getAllUsers() {
  const users = await this.authService.getAllUsers();
  return users;
}


@Get("users")
async getAllPost() {
  const users = await this.authService.getAllPost();
  return users;
}







@Post("delete")
async deleteUser(
  @Body('email') authEmail: string,
) {
  
  console.log(authEmail)
   await this.authService.deleteData(
  authEmail,
  );
  return null

}



@Post("deletepost")
async deletePosts(
  @Body('id') authid: string,
) {
  
  console.log("constroler console detail",authid)
  await this.authService.deletePost(
  authid,
  );
  return null

}


@Post("deleteposted")
async deletePoss(
  @Body('id') authid: string,
) {
  
  console.log("constroler console detail",authid)
  await this.authService.deletePos(
  authid,
  );
  return null

}

  // @Post("post")
  // async addPosts(
  //   @Body('email') authEmail: string,
  //   @Body('posts') authPosts: string,
  //    ) {
    
  //   const userD = await this.authService.insertPost(
  //     authEmail,
  //     authPosts
  //     );
  //     return authPosts
  // }

  // @Get(":id")
  // getProduct(@Param('id') prodId: string) {
  //   return this.productsService.getSingleProduct(prodId);
  // }

  // @Post("login")
  // async logindata(
  //   @Body('email') authEmail: string,
  //   @Body('password') authPassword: string,
  // ) {
  //   const login = await this.authService.LoginUser(
  //   authEmail,
  //   authPassword,  
  //   );
  //   return login
 
  // }

  // {
    
  //   const generatedId = await this.authService.Login(
  //     authName,
  //     authEmail,
  //   );
  //   return { id: generatedId };
  // }
}

