import crypto from "crypto";

export const encryptPrivateKey = (privateKey, password) => {
  const key = crypto.createHash("md5").update(password).digest("hex");
  const iv = Buffer.from(key, "hex");
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(privateKey, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decryptPrivateKey = (encryptedPrivateKey, password) => {
  try{
    const key = crypto.createHash("md5").update(password).digest("hex");
    const iv = Buffer.from(key, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedPrivateKey, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
  }catch(e){
    throw Error('Invalid Password');
  }
  
};


