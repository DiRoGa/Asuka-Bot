var cron = require('node-cron');

// const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// const date = new Date();
// let day = weekday[date.getDay()];
// let minutes = date.getMinutes().toString();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const qrcode = require('qrcode-terminal');

const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const { GroupChat } = require('whatsapp-web.js/src/structures');

const client = new Client({
    authStrategy: new LocalAuth(),
})

let block = false;

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

async function introBot() {
    client.on('message_create', async msg => {
        let chat = await msg.getChat();

        option = Math.floor(Math.random() * 4);

        if (msg.body === '!activate') {
            console.log('Activated');
            if (chat.isGroup) {
                chat.sendMessage('_*[EVA-02 PROTOCOL ACTIVATION]*_');
                await sleep(3000);
                chat.sendMessage('*[PROTOCOL ACTIVATED]*');
                await sleep(4000);
                chat.sendMessage('_*-Hello, how are you? I am Asu-*_');
                await sleep(3000);
                chat.sendMessage('_*Wait, you are not Ryoji. Forget about me*_');
                chat.sendMessage(await MessageMedia.fromUrl('https://i.gifer.com/Hhod.mp4'), { sendVideoAsGif: true });

                hour = Math.floor(Math.random() * 24);
                min = Math.floor(Math.random() * 60);

                cron.schedule(min + ' ' + hour + ' * * THU', async () => {
                    chat.sendMessage(await MessageMedia.fromUrl('https://i.imgur.com/EbdbYlU.mp4'), { sendVideoAsGif: true });
                    chat.sendMessage('_*HAPPY THURSDAY!*_');
                    console.log('_*HAPPY THURSDAY!*_');
                });
                cron.schedule('0 0 * * MON,TUE,WED,FRI', () => {
                    chat.sendMessage('_*-It\'s not Thursday yet*_');
                });
                cron.schedule('0 0 * * SAT,SUN', () => {
                    chat.sendMessage('_*-It\'s not Thursday yet, but at least it\'s the weekend*_');
                });

                console.log('The code is executing correctly');

            } else {
                if (option === 1) {
                    client.sendMessage(msg.from, '_*Are you trying to use this outside of a group? Baka...*_');
                } else if (option === 2) {
                    client.sendMessage(msg.from, '_*You can\'t fool me: I am smarter than you, remember that.*_');
                } else if (option === 3) {
                    client.sendMessage(msg.from, '_*Someone is too lonely...*_');
                }
            }
        }

        if (msg.body.indexOf('Asuka') > -1 || msg.body.indexOf('asuka') > -1) {
            console.log('Entered Asuka condition');
            chat.sendMessage('_*The pilot (and better pilot) of EVA-02*_');
            chat.sendMessage(await MessageMedia.fromUrl('https://i.imgur.com/vXyRjBZ.mp4'), { sendVideoAsGif: true });
        }

        if (msg.body.indexOf('Rei') > -1 || msg.body.indexOf('rei') > -1) {
            console.log('Entered Rei condition');
            chat.sendMessage('_*God, don\'t talk to me about that puppet...*_');
            chat.sendMessage(await MessageMedia.fromUrl('https://i.imgur.com/Y7n1mFU.mp4'), { sendVideoAsGif: true });
        }

        if (msg.body.indexOf('Shinji') > -1 || msg.body.indexOf('shinji') > -1) {
            console.log('Entered Shinji condition');
            chat.sendMessage('_*Baka...*_');
            chat.sendMessage(await MessageMedia.fromUrl('https://imgur.com/oYvIkpk.mp4'), { sendVideoAsGif: true });
        }

        if (msg.body.indexOf('Misato') > -1 || msg.body.indexOf('misato') > -1) {
            console.log('Entered Misato condition');
            chat.sendMessage('_*Operations leader... as if she knows what she\'s doing*_');
            chat.sendMessage(await MessageMedia.fromUrl('https://i.imgur.com/vXyRjBZ.mp4'), { sendVideoAsGif: true });
        }
    });
};

client.initialize();

introBot();
