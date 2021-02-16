import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChangePasswordCommand } from './console-commands/changePasswordCommand';
import { UserCommand } from './console-commands/userCommands';
import { dbConfig } from './dbConfig';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([User]),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, UserCommand, ChangePasswordCommand],
})
export class AppModule {}
