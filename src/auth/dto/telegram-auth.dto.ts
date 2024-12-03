import {IsNotEmpty, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TelegramAuthDto {
    @ApiProperty({ description: 'Telegram initDataRaw string', example: 'query_id=...' })
    @IsString()
    @IsNotEmpty()
    initDataRaw: string;
}