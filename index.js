const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

app.get("/api/:date?", (req, res) => {
  const tsRegex = /^[\d]+$/; // Regex for time stamp format

  let dateParam = req.params.date;

  if (!dateParam) {
    let dateRes = new Date(); // current date and time
    res.json(sendDateRes(dateRes));
  } else {
    let dateRes = tsRegex.test(dateParam) ? new Date(+dateParam) : new Date(dateParam);

    if (dateRes.getTime()) { // dateRes is valid date if getTime() yields actual number
      res.json(sendDateRes(dateRes));
    } else {
      res.json({ "error": "Invalid Date" });
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
  return { "unix": unixTS, "utc": utcDate };
}