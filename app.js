const express =require('express');
const morgan =require('morgan');
const books =require('./books-data.js');
const { sort } = require('./books-data.js');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan('common'));
 
app.get('/books', (req,res) => {
const { search = "" } = req.query;
const { sort = "" } = req.query;
let results = books 
.filter(book =>
    book
        .title
        .toLowerCase()
        .includes(search.toLowerCase()));
        
if(sort) {
    if(!['title', 'rank'].includes(sort)){
        return res 
        .status(400)
        .send('Sort must be one of title or rank');
    }
}
if (sort) {
    results.sort((a,b) => {
        return a[sort] > b[sort] ? 1: a[sort] < b[sort] ? -1 : 0;
    });
}
console.log(req.query);


        res
        .json(results);
});


app.listen(8000, () => {
    console.log('server started on PORT 8000');
});