const express = require('express');
const mongoose = require("mongoose");
const bodyParser= require('body-parser');
const Product = require('./models/product');


const app = express();
require('dotenv').config();
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoConnection = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.zkgxhus.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(mongoConnection)
mongoose.connect(mongoConnection, { useNewUrlParser: true })
	.then(() => {
		console.log("Mongo connected")
	})
    .catch(err => {
        console.log("Mongo failed");
        console.log(err);
    });

app.get('/product', async (req, res) => {
    console.log("safsdfsf");
    const products = await Product.find();
    res.send(products);
});

app.post('/product', (req, res) => {
    Product.create({name: "aadfsfa", price: "232", description: "Sdsdf", imageURL: "safsdfsf"})
    res.send("Created");
});

app.post('/order', (req, res) => {
    console.log(req.body);
    res.send("Created");
});

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})