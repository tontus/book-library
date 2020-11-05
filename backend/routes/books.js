const router = require('express').Router();
let Book = require('../models/book.model');

router.route('/').get((req,res)=>{
    Book.find()
    .then(books=> res.json(books))
    .catch(err => res.status(400).json('Error: '+ err));
})

router.route('/add').post((req,res)=>{
    const name = req.body.name;
    const length = Number(req.body.length);
    const writer = req.body.writer;
    const description = req.body.description;
    const link = req.body.link;
    

    const newBook = new Book({
        name,
        length,
        writer,
        description,
        link,
    });
    newBook.save()
    .then(()=> res.json('Book added'))
    .catch(err => res.status(400).json('Error: '+ err));
})

module.exports = router; 