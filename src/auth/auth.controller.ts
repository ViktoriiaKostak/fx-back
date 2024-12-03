import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {TelegramAuthDto} from './dto/telegram-auth.dto';
import {ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('telegram')
    @ApiResponse({status: 200, description: 'User ${user.telegram_id} created'})
    @ApiResponse({status: 400, description: 'Invalid data'})
    @ApiResponse({status: 500, description: 'Internal server error'})
    async authenticateTelegram(@Body() body: TelegramAuthDto): Promise<string> {
        return await this.authService.processTelegramAuth(body);
    }
}