# creating Models
to save data to the database we need to create a model
- create a folder called models
- create a js file

## connectng node to mongodb
- got to mongodb.com and create a free account
- go to the connect tab and copy the connection string
- the package named mongoose is used to connect to mongodb
- install mongoose
- this goes to server.js
```bash
const mongoose = require('mongoose');
import mongoose from 'mongoose';
mongoose.set("strictQuery", false);
mongoose.connect("the connection string", 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {
    app.listen(5000);
console.log('connected to mongodb')
}
).catch((err) => console.log(err));
```
```

```javascript
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
```
```

```javascript
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "please enter product name"],
        }
        quanitity:{
            type: Number,
            required: [true, "please enter product quantity"],
        }
        image:{
            type: String,
            required:false
        }


    },
    {
        timestamps: true, //tracks when data is saved and modifed
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
```
## posting data to the database
```javascript
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const app = express();

app.use(express.json()); //allows us to parse json

app.post('/api/products', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
        res.send(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});
```

## getting data from the database
```javascript
app.get('/api/products', async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err){
        res.status(500).json(err);
    }
});

app.get('/api/products/:id', async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err){
        res.status(500).json(err);
    }
});
```
```



