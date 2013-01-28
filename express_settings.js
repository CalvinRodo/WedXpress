exports.Config = {
  StripePublicKey: process.env.StripePublicKey,
  StripePrivateKey: process.env.StripePrivateKey,
  AdminUsername: process.env.WedXpressUName || 'username',
  AdminPassword: process.env.WedXpressPWord || 'password',
  MongoDbConnection: process.env.MongoConnection || 'mongodb://localhost:27017/db',
  HashIDSalt: process.env.HashIDSalt || 'Please replace with a salt'
};