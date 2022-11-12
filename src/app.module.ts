import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { ClientModule } from 'src/modules/client/client.module';
import { ProvinceModule } from 'src/shared/province/province.module';
import { GenderTypeModule } from 'src/shared/gender_type/gender_type.module';
import { DocumentTypeModule } from 'src/shared/document_type/document_type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      logging: false,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ClientModule,
    ProvinceModule,
    GenderTypeModule,
    DocumentTypeModule,
  ]
})

export class AppModule { }
