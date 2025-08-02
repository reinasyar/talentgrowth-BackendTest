const db = require('../config/db');

//create post
exports.createpost = async (req, res) => {
    const {title, content, author} = req.body;
    const createQuery = 'INSERT INTO posts (title, content, author) VALUES (?,?,?)';

    try{
        const [result] = await db.query(createQuery, [title, content, author]);
        res.status(201).json({message: 'Create Post Success!', id: result.id});
    } catch (err){
        res.status(500).json({error: err.message});
    };
};

//get all post
exports.getposts = async (req, res) => {
    const selectQuery = 'SELECT id, title, content, author, created_at FROM posts WHERE flag = 1';

    try{
        const [results] = await db.query(selectQuery);
        res.json(results);
    } catch (err){
        res.status(500).json({error: err.message});
    }
};

//get a post by id
exports.getpostsid = async (req, res) => {
    const {id} = req.params;
    const selectbyidQuery = 'SELECT id, title, content, author, created_at FROM posts WHERE id = ? AND flag = 1';

    try{
        const [result] = await db.query(selectbyidQuery, [id]);
        if(result.length===0) res.status(404).json({ error: 'Post not found' });
        res.json(result[0]);
    } catch (err){
        res.status(500).json({error: err.message});
    }
};

//update a post by id
exports.updatepostid = async (req, res) => {
    const {id} = req.params;
    const {title, content, author} = req.body;
    const updateQuery = 'UPDATE posts SET title = ?, content = ?, author = ?, edited_at = CURRENT_TIMESTAMP, num_edit = num_edit + 1 WHERE id = ? AND flag = 1';

    try{
        const [result] = await db.query(updateQuery, [title, content, author, id]);
        if (result.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.status(201).json({message: 'Update Post Success!' , id: result.id});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

//delete a post by id
exports.deletepostid = async (req, res) => {
    const {id} = req.params;
    const deleteQuery = 'UPDATE posts SET flag = 0, deleted_at = CURRENT_TIMESTAMP WHERE id = ?'

    try{
        const [result] = await db.query(deleteQuery, [id]);
        if(result.length===0) res.status(404).json({ error: 'Post not found' });
        res.status(201).json({message: 'Delete Post Success!' , id: result.id});
    } catch (err){
        res.status(500).json({error: err.message});
    }
};
