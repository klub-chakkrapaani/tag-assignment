import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseConfigService } from './config.service';
import { TagsModule } from './tags/tags.module';
@Module({
  imports: [MongooseModule.forRootAsync({
    useClass : MongooseConfigService
  }),TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
