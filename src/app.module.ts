import { Module } from '@nestjs/common';
import { SectorModule } from './modules/sector/sector.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { ClockinModule } from './modules/clockin/clockin.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SectorModule,
    EmployeeModule,
    ClockinModule,
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          port: 587,
          charset: 'utf-8',
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASS'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
