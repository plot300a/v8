const express = require('express');
const path = require('path')

const app = express();

app.use('/',express.static(path.join(__dirname,'/dist')))

const PORT = 30003;
app.listen(PORT,()=>{
    console.log('Serving on port '+PORT);
})