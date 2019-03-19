const express = require('express');

const db = require('../data/db.js');

const router = express.Router();

//Get
router.get('/', (req, res) => {
    db
        .find()
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error while saving the post to the database.' });
        });
});

//Get(post)
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db
        .findById(id)
        .then(post => {
            if(!user) {
                return res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
            res.status(202).json(post)
        })
        .catch(err => {
            res.status(500).json({ error: 'The post information could not be retrieved.' })
        });
});

//Post
router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if(!title || !contents) {
        return res.status(400).json({ errorMessage: 'Please provide title and contents for the post.'})
    }
    db
        .insert({
            title,
            contents,
            created_at,
            updated_at
        })
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error while saving the post to the database.'})
        });
});

//Delete
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db
        .remove(id)
        .then(post => {
            if(post === 0) {
                return res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
            res.json({ success: `User ${id} successfully removed.` })
        })
        .catch(err => {
            res.status(500).json({ error: 'The post could not be removed.' })
        });
});

//Update
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, contents } = req.body;
    if(!title || !contents ) {
        return res.status(400).json({ message: 'The post with the specified ID does not exist.' })
    }
    db
        .update(id, req.body)
        .then(post => {
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: 'The post with specified ID does not exist.' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'The post could not be modified.' })
        });
});