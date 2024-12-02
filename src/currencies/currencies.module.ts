import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { PrismaModule } from '../prisma/prisma.module';
import {CurrenciesTask} from "./currencies-task.service";

@Module({
  imports: [PrismaModule],
  providers: [CurrenciesService, CurrenciesTask],
  controllers: [CurrenciesController],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
