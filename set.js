const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ05SdWZsR3BicisyQk1hU3lBL0Q0QWttT3ZsWmE0Rk5FakhldVNTNEszQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicDJWeFRsK0liN2Y3b0c4b0E1di95NlFNTks2aUFIc2V5UHd3ZzhQdGcxMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPUHFpZGdzV2MrenRTMWlRZVJQbDhvTXFNOWtCb3R5RldhNnVnUkNKajNrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJINGRabG0vOWRyWmQ5QzNhK3VwRWJycHFpcmFZbjhwN3lLQ1NVM2E2cW5BPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllGUmxoQmV6aDRCNmprWWdEL0o5aTV4bXh1MHpSM1NtN1RrUzd6ZTlOMlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InMwejhOSE1MYk1jUTF1QzFaVDgwOGYzUjd6ZERYQTJhQlJMbGV2L1Y2ajQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU5jbVRmTHpYZS9DRzJSRnBrRVJaU2I0OEJDbEF4TWxlSzhtZzlyYnVrYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV2tlTlJXVU0rdndWdjhEMVNvMDBITG82TDM5NHhHeGw5enY4R0lyTW5YQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBSSi9aZnhjYkE1VTRmM1dOWGFKR05XZEFVL0lpekdwaVB5NzFZam43VUVpQW40elpZbnNIeHIxL1dSTTFxL2lTc0tnUGMyM0dlZzFMZUdvVVVGcWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAxLCJhZHZTZWNyZXRLZXkiOiJvSlRmLy9hK2hDQk5ONUU1TzBGNlYzbGVjM1lweVAxS0VXbXJGK29BbmVRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJUR3ltMWlERlFkeU9VS2JrM1gzQlBnIiwicGhvbmVJZCI6ImU3YjkyMGNhLTZlOWQtNGVkYi1hZTNjLTM2YjAwMTYwMzczZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuUFJiUGxkMEd0ODZrTGpncGZDZVVKNDFaMEE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZWRIWE80N3VWekYvWThDaFdabVladVI4V0tvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlFFM1QxUjhCIiwibWUiOnsiaWQiOiIyNjM3MTc2NzIwNjg6MThAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2XuPCdn67wnZ+18J2XvfCdl7/wnZe88J2XuvCdl67wnZiFIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNWE5zL1lDRU5manJMVUdHQWtnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ3YWIwaUFqRGZlZ1dCZ2JLNVpkS2NHVWpVY28vaEcyWm9rYkJtampHeURZPSIsImFjY291bnRTaWduYXR1cmUiOiJNdFM5dzRTdWtLVUhuLzNkMkxhdmRIV1FqRHQ5Z2twUjhTL0o2cXJ1Q0JQRHdnaTR0QThrMi8rNk1WRXh5eUFBWTZ1VGhGRHlBZ0l2d3phUk5BZnNCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoianVzc0NPdnVVeTY0Ui9nZkIvQ1dObW5qU0pWZnV2V0dLdVhJbEQ4TXZqd0RLT1Jvc1RDdTdqZHQvZ1hIcVhIbWkvTXhpM1ZOdmxYa3RpVjNocmd6aFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3MTc2NzIwNjg6MThAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY0dtOUlnSXczM29GZ1lHeXVXWFNuQmxJMUhLUDRSdG1hSkd3Wm80eHNnMiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjQ5NTQ2MX0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "keithkeizzah",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
