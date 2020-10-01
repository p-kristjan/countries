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

    res.render('index.ejs', {
        country: "",
        name: "",
        topLevelDomain: "",
        callingCode: "",
        capital: "",
        region: "",
        subRegion: "",
        population: "",
        timezone: "",
        language: "",
        currency: "",
        flag: "",
        errorMessage: ""
    })
});

app.post('/', (req, res) => {
    let country;

    switch(req.body.countries){
        case '1': // estonia
            country = "estonia";
            break;
        case '2': // latvia
            country = "latvia";
            break;
        case '3': // lithuania
            country = "lithuania";
            break;
        default:
            country = "error";
            break;
    }

    if(country == "error"){
        
        res.render('index.ejs', {
            country: "",
            name: "",
            topLevelDomain: "",
            callingCode: "",
            capital: "",
            region: "",
            subRegion: "",
            population: "",
            timezone: "",
            language: "",
            currency: "",
            flag: "",
            errorMessage: "Please select a country."
        })
        
    } else {

        url = 'https://restcountries.eu/rest/v2/name/' + country + '?fullText=true '
        axios.get(url).then(function(api){
            let json = api.data;

            res.render('index.ejs', {
                country: country,
                name: json[0].name,
                topLevelDomain: json[0].topLevelDomain[0],
                callingCode: "+" + json[0].callingCodes[0],
                capital: json[0].capital,
                region: json[0].region,
                subRegion: json[0].subregion,
                population: json[0].population,
                timezone: json[0].timezones[0],
                language: json[0].languages[0].name,
                currency: json[0].currencies[0].name + " (" + json[0].currencies[0].code + " " + json[0].currencies[0].symbol + ")",
                flag: json[0].flag,
                errorMessage: ""
            });
        }).catch(function(error){
            console.log(error);
        });
    }


});

let port = 4477;

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});