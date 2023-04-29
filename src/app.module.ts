/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { ClientModule } from 'src/modules/client/client.module';
import { ProvinceModule } from 'src/shared/province/province.module';
import { GenderTypeModule } from 'src/shared/gender_type/gender_type.module';
import { DocumentTypeModule } from 'src/shared/document_type/document_type.module';
import { BookingModule } from 'src/modules/booking/booking.module';
import { PropertyModule } from 'src/modules/property/property.module';
import { PaymentModule } from 'src/modules/payment/payment.module';
import { PropertyTypeModule } from './shared/property_type/property_type.module';
import { PaymentTypeModule } from './shared/payment_type/payment_type.module';
import { BookingTypeModule } from './shared/booking_type/booking_type.module';
import { BookingOriginModule } from './shared/booking_origin/booking_origin.module';
import { AvailabilityStatusModule } from './shared/availability_status/availability_status.module';
import { ActivityStatusModule } from './shared/activity_status/activity_status.module';
import { PaymentStatusModule } from './shared/payment_status/payment_status.module';
import { ImageModule } from './shared/image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'agusdev',
      password: '123456',
      database: 'tesis',
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
    PropertyTypeModule,
    PaymentTypeModule,
    BookingTypeModule,
    BookingOriginModule,
    BookingModule,
    PropertyModule,
    AvailabilityStatusModule,
    ActivityStatusModule,
    PaymentModule,
    PaymentStatusModule,
    ImageModule,
  ],
})

export class AppModule {}
