import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, IsArray, ArrayNotEmpty, IsOptional, IsIn, Matches } from 'class-validator';

export class CreateHorarioDto {
  @ApiProperty({ description: 'Nombre del horario' })
  @IsString({ message: 'El nombre de horario debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El nombre de horario no puede estar vacío' })
  name: string;

  @ApiProperty({ description: 'Lugar del horario' })
  @IsString({ message: 'El lugar de partida debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El lugar de partida no puede estar vacío' })
  place: string;

  @ApiProperty({ description: 'Lugar del horario' })
  @IsString({ message: 'El lugar de llegada debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El lugar de llegada no puede estar vacío' })
  arrive: string;

  @ApiProperty({ description: 'Primera hora de salida (en formato HH:MM)' })
  @IsString({ message: 'La primera hora de salida debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'La primera hora de salida no puede estar vacía' })
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'La primera hora de salida debe estar en formato HH:MM',
  })
  firstOut: string;

  @ApiProperty({ description: 'Última hora de salida (en formato HH:MM)' })
  @IsString({ message: 'La última hora de salida debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'La última hora de salida no puede estar vacía' })
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'La última hora de salida debe estar en formato HH:MM',
  })
  lastOut: string;

  @ApiProperty({ description: 'Frecuencia en minutos' })
  @IsNumber({}, { message: 'La frecuencia debe ser un número' })
  @Min(1, { message: 'La frecuencia debe ser al menos 1 minuto' })
  frequency: number;

  @ApiProperty({ description: 'Unidad de tiempo (min o hrs)' })
  @IsString({ message: 'La unidad de tiempo debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'La unidad de tiempo no puede estar vacía' })
  @IsIn(['min', 'hrs'], { message: 'El campo debe ser min o hrs' })
  time: string;

  @ApiProperty({ description: 'Días de la semana' })
  @IsArray({ message: 'Los días deben ser un arreglo' })
  @IsString({ each: true, message: 'Cada día debe ser una cadena de caracteres' })
  days: string[];

  @ApiProperty({ description: 'Descripción del otro dia' })
  @IsString({ message: 'El otro día debe ser una cadena de caracteres' })
  @IsOptional()
  otherDay: string;
  
  @ApiProperty({ description: 'Descripción del horario' })
  @IsString({ message: 'La descripción debe ser una cadena de caracteres' })
  @IsOptional()
  description: string;

  @IsOptional()
  _id:string
  @IsOptional()
  delete: boolean
  @IsOptional()
  id: string
  @IsOptional()
  __v: string
}


