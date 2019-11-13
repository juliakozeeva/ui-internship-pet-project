const express = require('express'); // express module 
const app = express(); // object of type express 
const port = 3001; // port

app.use(express.json()); //parsing json object in the body of request

const courses = [
  { id: 1, name: 'course1'},
  { id: 2, name: 'course2'},
  { id: 3, name: 'course3'},
];

app.get('/', (req, res) => { // callback function with 2 arg - req, res
  res.send(courses);
})

app.get('/:id', (req, res) => {
  const course = courses.find( c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('The course with the given ID was not found');
 } //404 object not found
  res.send(course);
});


app.post('/', (req, res) => {
  //input validation
  if(!req.body.name || req.body.name.length < 3) {
    // 400 bad request
    res.status(400).send('Name is required and should be minimum 3 characters');
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name //body of the request
  };
  courses.push(course);
  res.send(course);
});

app.put('/:id', (req, res)=> {
  // look up the course
  // if not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) {
    return res.status(404).send('The course with the given ID was not found');
  }
  // validate
  // if invalid, return 400 - bad request
  if(!req.body.name || req.body.name.length < 3) {
    // 400 bad request
    res.status(400).send('Name is required and should be minimum 3 characters');
    return;
  }
  // update the course
  // return the updated course
  course.name = req.body.name;
  res.send(course);
});

 app.delete('/:id', (req, res) => {
  // look up the course
  // if not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) {
    return res.status(404).send('The course with the given ID was not found');
  }
  // delete it
  const index = courses.indexOf(course);
  courses.splice(index, 1); //remove 1 object from courses array
  // return the same course
  res.send(course);
 })

app.listen(port, () => console.log(`Example app listening on port ${port}`)); // function wich will call when app starts listening on the port 