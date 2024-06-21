import express from 'express'
import bodyParser from 'body-parser'
import footprintApi from './footprintApi'
const cors = require('cors');

const app = express()

app.use(bodyParser.json())
const corsOptions = {
  origin: '*', // Replace with your allowed origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

const PAGE_SIZE = 10; // Number of records to send per page

// Endpoint for fetching data with pagination
app.get('/', async (req, res) => {
  const currentPage = parseInt(req.query.page) || 1;

  try {
    const year = req.query.year;
    // validation for year
    if(!year){
      return res.status(400).json({ error: 'year is not provided' , status: 400});
    }
    // Fetch data from your API for a specific year
    const countryYearData = await footprintApi.getDataForYear(req.query.year);
    if(countryYearData.length === 0){
      return res.status(500).json({ error: 'Internal server error' , status: 500});
    }
    
    // Filter the data based on "record" field
    const filteredArray = countryYearData.filter(obj => obj.record === "EFConsPerCap");
    const totalCarbon = filteredArray.reduce((sum, item) => sum + item.carbon, 0);

    // Calculate pagination boundaries
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedData = filteredArray.slice(startIndex, endIndex);

    // Prepare metadata for pagination
    const totalPages = Math.ceil(filteredArray.length / PAGE_SIZE);
    // Send the response
   return res.json({
      data: paginatedData,
      currentPage: currentPage,
      totalPages: totalPages,
      totalRecords: filteredArray.length,
      totalCarbon: totalCarbon.toFixed(2),
    });

  } catch (error) {
    console.error('Error fetching or filtering data:', error);
    res.status(500).json({ error: 'Internal server error' , status: 500});
  }
});
app.listen(5000,() => {     
  console.log('app is listening on port 5000')
})