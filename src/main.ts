import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './index.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Simfy Africa - Web Backend Assessment')
    .setDescription('A simple Music API to handle operations on Tracks and Playlists.')
    .setVersion('1.0')
    .addTag('v1')
    .build();

  options.schemes = ['https', 'http'];

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs/v1', app, document);

  /**
   * Security middleware
   */
  app.use(helmet());
  app.enableCors();

  /**
   * request logger
   */
  app.use(morgan('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3001;
  await app.listen(port, ()=>{
    console.log('application started at : ', port);
  });
}
bootstrap();
