import pg from 'pg';
import configDB from "./configDB.js";
import getFemaleName from "./helpers/femaleNames.js";
import getMaleName from "./helpers/maleNames.js";
import getRandomIDs from "./helpers/getRandomIDs.js";

const {Pool} = pg;
const db = new Pool(configDB);

const NUMBER_OF_USERS = 200;
const MAX_SUBSCRIPTIONS = 150;

for (let i = 0; i < NUMBER_OF_USERS; i ++){
        if (Math.random()<0.5){
            await db.query(`INSERT INTO Users (first_name, gender) VALUES ('${getFemaleName()}', 'female')`)
        }else {
            await db.query(`INSERT INTO Users (first_name, gender) VALUES ('${getMaleName()}', 'male')`)
        }
    }

for (let i = 1; i < NUMBER_OF_USERS; i ++){
    if (Math.random()>0.05){
        const maxSubscriptions = Math.min(NUMBER_OF_USERS, MAX_SUBSCRIPTIONS)
        const subscribersCount = Math.floor(Math.random()*maxSubscriptions)
        getRandomIDs(subscribersCount, NUMBER_OF_USERS).forEach((ID)=>{
            db.query(`INSERT INTO subscriptions (userID, subscriberID) VALUES ('${i}', '${ID}')`)
        })
    }
}

