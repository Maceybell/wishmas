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
  1: "For Him",
  2: "For Her",
  3: "For Teens",
  4: "For Kids",
  5: "Fur Them",
};

const dataSet = {};
console.log(dataSet);

module.exports = {
  getGiftGuide: (req, res) => {
    let category = req.params.category;
    sequelize
      .query(
        `
            SELECT * FROM gifts WHERE category = '${categories[category]}'
        `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
        if (!dataSet[category]) {
          dataSet.category = dbRes[0];
        }
        console.log(dataSet.category.length);
      })
      .catch((err) => console.log(err));
  },

  createGiftItem: (req, res) => {
    const { giftName, imgURL, price, description, webLink } = req.body;
    sequelize
      .query(
        `
        INSERT INTO gifts (gift_name, image_url, price, description, web_link)
        VALUES ('${giftName}', '${imgURL}', ${price}, '${description}', '${webLink}');

        INSERT INTO wishlist_items (item_id)
        SELECT gifts_id
        FROM gifts
        WHERE gift_name = '${giftName}' ORDER BY gifts_id DESC LIMIT 1;
        `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => console.log(err));
  },

  addWishItem: (req, res) => {
    const { id } = req.params;
    sequelize
      .query(
        `
          INSERT INTO wishlist_items (item_id)
          VALUES (${id})
        `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => console.log(err));
  },

  getWishItems: (req, res) => {
    sequelize.query(`
        SELECT * FROM gifts
        JOIN wishlist_items ON wishlist_items.item_id = gifts.gifts_id
    `).then((dbRes) => {
        res.status(200).send(dbRes[0])
      }) .catch(err => console.log(err))
    },

    deleteItem: (req, res) => {

        const { id } = req.params
        sequelize.query(`DELETE FROM wishlist_items WHERE wishlist_items.item_id = ${+id};
        DELETE FROM gifts WHERE category IS NULL and gifts_id = ${+id}`).then((dbRes) => {res.status(200).send('item successfully deleted from wishlist')})

    },

    
};
