import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('add-email')
    @ApiResponse({ status: 200, description: 'Email added to user successfully' })
    @ApiResponse({ status: 400, description: 'Invalid data' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async addEmailToUser(@Body('telegramId') telegramId: number, @Body('email') email: string) {
        return await this.userService.addEmailToUser(telegramId, email);
    }
}