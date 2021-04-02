require("dotenv").config();

module.exports = {
    mongo: {
        url: process.env.MONGO_URL
    },
    redis:{
        url: 'a'
    }
}