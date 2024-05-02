const Redis = require('ioredis');

const redisClient = new Redis({
  host: 'lancify-redis-1',
  port: 6379
});

redisClient.on('connect', () => {
  console.log('Redis connected successfully!');
});

redisClient.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

module.exports = redisClient;