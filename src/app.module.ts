import { Module } from '@nestjs/common';
import { BookModule } from './modules/book/book.module';
import { GibiModule } from './modules/gibi/gibi.module';


@Module({
  imports: [BookModule, GibiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
