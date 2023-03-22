import { IsNotEmpty, IsString, IsNumber, Length, IsEmail, IsBoolean, IsOptional } from 'class-validator';
import { Province } from 'src/shared/province/province.entity';
import { GenderType } from 'src/shared/gender_type/gender_type.entity';
import { DocumentType } from 'src/shared/document_type/document_type.entity';

export class CreateClientDto {

    @IsNotEmpty()
    @IsString()
    @Length(3, 60)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 60)
    last_name: string;

    @IsNotEmpty()
    @IsNumber()
    gender_type: GenderType;

    @IsNotEmpty()
    @IsString()
    @Length(10, 20)
    phone_number: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 20)
    document_number: string;

    @IsNotEmpty()
    @IsNumber()
    document_type: DocumentType;

    @IsNotEmpty()
    @IsBoolean()
    is_foreign: boolean;

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    province?: Province;
}
