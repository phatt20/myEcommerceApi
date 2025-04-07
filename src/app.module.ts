import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './modules/users/user.module';
import { User } from './modules/users/entity/user.entity';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          url: config.get('DB_URL'),
          synchronize: true,
          entities: [User],
        };
      },
    }),

    ScheduleModule.forRoot(),

    UserModule,

    AdminModule, //รองรับ cron job
  ],
  controllers: [AppController],
  providers: [AppService],
  // providers: [
  //   AppService,
  //   {
  //     provide: APP_FILTER,
  //     useClass: HttpExceptionFilter,
  //     errlogservice,
  //   },
  // ],
})
export class AppModule {}
