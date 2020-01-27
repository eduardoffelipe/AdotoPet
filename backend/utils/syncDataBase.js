String.prototype.replaceAll = function(search, replacement) {
    const target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

const env = process.env.NODE_ENV || "development";
const models = require(`${process.cwd()}/models`);
const config = require(`${process.cwd()}/config/config.json`)[env];

if(env.toUpperCase() != "development".toUpperCase()){
    config.dummy = process.env[config.dummy_env];
}


module.exports = async function SequelizePostgresSyncDataBase(){
    console.log("============ Syncing DataBase Timezone ============");
    await models.sequelize.query(`set timezone TO '${process.env.TZ}';`,{
        type: models.sequelize.QueryTypes.SELECT
    });
    console.log("============ Synced DataBase ============");
}
