const router = require('express').Router();
let Book = require('../models/book.model');

router.route('/').get((req, res) => {
    Book.find()
        .then(books => res.json(books))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
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
        .then(() => res.json('Book added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
    Book.findById(req.params.id)
        .then(book => res.json(book))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(() => res.json('book deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
    Book.findById(req.params.id)
        .then(book => {
            book.name = req.body.name;
            book.length = Number(req.body.length);
            book.writer = req.body.writer;
            book.description = req.body.description;
            book.link = req.body.link;

            book.save()
                .then(() => res.json('Book updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

})

module.exports = router; 