import crypto from "crypto"
const SECRET = "DAOCAOREN";

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex')