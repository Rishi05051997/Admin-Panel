const express = require('express');
const app = express(); 
const PORT = 3000;

app.get('/', (req, res) => {
    res.json({
        msg: 'Welcome to Associate builder backend...!!!'
    })
})

app.listen(PORT , () => {
    console.log(`server running at ${PORT}`)
});