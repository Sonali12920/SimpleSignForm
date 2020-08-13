const MongoClient = require('mongodb').MongoClient;
const mongo_username = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD

const uri ='mongodb+srv://Sonali12920:Sonali12920@simpleregistrationform.ktwdm.gcp.mongodb.net/SimpleRegForm?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });

let express = require('express');//requiring express model
let app = express();
let bodyParser = require('body-parser');
let http = require('http').Server(app);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile('/index.html', { root: '.' });
});

app.post('/create', function(req, res, next) {
  client.connect(err => {
    const students = client.db("crmdb").collection("students");

    let newstudent = {  email: req.body.email, password: req.body.password, name: req.body.name, address: req.body.address, city: req.body.city, state: req.body.state };
    students.insertOne(newstudent, function(err, res) {
      if (err) throw err;
      console.log("Successfully submitted");
    });
  })
  res.send('You have been signed in successfully');
})

app.set('port', process.env.PORT || 5000);
http.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'));
});

app.engine('pug', require('pug').__express)
app.set('views', '.')
app.set('view engine', 'pug')

