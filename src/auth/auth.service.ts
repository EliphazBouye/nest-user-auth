import { Injectable, UnauthorizedException } from '@nestjs/common';
import assert from 'assert';
import { UsersService } from 'src/users/users.service';

type UserLoginInfo = {
  username: string,
  password: string,
}

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}  

  async signIn(userLoginInfo: UserLoginInfo): Promise<any> {
    assert(userLoginInfo.username, "Username should be define");
    assert(userLoginInfo.password, "Password should be define");

    try {
        const user = await this.usersService.user({
            username: userLoginInfo.username
        });
        if (user.password !== userLoginInfo.password ) {
            throw new UnauthorizedException()
        }
        const { password, ...result } = user;
        return result;
    } catch (err) {
	console.error(err);
    }
  }

}
