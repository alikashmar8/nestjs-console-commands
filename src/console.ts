// console.ts - entrypoint
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

const bootstrap = CommandFactory.run(
  AppModule
);
