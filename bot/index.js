const botMethods = require('./main');
const indexBaseData = require('./IndexBaseData');

module.exports = async function botFunctions(client, msg) {

    if (msg.isGroupMsg) {

        await indexBaseData.addCount(client, msg);
        let fun = false;

        if ((await botMethods.getNameGroup(client, msg)).toUpperCase().includes("WHEEL")
            || (await botMethods.getNameGroup(client, msg)).toUpperCase().includes("FREE(DUCKS)")
            || (await indexBaseData.verifyWheel(client, msg))) {
            if (msg.body == ".m") {
                fun = true;
                client.reply(msg.from, '==== ItcSciencie BOT🦆 ====\n\n1=> .p => Pagina de la comunidad.\n2=> .v => Ver mi perfil.\n3=> .c =>Cuentame un chiste.\n4=> .a => Acerca del bot', msg.id.toString());
            } else if (msg.body == ".p") {
                fun = true;
                client.reply(msg.from, 'Visita nuestra pagina Web.\n=>http://itcscience.org/\nUnete a todos nuestros grupos.\n=>http://chat.whatsapp.com/EtQk9oMhecp1aFt3akPaOA', msg.id.toString());
            } else if (msg.body == ".v") {
                fun = true;
                client.sendMentioned(msg.from, '=== Perfil🦆 ===\nHola @' + msg.author.split('@')[0] + '\nNombre: ' + msg.notifyName + '\nPais: ' + (botMethods.country(msg.sender.id.split(' ')[0])) + "\nMensajes & Grupos:\n=>" + (await indexBaseData.getCounts(client, msg)), [msg.author.split('@')[0]]);
            } else if (msg.body == ".c") {
                fun = true;
                client.reply(msg.from, await botMethods.getJoke(), msg.id.toString());
            } else if (msg.body == ".a") {
                fun = true;
                client.reply(msg.from, "==== Acerca del BOT🦆 ====\n Hola, Soy SmallDuck🦆 el bot que ayuda a administrar la comunidad ITCScience.\nCreditos a los Admins.", msg.id.toString());
            }
        }

        if (!fun) {
            if ((msg.body).includes("!b ")
                && (await indexBaseData.verifyWheel(client, msg))) {
                if ((msg.body).split(' ')[0] == "!b") {
                    let data = await client.getContact((msg.body).split('@')[1] + "@c.us");
                    if (data.id.user != "573028353043"
                        && data.id.user != "56997438535"
                        && !(await indexBaseData.verifyWheelTwo(client, data.id.user))) {
                        await indexBaseData.deleteUser(client, msg, data);
                        client.removeParticipant(msg.chatId, (msg.body).split('@')[1] + "@c.us");
                    }
                }
            } else if (msg.body == ".all"
                && (await indexBaseData.verifyWheel(client, msg))) {
                let data = (await client.getGroupMembers(msg.chatId));
                let arTemp = [];
                let strTemp = '';
                data.forEach(element => {
                    arTemp.push(element.id.user);
                    strTemp += "@" + element.id.user + " ";
                });
                client.sendMentioned(msg.from, strTemp, arTemp);
            } else if ((msg.body).includes("!vall ")
                && (await indexBaseData.verifyWheel(client, msg))) {
                if ((msg.body).split(' ')[0] == "!vall") {
                    let data = await indexBaseData.getDataAllUsers((msg.body).split(' ')[1] == "!vall");
                    if (data.result) {
                        client.reply(msg.from, "Reporte de estadisticas enviado al correo...", msg.id.toString());
                    }
                }
            }
        }
    }
}