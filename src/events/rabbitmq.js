
const amqp = require('amqplib');

let channel = null;
let connection = null;

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    channel = await connection.createChannel();
    console.log('📡 Conectado a RabbitMQ');
  } catch (error) {
    console.error('❌ Error al conectar a RabbitMQ:', error.message);
  }
}

function publishToQueue(queueName, message) {
  if (!channel) {
    console.error('⚠️ Canal RabbitMQ no inicializado');
    return;
  }
  channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true });
  console.log(`📤 Evento enviado a [${queueName}]:`, message);
}

module.exports = { connectRabbitMQ, publishToQueue };
