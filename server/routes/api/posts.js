const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// GetPosts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
})

async function loadPostsCollection() {
    // mLab
    const client = await mongodb.MongoClient.connect('mongodb://abc123:abc123@ds127624.mlab.com:27624/vue_express', {
        useNewUrlParser: true
    });

    // Atlas
    // const client = await mongodb.MongoClient.connect('mongodb+srv://xyz123:xyz123@cluster0-x0q7t.mongodb.net/test?retryWrites=true', {
    //     useNewUrlParser: true
    // });

    return client.db('vue_express').collection('posts');
}

module.exports = router;