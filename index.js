const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Define the route
app.post('/v3/WEB/ContactVerify/doContactVerify', (req, res) => {
  console.log('Received request:', req.body);
  const { TransmissionReference, Records } = req.body;

  // Process the records
  const processedRecords = Records.map((record) => ({
    AddressExtras: " ",
    AddressKey: " ",
    AddressLine1: record.AddressLine1 || " ",
    AddressLine2: record.AddressLine2 || " ",
    City: record.City || " ",
    CompanyName: " ",
    CountryCode: record.Country || " ",
    CountryName: record.Country || " ",
    EmailAddress: " ",
    NameFull: " ",
    PhoneNumber: " ",
    PostalCode: record.PostalCode || " ",
    RecordExtras: " ",
    RecordID: record.RecordID,
    Reserved: " ",
    Results: "",
    State: record.State || " "
  }));

  // Construct response
  const response = {
    Records: processedRecords,
    TotalRecords: `${processedRecords.length}`,
    TransmissionReference: TransmissionReference || "string",
    TransmissionResults: "GE21",
    Version: "8.4.0.1310"
  };

  // Send response
  res.json(response);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
