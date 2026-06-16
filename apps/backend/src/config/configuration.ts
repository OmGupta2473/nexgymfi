export default () => ({
  port: parseInt(
    process.env.PORT ?? '3001',
    10,
  ),

  nodeEnv:
    process.env.NODE_ENV ??
    'development',

  appUrl:
    process.env.APP_URL ??
    'http://localhost:3001',

  frontendUrl:
    process.env.FRONTEND_URL ??
    'http://localhost:3000',

  jwtAccessSecret:
    process.env.JWT_ACCESS_SECRET,

  jwtAccessExpiresIn:
    process.env.JWT_ACCESS_EXPIRES_IN,

  jwtRefreshSecret:
    process.env.JWT_REFRESH_SECRET,

  jwtRefreshExpiresIn:
    process.env.JWT_REFRESH_EXPIRES_IN,
});