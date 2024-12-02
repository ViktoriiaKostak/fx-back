import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class TelegramNotifyService {
  private readonly logger = new Logger(TelegramNotifyService.name);
  private readonly token: string;
  private readonly chatId: string;

  constructor(private readonly configService: ConfigService) {
    this.token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID');
  }


  async sendMessage(message: string, parseMode: 'Markdown' | 'HTML' = 'Markdown'): Promise<void> {
    try {
      const response = await axios.get(
          `https://api.telegram.org/bot${this.token}/sendMessage`,
          {
            params: {
              chat_id: this.chatId,
              text: message,
              parse_mode: parseMode,
              disable_notification: false,
            },
          },
      );
      this.logger.log('Telegram message sent successfully:', response.data);
    } catch (error) {
      this.logger.error('Error sending message to Telegram:', error.stack);
    }
  }
}