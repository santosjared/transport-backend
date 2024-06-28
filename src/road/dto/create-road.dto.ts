import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsString, IsNumber, IsBoolean, ValidateNested, ArrayNotEmpty, IsOptional, IsNotEmpty } from "class-validator";

class RouteDto {
  @ApiProperty({ description: 'Lugar de la parada' })
  @IsString({ message: 'El lugar de la parada debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El lugar de la parada no puede estar vacío' })
  place: string;

  @ApiProperty({ description: 'Indica si es una parada' })
  @IsBoolean({ message: 'El valor de parada debe ser un booleano' })
  parada: boolean;
}

export class CreateRoadDto {
  @ApiProperty({ description: 'GeoJSON del ruta' })
  @IsOptional()
  geojson: any;

  @ApiProperty({ description: 'Centro del mapa' })
  @IsArray({ message: 'El centro debe ser un arreglo de números' })
  @ArrayNotEmpty({ message: 'El centro no puede estar vacío' })
  @IsNumber({}, { each: true, message: 'Cada valor del centro debe ser un número' })
  center: number[];

  @ApiProperty({ description: 'Nivel de zoom del mapa' })
  @IsNumber({}, { message: 'El nivel de zoom debe ser un número' })
  zoom: number;

  @ApiProperty({ description: 'Nombre de la ruta' })
  @IsString({ message: 'El nombre de la ruta debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El nombre de la ruta no puede estar vacío' })
  name: string;

  @ApiProperty({ description: 'Estado del camino' })
  @IsBoolean({ message: 'El estado de la ruta debe ser un booleano' })
  @IsOptional()
  status: boolean;

  @ApiProperty({ description: 'Lista de rutas' })
  @IsArray({ message: 'Las rutas deben ser un arreglo' })
  routes: string[];
}
