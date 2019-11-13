const express = require('express'); 
const app = express();
const port = 3000;
const rp = require('request-promise');
const mockDB = 'http://localhost:3001';

app.use(express.json());



app.get('/', (req, res) => {
  const options = {
    uri: mockDB,
    json: true
  };
  rp(options)
    .then((dbresponse) => {
      res.status(200).send(dbresponse);
    })
    .catch((err) => {
      res.status(400).send({problem:`${err}`});
    });
})

app.get('/:id', (req, res) => {
  const id = req.params["id"]; // key id
  let url = `${mockDB}/`;
  if (id) {
    url += id;
  }
  const options = {
    uri: url,
    json: true
  };
  rp(options)
    .then((dbresponse) => {
      res.status(200).send(dbresponse);
    })
    .catch((err) => {
      res.status(400).send({problem:`${err}`});
    });
});

const isValidDto = body => {
  return body['name'];
}

app.post('/', (req, res) => {
  const dto = req.body;
  if (!isValidDto(dto)) {
    res.status(400).send('Body request is not valid');
  }
  const options = {
    method: 'POST',
    uri: mockDB,
    body: dto,
    json: true
  };
  rp(options)
    .then((dbresponse) => {
      res.status(200).send(dbresponse);
    })
    .catch((err) => {
      res.status(400).send({problem:` ${err}`});
    });
});

app.put('/:id', (req, res)=> {
  const id = req.params["id"];
  const dto = req.body;
  if (!isValidDto(dto)) {
    res.status(400).send('Body request is not valid');
  }
  const options = {
    method: 'PUT',
    uri: `${mockDB}/${id}`,
    body: dto,
    json: true
  };
  rp(options)
    .then((dbresponse) => {
      res.status(200).send(dbresponse);
    })
    .catch((err) => {
      res.status(400).send({problem: `${err}`});
    });
});

 app.delete('/:id', (req, res) => {
  const id = req.params["id"];
  const options = {
    method: 'DELETE',
    uri: `${mockDB}/${id}`,
    json: true
  };
  rp(options)
    .then((dbresponse) => {
      res.status(200).send(dbresponse);
    })
    .catch((err) => {
      res.status(400).send({problem:` ${err}`});
    });
 })

app.listen(port, () => console.log(`Example app listening on port ${port}`)); // function wich will call when app starts listening on the port 