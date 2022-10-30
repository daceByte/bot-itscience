const wppconnect = require('@wppconnect-team/wppconnect');
const botFunctions = require('./bot/index');
const indexNotifications = require('./bot/indexNotifications');

wppconnect
    .create({
        session: 'ITCScience',
        onLoadingScreen: (percent, message) => {
            console.log('CARGA DE PANTALLA', percent, message);
        },
    })
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });

function start(client) {
    console.log('Iniciando Bot...');

    client.onNotificationMessage(async (notify) => {
        await indexNotifications(client, notify);
    });

    client.onMessage(async (msg) => {
        try {
            await botFunctions(client, msg);
        } catch (e) {
            console.log(e);
        }
    });
}