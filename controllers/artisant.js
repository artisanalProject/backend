const Artisant = require("../models/artisant");
const Admin = require("../models/admin");
const Product = require("../models/product");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var crypto = require("crypto");
var algorithm = "aes-256-ctr";
var password = "d6F3Efeq";
const sendAccessEmail = require("../middlewares/mail");

function encrypt(text) {
  var cipher = crypto.createCipher(algorithm, password);
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

function decrypt(text) {
  var decipher = crypto.createDecipher(algorithm, password);
  var dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

exports.createArtisant = (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, data) => {
    if (err) {
      res.status(401).json({
        message: "forbiden",
      });
    } else {
      Artisant.findOne({ email: req.body.email }, function (err, doc) {
        if (doc != null) res.json("account already exist");
        else {
          const artisant = new Artisant({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: encrypt(req.body.password),
            address: req.body.address,
            storeName: req.body.storeName,
            typeOfWork: req.body.typeOfWork,
            codePostale: req.body.codePostal,
            cin: req.body.cin,
            creationDate: Date.now(),
            accountStatus: "activated",
          });
          artisant
            .save()
            .then(async (artisant) => {
              await sendAccessEmail.sendAccessEmail(
                artisant.email,
                decrypt(artisant.password)
              );
              res.json(artisant);
            })
            .catch((err) => {
              res.json(err);
              console.log(err);
            });
        }
      });
    }
  });
};

exports.addArtisant = (req, res, next) => {
  Artisant.findOne({ email: req.body.email }, function (err, doc) {
    if (doc != null) res.json("account already exist");
    else {
      const artisant = new Artisant({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: encrypt(req.body.password),
        address: req.body.address,
        storeName: req.body.storeName,
        typeOfWork: req.body.typeOfWork,
        codePostale: req.body.codePostal,
        cin: req.body.cin,
        creationDate: Date.now(),
        accountStatus: "not activated",
      });
      artisant
        .save()
        .then((artisant) => {
          res.json(artisant);
        })
        .catch((err) => {
          res.json(err);
          console.log(err);
        });
    }
  });
};

exports.loginArtisan = (req, res, next) => {
  Artisant.findOne({ email: req.body.email }, function (err, doc) {
    if (doc != null) {
      if (decrypt(doc.password) == req.body.password) {
        const token = jwt.sign(
          {
            email: doc.email,
            userId: doc._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        const {
          body: { user },
        } = req;

        if (doc.accountStatus == "not activated") {
          return res.status(200).json("not activated");
        } else {
          return res.status(200).json({
            artisan: doc,
            token: token,
          });
        }
      } else {
        return res.json("verify email or password");
      }
    } else {
      return res.json("verify email or password");
    }
  });
};

exports.activateAccount = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_KEY, async (err, data) => {
    if (err) {
      res.status(401).json({
        message: "forbiden",
      });
    } else {
      const artisan = await Artisant.findByIdAndUpdate(req.params.id, {
        accountStatus: "activated",
      });
      // Step 1

      let transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
          user: process.env.EMAIL || "mokhleshaj@gmail.com", // TODO: your gmail account
          pass: process.env.PASSWORD || "Mokhles 07212", // TODO: your gmail password
        },
      });

      // Step 2
      let mailOptions = {
        from: "mokhleshaj@gmail.com", // TODO: email sender
        to: artisan.email, // TODO: email receiver
        subject: "Activation compte Art & shop",
        text:
          "M/Mme " +
          artisan.name +
          " Votre compte est activé de la part de l'admin avec succès. Vous pouvez maintenat accèder à votre espace et admirer la navigation dans notre plateform. Pour plus d'informations n'hésitez pas de nous contacter via ce num ....",
      };

      // Step 3
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log(err);
          res.json(err);
        } else {
          console.log("Email sent!");
          res.json("Email sent!");
        }
      });
    }
  });
};

exports.NotActivatedAccounts = (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_KEY, async (err, data) => {
    if (err) {
      res.status(401).json({
        message: "forbiden",
      });
    } else {
      Artisant.find({ accountStatus: "not activated" })
        .exec()
        .then((docs) => {
          res.status(200).json(docs);
        });
    }
  });
};
exports.RequestProduct = (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_KEY, async (err, data) => {
    if (err) {
      res.status(401).json({
        message: "forbiden",
      });
    } else {
      const product = new Product({
        name: req.body.name,
        price: req.body.prix,
        ref: req.body.reference,
        stock: req.body.stock,
        status: "Requested",
        createdByAdmin: false,
        category: req.body.category,
        marque: req.body.marque,
        artisant: req.body.artisan,
        topProduct: false,
        description: req.body.description,
        remise: req.body.remise,
        creationDate: Date.now(),
      });
      if (req.files != undefined) {
        let tabImage = [];
        req.files.forEach((element) => {
          tabImage.push(element.path);
        });
        product.images = tabImage;
      }

      product
        .save()
        .then((product) => {
          console.log(product);
          res.json(product);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            message: "failed to create a produuct",
          });
        });
    }
  });
};
exports.getArtisant = (req, res, next) => {
  Artisant.find()
    .then((artisant) => {
      res.status(200).json(artisant);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Fetching list of artisant failed!",
      });
    });
};

exports.updateProfile = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_KEY, async (err, data) => {
    if (err) {
      res.status(401).json({
        message: "forbiden",
      });
    } else {
      if (req.body.role == "artisan")
        var user = await Artisant.findByIdAndUpdate(
          req.body.user._id,
          req.body.user,
          { new: true }
        );
      else
        var user = await Admin.findByIdAndUpdate(
          req.body.user._id,
          req.body.user,
          { new: true }
        );
      res.json(user);
    }
  });
};

exports.deleteAccount = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_KEY, async (err, data) => {
    if (err) {
      res.status(401).json({
        message: "forbiden",
      });
    } else {
      await Artisant.findByIdAndDelete(req.params.id);
      res.json("deleted");
    }
  });
};
exports.changePassword = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_KEY, async (err, data) => {
    if (err) {
      res.status(401).json({
        message: "forbiden",
      });
    } else {
      req.body.user.password = encrypt(req.body.user.password);
      console.log(req.body);
      if (req.body.role == "artisan")
        var user = await Artisant.findByIdAndUpdate(
          req.body.user._id,
          req.body.user,
          { new: true }
        );
      else
        var user = await Admin.findByIdAndUpdate(
          req.body.user._id,
          req.body.user,
          { new: true }
        );
      res.json(user);
    }
  });
};

exports.nbArtisansPerMonth = async (req, res, next) => {
  const allArtisans = await Artisant.find();
  var nb1 = 0;
  var nb2 = 0;
  var nb3 = 0;
  var nb4 = 0;
  var nb5 = 0;
  var nb6 = 0;
  var nb7 = 0;
  var nb8 = 0;
  var nb9 = 0;
  var nb10 = 0;
  var nb11 = 0;
  var nb12 = 0;

  allArtisans.forEach((element) => {
    const month = new Date(element.creationDate).getMonth() + 1;
    switch (month) {
      case 1:
        nb1++;
        break;
      case 2:
        nb2++;
        break;
      case 3:
        nb3++;
        break;
      case 4:
        nb4++;
        break;
      case 5:
        nb5++;
        break;
      case 6:
        nb6++;
        break;
      case 7:
        nb7++;
        break;
      case 8:
        nb8++;
        break;
      case 9:
        nb9++;
        break;
      case 10:
        nb10++;
        break;
      case 11:
        nb11++;
        break;
      case 12:
        nb12++;
        break;

      default:
        break;
    }
  });
  var result = [
    { month: 1, nb: nb1 },
    { month: 2, nb: nb2 },
    { month: 3, nb: nb3 },
    { month: 4, nb: nb4 },
    { month: 5, nb: nb5 },
    { month: 6, nb: nb6 },
    { month: 7, nb: nb7 },
    { month: 8, nb: nb8 },
    { month: 9, nb: nb9 },
    { month: 10, nb: nb10 },
    { month: 11, nb: nb11 },
    { month: 12, nb: nb12 },
  ];
  res.json(result);
};
