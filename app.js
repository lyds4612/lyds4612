const path = require('path');
const express = require("express");
const exphbs = require('express-handlebars');
const app = express();
const products = require("./products.json")
const publicPath = path.join(__dirname, '/public');
const bodyParser = require('body-parser')
app.use(express.static(publicPath))

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
    }
}));
app.set('view engine', 'hbs');
app.get('/', function (req, res) {
    res.render('home', {
    products

    });
});
app.get('/product/:id', function (req, res) {
    console.log('Request Type:', req.params.id);
    for (let i = 0; i < products.length; i++ ){
        const product = products [i];
        if (product.productId===parseInt (req.params.id)){
            res.render('product', product)
            

        }

    }
  });
app.post('/api/recomendation/:recomendationId', bodyParser.json(), function (req, res){
    if(!req.body) return res.sendStatus(400)

    const productId = req.body.id;
    function getRandomInt(min,max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max-min)) + min;
    }
    const recomendations = []
    for (let i = 0 ; i < 5 ; i++){
        recomendations.push(products[getRandomInt(0 , products.length)]);
    }
    res.send(recomendations);    
})
 

app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});

