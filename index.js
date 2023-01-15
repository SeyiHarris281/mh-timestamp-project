const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.get("/api/:date?", (req, res) => {
  const dateRegex = /^[\d]{4}\-[\d]{2}\-[\d]{2}$/; // check for date format
  const tsRegex = /^[\d]+$/; // check for time stamp format

  let dateParam = req.params.date;

  if (!dateParam) {
    let dateRes = new Date();
    let utcDate = dateRes.toUTCString();
    let unixTS = dateRes.getTime();
    res.json({ "unix":unixTS, "utc":utcDate });
  } else {
    let dateRes = tsRegex.test(dateParam) ? new Date(+dateParam) : new Date(dateParam);

    if (dateRes.getTime()) { // dateRes is valid date of getTime() yields actual number
      let utcDate = dateRes.toUTCString();
      let unixTS = dateRes.getTime();
      res.json({ "unix":unixTS, "utc":utcDate });
    } else {
      res.json({ "error":"Invalid Date" }); 
    }
  }
  
}) 

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log(`Your app is listening on port ${listener.address().port} ...`);
});

const sendDateRes = (dateRes) => {
  let utcDate = dateRes.toUTCString();
  let unixTS = dateRes.getTime();
  res.json({ "unix":unixTS, "utc":utcDate });
}