import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from '../users/user.module';

@Module({
    imports: [
        forwardRef(() => UsersModule),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
    ],
    exports: [AuthService,],
})
export class AuthModule {
}