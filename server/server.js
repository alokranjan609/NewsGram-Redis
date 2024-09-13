// server.js
const express = require('express');
const axios = require('axios');
const client=require('./client')
const cors=require("cors");
require('dotenv').config();



const app = express();
const port = 5000;
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}



// GNews API key and URL
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4/search';

// Middleware to parse JSON
app.use(express.json());
app.use(cors(corsOptions))

// Cache middleware function
const cache = async(req, res, next) => {
  const query = req.params.query;

  await client.get(query, (err, data) => {
    if (err) throw err;

    if (data) {
      console.log('Cache hit');
      res.send(JSON.parse(data));
    } else {
      console.log('Cache miss');
      next();
    }
  });
};

// Route to fetch news with caching
app.get('/news/:query', cache, async (req, res) => {
  const query = req.params.query;
  const url = `${BASE_URL}?q=${query}&apikey=${GNEWS_API_KEY}`;

  try {
    const response = await axios.get(url);
    const newsData = response.data;

    // Cache the data for 15 minutes (900 seconds)
    await client.set(query, JSON.stringify(newsData));
    await client.expire(query,60*5)

    res.send(newsData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
