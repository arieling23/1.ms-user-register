const amqp = require('amqplib');

let channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    channel = await connection.createChannel();

    
    await channel.assertExchange('user', 'topic', { durable: true });

    console.log('📡 Conectado a RabbitMQ y exchange "user" creado');
  } catch (error) {
    console.error('❌ Error conectando a RabbitMQ:', error);
  }
};

const publishEvent = async (routingKey, data) => {
  if (!channel) {
    console.error('⚠️ Canal RabbitMQ no disponible.');
    return;
  }

  const payload = Buffer.from(JSON.stringify(data));

 
  channel.publish('user', routingKey, payload, {
    persistent: true,
  });

  console.log(`📤 Evento publicado en exchange "user" con routing key "${routingKey}":`);
  console.log(JSON.stringify(data, null, 2));
};

module.exports = { connectRabbitMQ, publishEvent };
