const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const postsRoutes = require('./routes/postRoutes');

app.use(bodyParser.json());
app.use('/', postsRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.PORT}`);
});
