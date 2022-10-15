var cron = require('node-cron');

//const weekday = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

//const fecha = new Date();
//let dia = weekday[fecha.getDay()];
//let hora = fecha.getMinutes().toString();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const qrcode = require('qrcode-terminal');

const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const { GroupChat } = require('whatsapp-web.js/src/structures');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: 'C://Program Files (x86)//Google//Chrome//Application//chrome.exe',
    }
})

block = false;

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

async function introBot() {
    client.on('message_create', async msg => {
        let chat = await msg.getChat();

        if (msg.body === '!activate') {
            console.log('Activado');
            if (chat.isGroup) {
                chat.sendMessage('_*[ACTIVANDO PROTOCOLO EVA-02]*_');
                await sleep(2000);
                chat.sendMessage('■■■□□□□□□□□□□□□□ 5%');
                await sleep(2000);
                chat.sendMessage('■■■■■■■■■□□□□□□ 60%');
                await sleep(3000);
                chat.sendMessage('■■■■■■■■■■■□□□□ 80%');
                await sleep(4000);
                chat.sendMessage('■■■■■■■■■■■■■■■■■■ 100%');
                await sleep(3000);
                chat.sendMessage('*[PROTOCOLO ACTIVADO]*');
                await sleep(2000);
                chat.sendMessage('_*-Hola, ¿como estas? Soy Asu-*_');
                await sleep(2000);
                chat.sendMessage('_*Espera, no eres Ryoji. Olvidame*_');
                chat.sendMessage(await MessageMedia.fromUrl('https://i.gifer.com/Hhod.mp4'), { sendVideoAsGif: true });

                hora = Math.floor(Math.random() * 24);
                min = Math.floor(Math.random() * 60);

                cron.schedule(min + ' ' + hora + ' * * THU', async () => {
                    chat.sendMessage(await MessageMedia.fromUrl('https://i.imgur.com/EbdbYlU.mp4'), { sendVideoAsGif: true });
                    chat.sendMessage('_*¡FELIZ JUEVES!*_');
                    console.log('_*¡FELIZ JUEVES!*_');
                });
                cron.schedule('0 0 * * MON,TUE,WED,FRI', () => {
                    chat.sendMessage('_*-Aún no es jueves*_');
                });
                cron.schedule('0 0 * * SAT,SUN', () => {
                    chat.sendMessage('_*-Aún no es jueves, pero al menos es fin de semana*_');
                });

                console.log('El código se esta ejecutando correctamente');

            } else if (chat.isGroup === false && block === false) {
                client.sendMessage(msg.from, '_*¿Estás intentando usar esto fuera de un grupo? Baka...*_');
                block = true;
            } else if (chat.isGroup === false && block === true) {
                client.sendMessage(msg.from, '_*No puedes engañarme, soy mas inteligente que tu, recuerdalo.*_');
            }
        }

        if (block === false) {
            if (msg.body.indexOf('Asuka') > -1 || msg.body.indexOf('asuka') > -1) {
                console.log('He entrado a la condicion');
                chat.sendMessage('_*-La piloto (y mejor piloto) del EVA-02*_');
                chat.sendMessage(await MessageMedia.fromUrl('https://i.imgur.com/vXyRjBZ.mp4'), { sendVideoAsGif: true });
            }

            if (msg.body.indexOf('Rei') > -1 || msg.body.indexOf('rei') > -1) {
                console.log('He entrado a la condicion');
                chat.sendMessage('_*-Dios, no me hables de esa marioneta...*_');
                chat.sendMessage(await MessageMedia.fromUrl('https://i.imgur.com/Y7n1mFU.mp4'), { sendVideoAsGif: true });
            }

            if (msg.body.indexOf('Shinji') > -1 || msg.body.indexOf('shinji') > -1) {
                console.log('He entrado a la condicion');
                chat.sendMessage('_*-Baka...*_');
                chat.sendMessage(await MessageMedia.fromUrl('https://imgur.com/oYvIkpk.mp4'), { sendVideoAsGif: true },);
            }
        };
    });
};

client.initialize();

introBot();