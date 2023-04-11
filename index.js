const ip = require('ip')
const { Kafka, logLevel } = require('kafkajs')

const host = "pkc-3w22w.us-central1.gcp.confluent.cloud";

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`${host}:9092`],
  clientId: 'Lconsumer',
  ssl: {
    rejectUnauthorized: true
  },
  sasl: {
    mechanism: 'plain',
    username: 'LBQI5FO4NTSQKS4Y',
    password: 'XxWYNcND/JEIUWIWEjv7B5jnPU0fIs/hBUPi0N19VLe7C2ulql7Oo3HWxaw6ziBY',
  },
})

const topic = 'topic_vehicles'
const partitions = [...Array(6).keys()]
const offset = 0

const consumer = kafka.consumer({ groupId: 'test-group1' })

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    // eachBatch: async ({ batch }) => {
      //   console.log(batch)
      // },
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
        console.log(`- ${prefix} ${message.key}#${message.value}`)
      },
    })

    partitions.forEach( p => { consumer.seek({ topic, partition : p, offset }) })
}

run().catch(e => console.error(` ${e.message}`, e))

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.forEach(type => {
  process.on(type, async e => {
    try {
      console.log(`process.on ${type}`)
      console.error(e)
      await consumer.disconnect()
      process.exit(0)
    } catch (_) {
      process.exit(1)
    }
  })
})

signalTraps.forEach(type => {
  process.once(type, async () => {
    try {
      await consumer.disconnect()
    } finally {
      process.kill(process.pid, type)
    }
  })
})