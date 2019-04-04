const { NODE_ENV, PORT } = process.env

export default {
  environment: NODE_ENV || 'development',
  port: PORT,
}
