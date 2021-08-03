const Product = require('../models/product')
const fs = require('fs')
exports.addProduct = (req, res, next) => {
    console.log(req.body);
    const product = new Product({
        name: req.body.name,
        price: req.body.prix,
        ref: req.body.reference,
        stock: req.body.stock,
        status: "en stock",
        ratingMoyenne: 0,
        createdByAdmin: true,
        category: req.body.category,
        marque: req.body.marque,
        //  collections:req.body.collections,
        artisant: req.body.artisant,
        topProduct: false,
        description: req.body.description,

        new: req.body.new,
        creationDate: Date.now()
    })
    if (req.body.remise != 'null') {
        product.remise = req.body.remise
    }

    if (req.files != undefined) {

        let tabImage = []
        req.files.forEach(element => {
            tabImage.push(element.path)
        });
        product.images = tabImage
    }

    product.save().then(product => {
        console.log(product);
        res.json(product)
    }).catch(error => {

        console.log(error);
        res.status(500).json({
            message: "failed to create a produuct"
        });
    })
}

exports.getAllProducts = (req, res, next) => {
    Product.find().populate('artisant category marque').exec()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Fetching list of products failed!"

            });
        });
};
exports.getProductById = (req, res, next) => {
    Product.findById(req.params.id).populate('artisant category marque collections').exec()
        .then(product => {
            res.status(200).json(product);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Fetching product failed!"

            });
        });
};
exports.deletProduct = (req, res, next) => {
    Product.findByIdAndDelete(req.params.id).exec()
        .then(product => {
            product.images.forEach(image => {
                fs.unlink(image, (err) => {
                    if (err) throw err;
                });
            })

            res.status(200).json({ message: "deleted" });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "failed to delete"
            });
        });
};
exports.updateProduct = async (req, res, next) => {
    console.log(req.files);
    console.log(req.body);

    oldImages = JSON.parse(req.body.oldImages)

    // req.body.oldImages.forEach(element => {
    //   console.log(element);

    // });
    let paths = [];
    if (oldImages.length > 0) {
        oldImages.forEach(element => {
            paths.push(element)
        });
    }
    if (req.files) {

        req.files.forEach(element => {
            paths.push(element.path)

        });

        console.log(paths);


        Product.findByIdAndUpdate(req.params.id, { images: paths }).then(
            () => {
                Product.findByIdAndUpdate(req.params.id, req.body).then(
                    () => {
                        res.status(200).json({
                            message: "updated"
                        });
                    }
                ).catch(error => {
                    console.log(error);

                    res.status(500).json({
                        message: "failed to delete"
                    });
                })
            }
        ).catch(error => {
            console.log(error);

            res.status(500).json({
                message: "failed to delete"
            });
        })

    }
}
exports.findProductByCategory = (req, res, next) => {
    Product.find({ category: req.params.idCategory }).then(products => {
        res.status(200).json(products)
    }).catch(err => {
        res.status(500).json({
            message: "no product found"
        })
    })
}
exports.UpdateRating = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.idUser, { $push: { rating: req.body } }).then(
        product => {

            let somme = 0
            product.rating.forEach((rating) => {
                somme += rating.rateNumber
            })
            somme += req.body.rateNumber

            product.ratingMoyenne = somme / (product.rating.length + 1)
            product.save().then(product => {
                res.status(200).json(product)
            })


        }
    ).catch(err => {
        res.status(500).json({
            message: "updated failed"
        })
    })
}
exports.calculMoyeneRating = (req, res, next) => {
    Product.findById(req.params.id).then(product => {
        product.rating.forEach(rating => {

        })
    })
}
exports.addToFavoris = (req, res, next) => {
    Product.findById(req.params.idUser).then(product => {
        product.topProduct = true
        product.save()
        res.json(product)
    }).catch(err => {
        res.json(err)
    })
}
exports.RemoveFromFavoris = (req, res, next) => {
    Product.findById(req.params.idUser).then(product => {
        product.topProduct = false
        product.save()
        res.json(product)
    }).catch(err => {
        res.json(err)
    })
}


exports.verifExistEmailOnReviews = (req, res, next) => {
    var emailStatus = false;
    Product.findById(req.params.id).then(

        product => {

            product.rating.forEach(rating => {

                if (rating.email == req.params.email) {
                    emailStatus = true

                }
            })

            console.log(emailStatus);
            res.status(200).json(emailStatus)
        },

    ).catch(err => {
        res.json(err)
    })
}