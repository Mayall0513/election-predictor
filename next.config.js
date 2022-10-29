module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    URI: process.env.URI,
    API_URI: process.env.API_URI,
    DISCORD_API_URI: process.env.DISCORD_API_URI,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID
  }
}
