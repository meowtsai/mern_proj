const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items')
const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use('/api/items', items);

const db = require('./config/key').mongoURI;
mongoose.connect(db).then(()=>{
    console.log('db connected!')
}).catch(err => console.log("DB connected fail! code:", err));

//serve static build (client)
if (process.env.NODE_ENV==='production'){
    //set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log('Sever is listening on port ' + port));