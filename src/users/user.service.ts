import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {InitData} from "@telegram-apps/init-data-node";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    try {
      console.log('findUserByEmailOrCreate:', email);
      let user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }
      return user;
    } catch (error) {
      console.error('Error in findUserByEmailOrCreate:', error);
      throw new Error(`Failed to find or create user: ${error.message}`);
    }
  }

  async findUserOrCreate(initData: InitData) {
    try {
      console.log('findUserOrCreate:', initData.user.id);

      const telegramId = BigInt(initData.user.id);

      let user = await this.prisma.user.findUnique({ where: { telegram_id: telegramId } });
      if (!user) {
        user = await this.prisma.user.create({
          data: {
            telegram_id: telegramId,
            email: 'unknown@example.com',
            first_name: initData.user.firstName ?? null,
            last_name: initData.user.lastName ?? null,
            photo_url: initData.user.photoUrl ?? null,
            username: initData.user.username ?? null,
            language_code: initData.user.languageCode ?? null,
            auth_date: initData.authDate ?? null,
          },
        });
      }
      return user;
    } catch (error) {
      console.error('Error in findUserOrCreate:', error);
      throw new Error(`Failed to find or create user: ${error.message}`);
    }
  }

  async addEmailToUser(telegramId: number, email: string) {
    try {
      const user = await this.prisma.user.update({
        where: { telegram_id: BigInt(telegramId) },
        data: { email },
      });
      return user;
    } catch (error) {
      console.error('Error in addEmailToUser:', error);
      throw new Error(`Failed to add email to user: ${error.message}`);
    }
  }

}
