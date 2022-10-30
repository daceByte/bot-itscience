const botMethods = require('./main');
const indexBaseData = require('./IndexBaseData');

module.exports = async function indexNotifications(client, notify) {
    if (notify.subtype == "add" || notify.subtype == "invite") {
        let rta = await indexBaseData.verifyReportComunity(client, notify);
        if (rta == false
            && indexBaseData.verifyGroup(await botMethods.getNameGroup(client, notify))) {
            client.sendText(notify.recipients[0], 'Hola bienvenido a la comunidad ITCScience.org 👾\nPor favor lea la descripción de cada grupo antes de participar.\n\nNo ayudamos a solucionar problemas con su pc.\n\nNo ayudamos a solucionar problemas con software que no sean de su creación.\n\nNo somos delincuentes, así que no colaboramos en actividades ilegales. 🧐\n\nhttps://chat.whatsapp.com/EtQk9oMhecp1aFt3akPaOA\n\nSi necesita contactarse con el administrador o necesita un trabajo pagado, contáctese con Duck.\nhttps://wa.link/pey6js');
        }
        let data = await client.getContact(notify.recipients[0]);
        let temp = await indexBaseData.registerUser(client, notify, data);
        console.log("Registro de nuevo usuario: " + temp.result);
    } else if (notify.subtype == "leave"
        || notify.subtype == "leave") {
        let data = await client.getContact(notify.recipients[0]);
        let temp = await indexBaseData.deleteUser(client, notify, data);
        console.log("Registro de eliminacion de un usuario: " + temp.result);
    }
}