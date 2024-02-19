
import {  DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
 
config();
 
const configService = new ConfigService();
 
export const dataSourceOptions: DataSourceOptions=({
  type: 'mysql',
  // host: configService.getOrThrow('MYSQL_HOST'),
  // port: configService.getOrThrow('MYSQL_TCP_PORT'),
  // username: configService.getOrThrow('MYSQL_USER'),
  // password: configService.getOrThrow('MYSQL_PASSWORD'),
  // database: configService.getOrThrow('mysql'),
  // entities: ['dist/**/*.entity.js'],
  // migrations: ['dist/config/migrations/*.js'],
  host: configService.getOrThrow('DB_HOST'),
  port: configService.getOrThrow('DB_PORT'),
  username: configService.getOrThrow('DB_USER'),
  password: configService.getOrThrow('DB_PASSWORD'),
  database: configService.getOrThrow('DB_DATABASE'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/config/migrations/*.js'],
  synchronize:false
});


const dataSource = new DataSource(dataSourceOptions)
export default dataSource;