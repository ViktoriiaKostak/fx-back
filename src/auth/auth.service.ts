import {Injectable, BadRequestException, InternalServerErrorException, Inject} from '@nestjs/common';
import {InitData, parse, validate} from '@telegram-apps/init-data-node';
import {TelegramAuthDto} from "./dto/telegram-auth.dto";
import {UserService} from "../users/user.service";

@Injectable()
export class AuthService {
    private readonly telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

    constructor(private readonly userService: UserService) {
    }

    async processTelegramAuth(initDataDto: TelegramAuthDto): Promise<string> {
        const initData = await this.validateTelegramData(initDataDto.initDataRaw);

        const user = await this.userService.findUserOrCreate(
            initData,
        );
        return `User ${user.telegram_id} created`;
    }

    private validateTelegramData(initDataRaw: string): any {
        try {
            validate(initDataRaw, this.telegramBotToken);
            return parse(initDataRaw);
        } catch (error) {
            console.error('Error validating Telegram data:', error);
            throw new Error('Failed to validate Telegram data');
        }
    }
}