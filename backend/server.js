const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open',() =>{
    console.log("db connected");
})

const booksRouter = require('./routes/books');
const writersRouter = require('./routes/writers');

app.use('/books',booksRouter);
app.use('/writers', writersRouter);

app.listen(port, () => {
    console.log(`running on ${port}`)
})