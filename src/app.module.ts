import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { ClientModule } from 'src/modules/client/client.module';
import { ProvinceModule } from 'src/shared/province/province.module';
import { GenderTypeModule } from 'src/shared/gender_type/gender_type.module';
import { DocumentTypeModule } from 'src/shared/document_type/document_type.module';
import { BookingModule } from "src/modules/booking/booking.module";
import { PropertyModule } from "src/modules/property/property.module";
import { PaymentModule } from "src/modules/payment/payment.module";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'chelsea',
      database: 'postgres',
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
    BookingModule,
    PropertyModule,
    PaymentModule
  ]
})

export class AppModule { }
