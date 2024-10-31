import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialDto } from './dto/credential.dto';
import { Public } from './decorator/token.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() credentialDto: CredentialDto) {
    return this.authService.login(credentialDto);
  }

  @Public()
  @Post('validate')
  validate(@Body() { code }: { code: string }) {
    return this.authService.validate(code);
  }
}
