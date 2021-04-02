
import cryptojs from 'crypto-js';

const secretKey = "tanpeo1998"

const hash = (text) => {
    return cryptojs.SHA256(text, secretKey).toString();
};

const verify = (text, hashed) => {
    return hashed === hash(text);
};

module.exports = {
    hash,
    verify
};