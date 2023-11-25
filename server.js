const http = require("http");
const { parse } = require("node-html-parser");
const Parser = require('./parser.js').Parser;


const PORT = process.env.PORT || 6565;

const chunk = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

const requestListener = (req, res) => {
  if (req.method === 'POST') {
    let body = "";
    req.on('data', async (ch) => {
      body += ch;
      res.writeHead(200);
      console.log(JSON.parse(body).url)
    const parser = new Parser();
    const html = await parser.emulate(JSON.parse(body).url);
    res.end(JSON.stringify({ items: JSON.parse(body).url }))
    // const root = parse(html);

    // const arr = Array.from(root.querySelectorAll('.mainSongs .item .play, .mainSongs .item .desc, .mainSongs .item .duration'))
    // const chunkedArr = chunk(arr, 3)
    // const objArr = [];

    // chunkedArr.forEach((value) => {


    //   objArr.push({
    //     src: value[0].getAttribute('data-url').trim(),
    //     artist: value[1].childNodes[1].childNodes[1].innerText.trim(),
    //     trackName: value[1].childNodes[1].childNodes[3].innerText.trim(),
    //     duration: value[2].innerText.trim()
    //   })


    // })

    // res.end(JSON.stringify({ items: objArr }))
  });
  
    
  }
  else{
    res.writeHead(200);
    res.end(null)
  }

};

const server = http.createServer(requestListener);
server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
