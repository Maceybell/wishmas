const express = require("express")
const cors = require("cors")
require('dotenv').config()
const path = require('path')
const app = express()

app.use(express.json())
app.use(cors())
const {SERVER_PORT} = process.env

const {
    getGiftGuide, createGiftItem, addWishItem, getWishItems, deleteItem
} = require('./controller.js')

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, '../public/home'))
})
app.get('/gift-guides',(req, res) => {
    res.sendFile(path.join(__dirname, '../public/gift-guides'))
})
app.get('/my-wishlists',(req, res) => {
    res.sendFile(path.join(__dirname, '../public/my-wishlists'))
})


app.get('/giftGuide/:category', getGiftGuide)
app.get('/text', (req, res) => {
    res.send('endpoint hit')
})
app.get('/wishlist', getWishItems)
app.post('/wishlist', createGiftItem )
app.post('/addWishItem/:id', addWishItem )
app.delete('/wishlist/:id', deleteItem)





app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))