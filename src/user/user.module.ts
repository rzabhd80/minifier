import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../../libs/models';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(entities)],
  controllers: [UserController],
  providers: [null],
})
export class UserModule {}
