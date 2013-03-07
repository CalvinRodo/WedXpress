Configuring WedXpress
=====================

Add the following Environment Variables to your system to configure WedXpress

In order to handle payments for Registry Items you need a an Account with Stripe. 
(Please note it's only available in the US and Canada right now with a UK beta being rolled out now.)

**StripePublicKey** is stored in the Environment Variable *StripePublicKey*

**StripePrivateKey** is stored in the Environment Variable *StripePrivateKey*

**AdminUsername** is stored in the Environment Variable *WedXpressUName* it defaults to **username**

**AdminPassword** is stored in the Environment Variable *WedXpressPWord* it defaults to **password**

**MongoDbConnection** is stored in the Environment Variable *MongoConnection* it defaults to **mongodb://localhost:27017/db**

In order to make file uploads as easy as possible WedXPress uses Amazon's S3, to configure it you need to 
point to your instance of S3, you should be able to get away with a free account unless you have a humongous wedding party. 

**AWSAccessKeyID** is stored in the Environment Variable *AWSPublicAccessKey*

**AWSAccessKeySecret** is stored in the Environment Variable *AWSSecretAccessKey*
