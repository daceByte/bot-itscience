const fetch = require("node-fetch");
const botMethods = require('./main');

async function registerUser(client, msg, jsonR) {
    delete jsonR.profilePicThumbObj;
    jsonR = JSON.stringify(jsonR);
    let response = await fetch('http://localhost/Apibotitscience/user/?option=reg&group=' + (await botMethods.getNameGroup(client, msg)).toUpperCase() + '&data=' + jsonR).then(response => response.json()).then(async (data) => {
        return data;
    });

    return response;
}

async function addCount(client, msg) {
    let jsonR = await client.getContact(msg.author);
    delete jsonR.profilePicThumbObj;
    jsonR = JSON.stringify(jsonR);
    let response = await fetch('http://localhost/Apibotitscience/user/?option=add&group=' + (await botMethods.getNameGroup(client, msg)).toUpperCase() + '&data=' + jsonR).then(response => response.json()).then(async (data) => {
        return data;
    });

    return response;
}

async function deleteUser(client, msg, jsonR) {
    delete jsonR.profilePicThumbObj;
    jsonR = JSON.stringify(jsonR);
    let response = await fetch('http://localhost/Apibotitscience/user/?option=del&group=' + (await botMethods.getNameGroup(client, msg)).toUpperCase() + '&data=' + jsonR).then(response => response.json()).then(async (data) => {
        return data;
    });

    return response;
}

async function getCounts(client, msg) {
    let jsonR = await client.getContact(msg.author);
    delete jsonR.profilePicThumbObj;
    jsonR = JSON.stringify(jsonR);
    let response = await fetch('http://localhost/Apibotitscience/user/?option=ver&data=' + jsonR).then(response => response.json()).then(async (data) => {
        return data;
    });

    return response.result;
}

async function verifyReportComunity(client, msg) {
    let jsonR = await client.getContact(msg.recipients[0]);
    delete jsonR.profilePicThumbObj;
    jsonR = JSON.stringify(jsonR);
    let response = await fetch('http://localhost/Apibotitscience/user/?option=ver&data=' + jsonR).then(response => response.json()).then(async (data) => {
        return data;
    });

    return response.peticion;
}

function verifyGroup(nameGroup) {
    if (nameGroup.toUpperCase().includes('PROGRAMADORES') || nameGroup.toUpperCase().includes('CIENCIAS') || nameGroup.toUpperCase().includes('RECURSOS')) {
        return true;
    }
    return false;
}

async function verifyWheel(client, msg) {
    let jsonR = await client.getContact(msg.author);
    //console.log(jsonR);
    delete jsonR.profilePicThumbObj;
    jsonR = JSON.stringify(jsonR);
    let response = await fetch('http://localhost/Apibotitscience/user/?option=wheel&data=' + jsonR).then(response => response.json()).then(async (data) => {
        return data;
    });

    return response.peticion;
}

async function verifyWheelTwo(client, msg) {
    let jsonR = await client.getContact(msg + "@c.us");
    //console.log(jsonR);
    delete jsonR.profilePicThumbObj;
    jsonR = JSON.stringify(jsonR);
    let response = await fetch('http://localhost/Apibotitscience/user/?option=wheel&data=' + jsonR).then(response => response.json()).then(async (data) => {
        return data;
    });

    return response.peticion;
}

async function getDataAllUsers() {
    let response = await fetch('http://localhost/Apibotitscience/user/?option=getall').then(response => response.json()).then(async (data) => {
        return data;
    });

    return response;
}

module.exports = {
    registerUser,
    addCount,
    deleteUser,
    getCounts,
    verifyReportComunity,
    verifyGroup,
    verifyWheel,
    getDataAllUsers,
    verifyWheelTwo,
};