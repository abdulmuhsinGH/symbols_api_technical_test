const https = require("https");

const API_URL = "https://adinkra.herokuapp.com/symbols";
function _getApiResponse(url) {
  return new Promise((resolve, reject)=>{
    let request  = https.get(url, (res) => {
      let { statusCode } = res;
      let  contentType = res.headers['content-type'];
      let error;

        if (statusCode !== 200) {
          error = new Error('Request Failed.\n' +
            `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error('Invalid content-type.\n' +
            `Expected application/json but received ${contentType}`);
        }

        if (error) {
          console.error(error.message);
          // consume response data to free up memory
          res.resume();
        }

        res.setEncoding('utf8');
        let rawData = '';

        res.on('data', (chunk) => {
          rawData += chunk;
        });

        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          } catch (e) {
            reject(e.message);
          }
        });
      }).on('error', (e) => {
        reject(`${e.message}`);
      });

      request.setTimeout(60000, ()=>{
        err = new Error("Request timed out");
        err.code = 408;
        reject(err);
      })
  })  
}

getSymbolsData = async (req, res)=>{
  try {
    if(Object.keys(req.body).length == 0){
      res.status(200).json({"message":"no symbols"});
      return;
    }
    const url = `${API_URL}?${encodeURIComponent(JSON.stringify(req.body))}`;
    const data = await _getApiResponse(url);
    
    res.status(200).json({"message":"symbols data retrieved", data: data});
  } catch (error) {
    if (error.code == 408) {
      res.status(408).json({"message":"Server could not be reached; request timed out.", data: []});
      return;
    }
    console.error(error);
    res.status(500).json({"message":"Something went wrong; Please try again later", data: []});
  }
  
}

module.exports = getSymbolsData;