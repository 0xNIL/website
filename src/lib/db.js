const bluebird = require('bluebird')
const redis = require('redis')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

class Db {

  constructor() {
    try {
      this.redis = redis.createClient(6379, process.env.REDIS_PORT_6379_TCP_ADDR)
    } catch(e) {
    }
  }

  now() {
    return Math.floor(new Date() / 1000)
  }

}

module.exports = new Db

