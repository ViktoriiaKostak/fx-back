import {Module} from '@nestjs/common';
import {FetcherModule} from './fetcher/fetcher.module';
import {ScheduleModule} from '@nestjs/schedule';
import {ConfigModule} from '@nestjs/config';
import {PrismaModule} from './prisma/prisma.module';
import {RedisModule} from './core/redis/redis.module';
import {CurrenciesModule} from './currencies/currencies.module';
import {PrometheusModule} from '@willsoto/nestjs-prometheus';
import {EventBusModule} from './infrastructure/event-bus/event-bus.module';
import {NotificationsModule} from "./notifications/notifications.module";
import {MailModule} from "./mails/mail.module";
import {RulesModule} from "./rules/rules.module";
import {UsersModule} from "./users/user.module";
import {AuthModule} from "./auth/auth.module";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: 'src/.env',
        cache: true,
    }), AuthModule,
        PrometheusModule.register(), EventBusModule,
        FetcherModule, ScheduleModule.forRoot(), PrismaModule, RedisModule, CurrenciesModule, FetcherModule, NotificationsModule, MailModule, RulesModule, UsersModule],
})
export class AppModule {
}