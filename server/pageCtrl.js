const path = require("path")


module.exports = {
    home: (req, res) => {
        res.sendFile(path.join(__dirname,"../public/home.html"))
    },
    giftGuides: (req, res) => {
        res.sendFile(path.join(__dirname,"../public/gift-guides.html"))
    },
    giftGuidesJS: (req, res) => {
        res.sendFile(path.join(__dirname,"../public/gift-guides.js"))
    },
    myWishlists: (req, res) => {
        res.sendFile(path.join(__dirname,"../public/my-wishlist.html"))
    },
    myWishlistsJS: (req, res) => {
        res.sendFile(path.join(__dirname,"../public/my-wishlist.js"))
    },

    css: (req, res) => {
        res.sendFile(path.join(__dirname,"../public/styles.css"))
    },

    giftGenerator: (req, res) => {
        res.sendFile(path.join(__dirname,"../public/gift-generator.js" ))
    },
    main: (req, res) => {
        res.sendFile(path.join(__dirname,"../../main.js" ))
    },
}