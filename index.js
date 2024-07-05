const express = require('express')
const app = express()
const PORT = 8000;

app.use(express.static('static'))

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
