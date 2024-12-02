import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CurrenciesService } from './currencies.service';

@Injectable()
export class CurrenciesTask {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    await this.currenciesService.updateCurrencies();
  }
}