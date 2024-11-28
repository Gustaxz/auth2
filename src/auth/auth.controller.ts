import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator/token.decorator';
import { CredentialDto } from './dto/credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() credentialDto: CredentialDto) {
    return this.authService.login(credentialDto);
  }

  @Public()
  @Post('loginFaceID')
  loginFaceID(@Body() credentialDto: CredentialDto) {
    return this.authService.loginFaceID(credentialDto);
  }

  @Public()
  @Post('validate')
  validate(@Body() { code }: { code: string }) {
    return this.authService.validate(code);
  }
}
