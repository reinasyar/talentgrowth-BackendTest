const db = require('../config/db');

//create post
exports.createpost = async (req, res, next) => {
    const {title, content, author} = req.body;
    const userId = req.user.id;
    const createQuery = 'INSERT INTO posts (title, content, author, user_id) VALUES (?,?,?,?)';

    try{
        const [result] = await db.query(createQuery, [title, content, author, userId]);
        res.status(201).json({message: 'Create Post Success!', id: result.insertId});
    } catch (err){
        next(err);
    };
};

//get all post
exports.getposts = async (req, res, next) => {
    const selectQuery = 'SELECT id, title, content, author, created_at FROM posts WHERE flag = 1';

    try{
        const [results] = await db.query(selectQuery);
        res.json(results);
    } catch (err){
        next(err);
    }
};

//get a post by id
exports.getpostsid = async (req, res, next) => {
    const {id} = req.params;
    const selectbyidQuery = 'SELECT id, title, content, author, created_at FROM posts WHERE id = ? AND flag = 1';

    try{
        const [result] = await db.query(selectbyidQuery, [id]);
        if (result.length===0){
            const error = new Error('Post not found');
            error.statusCode = 404;
            throw error;
        };
        res.json(result[0]);
    } catch (err){
        next(err);
    }
};

//update a post by id
exports.updatepostid = async (req, res, next) => {
    const {id} = req.params;
    const {title, content, author} = req.body;
    const updateQuery = 'UPDATE posts SET title = ?, content = ?, author = ?, edited_at = CURRENT_TIMESTAMP, num_edit = num_edit + 1 WHERE id = ? AND flag = 1';

    try{
        const [check] = await db.query('SELECT user_id FROM posts WHERE id = ?', [id]);
        if (!check.length){
            const error = new Error('Post not found');
            error.statusCode = 404;
            throw error;
        };
        if (check[0].user_id !== req.user.id) {
            const error = new Error('Not authorized');
            error.statusCode = 403;
            throw error;
        };
        const [result] = await db.query(updateQuery, [title, content, author, id]);
        res.status(201).json({message: 'Update Post Success!' , id});
    } catch (err){
        next(err);
    }
}

//delete a post by id
exports.deletepostid = async (req, res, next) => {
    const {id} = req.params;
    const deleteQuery = 'UPDATE posts SET flag = 0, deleted_at = CURRENT_TIMESTAMP WHERE id = ?';

    try{
        //check auth
        const [check] = await db.query('SELECT user_id FROM posts WHERE id = ?', [id]);
        if (!check.length){
            const error = new Error('Post not found');
            error.statusCode = 404;
            throw error;
        };
        if (check[0].user_id !== req.user.id) {
            const error = new Error('Not authorized');
            error.statusCode = 403;
            throw error;
        };

        const [result] = await db.query(deleteQuery, [id]);
        res.status(201).json({message: 'Delete Post Success!' , id});
    } catch (err){
        next(err);
    }
};
