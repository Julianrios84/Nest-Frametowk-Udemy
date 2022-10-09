import { Controller, Post, Body, Get, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Auth, GetUser, RawHeaders } from './decorators';
import { RoleProtected } from './decorators/role-protected.decorator';
import { CreateUserDto, LoginUserDto } from './dto/';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces/valid-roles.interface';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-auth-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User){
   return this.authService.checkAuthStatus(user) 
  }


  @Get('private')
  @UseGuards(AuthGuard())
  privateRoute(@GetUser() user: User, @GetUser('email') userEmail: string, @RawHeaders() rawHeaders: string[] ) {
    return {
      status: true,
      message: "Route private.",
      user,
      userEmail,
      rawHeaders
    }
  }

  @Get('private2')
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin, ValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      status: true,
      message: "Route private.",
      user,
    }
  }

  @Get('private3')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  privateRoute3(@GetUser() user: User) {
    return {
      status: true,
      message: "Route private.",
      user
    }
  }



}
