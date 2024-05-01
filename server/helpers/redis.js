const { createClient } = require('ioredis');

const redisClient = createClient({
  password: 'jrjX6eNOOEP9Rrb8q6Kzc1ycy0MqSETj',
  host: 'redis-16793.c62.us-east-1-4.ec2.redns.redis-cloud.com',
  port: 16793
});

redisClient.on('connect', () => {
  console.log('Redis connected successfully!');
  redisClient.flushall((err) => {
    if (err) {
      console.error('Error flushing Redis database:', err);
    } else {
      console.log('Flushed the Redis database!');
    }
  })
});

redisClient.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

console.log('Flushed the redis database!')

module.exports = redisClient;