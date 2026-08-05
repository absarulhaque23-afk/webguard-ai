import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import { config } from './config/environment';
import { corsMiddleware } from './config/cors';
import { generalLimiter } from './middlewares/rateLimiter';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';
import { errorResponse } from './utils/responseHelper';

const app = express();

app.use(helmet());
app.use(corsMiddleware);
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());

if (config.NODE_ENV === 'production') {
  app.use(generalLimiter);
}

app.use('/api', routes);

app.use((req, res) => {
  errorResponse(res, 'Route not found', 404);
});

app.use(errorHandler);

export default app;
