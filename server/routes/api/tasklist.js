const { text } = require('body-parser');
const express=require('express');
const mongodb=require('mongodb');

const router=express.Router();

//Get posts
router.get('/', async(req, res) => {
    const mytasks=await loadPostsCollection();
    res.send(await mytasks.find({}).toArray());
});
//Add posts

router.post('/', async(req, res)=>{
    const mytasks=await loadPostsCollection();
    await mytasks.insertOne({
        task: req.body.task,
        dateCreated: new Date()
    });
    res.status(201).send()
});


//Delete posts

router.delete('/:_id',async(req, res)=>{
    const task=await loadPostsCollection();
    await task.deleteOne({_id: new mongodb.ObjectID(req.params._id)});
    res.status(200).send();
})

//function
async function loadPostsCollection(){
    const client=await mongodb.MongoClient.connect
    ('mongodb+srv://sak-lysem:1234@my-tasklist.p4xt6.mongodb.net/sak-lysem?retryWrites=true&w=majority',{
        useNewUrlParser:true
    });
    return client.db('vue_express').collection('mytasks');
}

module.exports=router;
