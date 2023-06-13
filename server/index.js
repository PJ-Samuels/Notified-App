const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

console.log("express getting to server")
app.get('/', (req, res) => {
    const data = ["Hello world", "Hello world2", "Hello world3"];
    res.json(data);
  });

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})
