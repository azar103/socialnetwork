const express = require('express');
const app = express();

const port = process.env.DEFAULT_PORT || '5000';

app.get('/api/test', (req, res) => {
    res.status(200).send('Hello Express')
})
app.listen(port, (req, res) => {
    console.log(`server listenting on port ${port}...`)
})