module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    FRONTEND_URI: process.env.FRONTEND_URI,
    BACKEND_URI: process.env.BACKEND_URI,
    DISCORD_API_URI: process.env.DISCORD_API_URI,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID
  }
}
