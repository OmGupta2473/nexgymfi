import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().default(3001),

  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  APP_URL: Joi.string().required(),

  FRONTEND_URL: Joi.string().required(),

  DATABASE_URL: Joi.string().optional().allow(''),
  DIRECT_URL: Joi.string().optional().allow(''),

  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().default('1h'),

  // Fixed: Refresh secrets are now strictly required for production safety
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
  
  JWT_QR_SECRET: Joi.string().optional().allow(''),

  REDIS_URL: Joi.string().optional().allow(''),
  INTERAKT_API_KEY: Joi.string().optional().allow(''),
  SENTRY_DSN: Joi.string().optional().allow(''),
}).unknown(true);
