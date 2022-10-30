const fetch = require("node-fetch");
const translate = require('@vitalets/google-translate-api');

async function getNameGroup(client, msg) {
    let id = await client.getGroupInviteLink(msg.chatId).then((result => {
        return result;
    }));
    id = await client.getGroupInfoFromInviteLink(id);
    return id.subject.replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '');
}

function country(indicativo) {
    console.log(indicativo);
    let strTemp = "+" + indicativo[0] + indicativo[1];
    switch (strTemp) {
        case "+34":
            return "Arriba España";
        case "+57":
            return "Colombia";
        case "+51":
            return "Peru";
        case "+52":
            return "Mexico";
        case "+54":
            return "Argentina";
        case "+55":
            return "Brasil";
        case "+56":
            return "Chile";
        case "+58":
            return "Venezuela";
        case "+53":
            return "Cuba";
    }

    strTemp = "+" + indicativo[0] + indicativo[1] + indicativo[2];
    switch (strTemp) {
        case "+502":
            return "Guatemala";
        case "+504":
            return "Honduras";
        case "+503":
            return "El salvador";
        case "+505":
            return "Nicaragua";
        case "+506":
            return "Costa Rica";
        case "+507":
            return "Panama";
        case "+351":
            return "Portugal";
        case "+500":
            return "Islas britanicas robadas de argentina";
        case "+594":
            return "Guayana Francesa";
        case "+591":
            return "Bolivia";
        case "+593":
            return "Ecuador";
        case "+595":
            return "Paraguay";
        case "+598":
            return "Uruguay";
    }

    strTemp = "+" + indicativo[0] + "-" + indicativo[1] + indicativo[2] + indicativo[3];
    switch (strTemp) {
        case "+1-787":
        case "+1-939":
            return "Puerto Rico";
        case "+1-809":
        case "+1-829":
        case "+1-849":
            return "Rep. Dominicana";
    }

    strTemp = "+" + indicativo[0];
    switch (strTemp) {
        case "+7":
            return "Rusia";
        case "+1":
            return "Norte America";
        default:
            return "Pais no registrado :c";
    }
}

async function getJoke() {
    let joke = await fetch('https://v2.jokeapi.dev/joke/Any?type=single').then(response => response.json()).then(async (data) => {
        return data.joke;
    });

    joke = await translate(joke, { from: 'en', to: 'es' }).then(async (res) => {
        return res.text;
    }).catch(err => {
        console.error(err);
    });

    return joke;
}

module.exports = {
    getNameGroup,
    country,
    getJoke,
};