import app from './app';
import { config } from './config/environment';
import { connectDB } from './config/database';
import { logger } from './utils/logger';
import { User, Role } from './models/User';

const startServer = async () => {
  try {
    console.log(config.MONGODB_URI);
    await connectDB();

    // Create default admin user if specified in environment
    if (config.ADMIN_EMAIL && config.ADMIN_PASSWORD) {
      const existingAdmin = await User.findOne({ email: config.ADMIN_EMAIL });
      if (!existingAdmin) {
        logger.info('Creating default admin user...');
        await User.create({
          name: 'Admin',
          email: config.ADMIN_EMAIL,
          password: config.ADMIN_PASSWORD,
          role: Role.ADMIN,
        });
        logger.info('Default admin user created.');
      }
    }

    const server = app.listen(config.PORT, () => {
      logger.info(`Server running in ${config.NODE_ENV} mode on port ${config.PORT}`);
    });

    process.on('unhandledRejection', (err: Error) => {
      logger.error('Unhandled Rejection! Shutting down...', err.message);
      server.close(() => {
        process.exit(1);
      });
    });

    process.on('uncaughtException', (err: Error) => {
      logger.error('Uncaught Exception! Shutting down...', err.message);
      process.exit(1);
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
