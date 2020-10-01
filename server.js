const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const ejs = require('ejs');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', ejs);

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/', (req, res) => {
    let country;
    switch(req.body.countries){
        case '1': // estonia
            country = estonia;
            break;
        case '2': // latvia
            country = latvia;
            break;
        case '3': // lithuania
            country = lithuania;
            break;
    }

    url = 'https://restcountries.eu/rest/v2/name/' + country + '?fullText=true '
    axios.get(url).then(function(api){
        //todo
    }).catch(function(error){
        console.log(error);
    });
});

let port = 4477;

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});