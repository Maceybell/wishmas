require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

let categories = {
  '1': 'For Him',
  '2': 'For Her',
  '3': 'For Teens',
  '4': 'For Kids',
  '5': 'Fur Them'
}

module.exports = {
    getGiftGuide: (req, res) => {
        let category = req.params.category
        console.log(categories[category])
        console.log('hit getGiftGuide')
        sequelize.query(`
            SELECT * FROM gifts WHERE category = '${categories[category]}'
        `) .then((dbRes) => {
          res.status(200).send(dbRes[0])
        }) .catch (err => console.log(err))
    },
    // getForHer: (req, res) => {
    //     //is this sequelize or axios??? 
    //     (`
    //         SELECT * FROM gifts WHERE category = "For Her"
    //     `) .then((dbRes) => {
    //       res.status(200).send(dbRes[0])
    //     }) .catch (err => console.log(err))
    // },
    // getForTeens: (req, res) => {
    //     //is this sequelize or axios??? 
    //     (`
    //         SELECT * FROM gifts WHERE category = "For Teens"
    //     `) .then((dbRes) => {
    //       res.status(200).send(dbRes[0])
    //     }) .catch (err => console.log(err))
    // },
    // getForKids: (req, res) => {
    //     //is this sequelize or axios??? 
    //     (`
    //         SELECT * FROM gifts WHERE category = "For Kids"
    //     `) .then((dbRes) => {
    //       res.status(200).send(dbRes[0])
    //     }) .catch (err => console.log(err))
    // },
    // getForFur: (req, res) => {
    //     //is this sequelize or axios??? 
    //     (`
    //         SELECT * FROM gifts WHERE category = "Fur Them"
    //     `) .then((dbRes) => {
    //       res.status(200).send(dbRes[0])
    //     }) .catch (err => console.log(err))
    // },

    
};
