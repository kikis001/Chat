import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventosModule } from './eventos/eventos.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [EventosModule, DatabaseModule, ConfigModule.forRoot({
    envFilePath:enviroments[process.env.NODE_ENV] || '.env',
    load: [config],
    isGlobal: true
  }), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule {}
