import 'reflect-metadata';
import {NestFactory} from '@nestjs/core/nest-factory';
import {AppModule} from './app.module';
import {environments} from './core/environments';
import {DocumentBuilder} from '@nestjs/swagger/dist/document-builder';
import {SwaggerModule} from '@nestjs/swagger/dist/swagger-module';
import {json, urlencoded} from 'body-parser';
import {ValidationPipe} from '@nestjs/common/pipes/validation.pipe';
import logger from "banmedica-libs-logger";
import * as Transports from 'winston/lib/winston/transports/index';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    logger.configure({
        transports: [
            new Transports.Console({
                level: environments.LOG_LEVEL
            })
        ],
    });
    app.useLogger(logger);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    app.use(json({limit: '50mb'}));
    app.use(urlencoded({extended: true}));

    const options = new DocumentBuilder()
        .setTitle('Proyecto Base')
        .setDescription('API Proyecto Base')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    const server = await app.listen(environments.PORT, '0.0.0.0');
    server.setTimeout(environments.TIMEOUT);
}

bootstrap();
