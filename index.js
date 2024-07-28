const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Asegúrate de que dotenv esté configurado correctamente

// Inicializa el cliente de Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Configura Express para mantener el servicio activo
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

const imageMap = {
  '.Ду': 'buenos_dias_ruso.png',
  '.おは': 'buenos_dias_japones.png',
  '.bod': 'buenos_dias_portugues.png',
  '.おや': 'buenas_noches_japones.png',
  '.Дн': 'buenas_noches_ruso.png',
  '.bno': 'buenas_noches_portugues.png',
  '.bn': 'buenas_noches_espanol.png',
  '.bd': 'buenos_dias_espanol.png', 
  '.gn': 'good_night_english.png',
  '.gm': 'good_morning_english.png'
};

client.on('messageCreate', message => {
  // Verifica si el mensaje comienza con un comando de la lista
  if (imageMap.hasOwnProperty(message.content)) {
    const imageName = imageMap[message.content];
    const imagePath = path.join(__dirname, 'images', imageName);

    // Verifica si el archivo de imagen existe
    if (fs.existsSync(imagePath)) {
      message.channel.send({ files: [imagePath] });
    } else {
      message.reply('Lo siento, no puedo encontrar la imagen solicitada.');
    }
  }
});

client.once('ready', () => {
  console.log(`Bot listo y conectado como ${client.user.tag}`);
});

client.login(process.env.TOKEN);
