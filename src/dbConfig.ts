import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const dbConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    database: 'userCommander',
    host: 'localhost',
    username: 'postgres',
    password: 'password',
    port: 5432,
    synchronize: true,
    entities : ['dist/**/*.entity{.ts,.js}']
}