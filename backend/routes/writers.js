const router = require('express').Router();
let Writer = require('../models/writer.model');

router.route('/').get((req,res)=>{
    Writer.find()
    .then(writers=> res.json(writers))
    .catch(err => res.status(400).json('Error: '+ err));
})

router.route('/add').post((req,res)=>{
    const name = req.body.name;

    const newWriter = new Writer({name});
    newWriter.save()
    .then(()=> res.json('Writer added'))
    .catch(err => res.status(400).json('Error: '+ err));
})

module.exports = router; 