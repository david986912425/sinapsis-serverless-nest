import serverlessExpress from '@vendia/serverless-express';
import { APIGatewayProxyHandler, Handler } from 'aws-lambda';
import express from 'express';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { CampaignService } from './modules/campaigns/service/campaig.service';

let cachedServer: Handler;

const bootstrapServer = async (): Promise<Handler> => {
  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));
  app.enableCors();
  await app.init();
  return serverlessExpress({
    app: expressApp,
  });
};

export const handler: APIGatewayProxyHandler = async (
  event,
  context,
  callback,
) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return cachedServer(event, context, callback);
};

export const processPendingCampaigns = async () => {
  console.log('Procesando campañas pendientes...');
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const campaignService = appContext.get(CampaignService);

  await campaignService.processPendingCampaigns();

  await appContext.close();
};
