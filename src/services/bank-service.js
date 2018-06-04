"use strict";

const bankRepository = require("../repositories/bank-repository");
const subscriberService = require("./../services/subscriber-service");
const donatorsService = require("./../services/donators-service");
const webpush = require("web-push");
const keys = require("config").notification.keys;

const bankService = {};

bankService.getAll = async() => {
    let result =  await bankRepository.getAll();
    return result;
};

bankService.login = async() => {
    let result =  await bankRepository.login(email, password);
    return result;
};

bankService.create = async(bank) => {
    let result = await bankRepository.create(bank);
    return result;
};

bankService.sendPush = async(payload, bloods) => {
    let requestDonation = [];
    
    let getAll = await subscriberService.getAll();
    webpush.setVapidDetails(
        "mailto:hemoheroes@gmail.com",
        keys.public,
        keys.private
    );
    
    if (bloods.length > 0) {
        let users = await donatorsService.getAll();
        requestDonation = await users.filter(item => bloods.some(i => item.bloodType == i)).map(item => item.email);
        getAll = await getAll.filter(item => requestDonation.some(i => item.client == i));
    }
    
    await getAll.forEach(
        async item => {
            let tmp = item;
            delete tmp['client'];
            console.log(tmp)
            await webpush
            .sendNotification(tmp, payload)
            .catch(err => console.error(err));
        }
    );
    
};

module.exports = bankService;