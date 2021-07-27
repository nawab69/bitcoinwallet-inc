import expressAsyncHandler from "express-async-handler";
import AdminWallet from "../models/AdminWallet.js";
import { encryptPrivateKey } from "../utils/encryption.js";

export const importAdminAccount = expressAsyncHandler(async (req, res) => {
  const { ethPrivateKey, ethAddress, bnbPrivateKey, bnbAddress, password } =
    req.body;
  const ethEncryptedPrivateKey = encryptPrivateKey(ethPrivateKey, password);
  const bnbEncryptedPrivateKey = encryptPrivateKey(bnbPrivateKey, password);
  let adminWallet = await AdminWallet.findOne({ uid: 1 });
  if (!adminWallet) {
    adminWallet = await AdminWallet.create({
      uid: 1,
    });
  }
  adminWallet.eth.privateKey = ethEncryptedPrivateKey;
  adminWallet.bnb.privateKey = bnbEncryptedPrivateKey;
  adminWallet.eth.address = ethAddress;
  adminWallet.bnb.address = bnbAddress;
  await adminWallet.save();
  res.send("Admin Wallet updated");
});
