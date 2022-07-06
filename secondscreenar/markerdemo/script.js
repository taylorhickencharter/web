process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const express = require('express');
const bodyParser = require("body-parser");
const Joi = require('joi'); //used for validation
const app = express();
app.use(express.json());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
 
var timestamps = [
{id: 1, time: 0.1}
]
 
// READ
app.get('https://10.0.0.182/api/timestamps', (req,res)=> {
res.send(timestamps);
});
 
app.get('https://10.0.0.182/api/timestamps/:id', (req, res) => {
const timestamp = timestamps.find(c => c.id === parseInt(req.params.id));
 
if (!timestamp) res.status(404).send('ID does not exist...');
res.send(timestamp);
});
 
// CREATE
app.post('https://10.0.0.182/api/timestamps', (req, res)=> {
 
const { error } = validateTimestamp(req.body);
if (error){
res.status(400).send(error.details[0].message)
return;
}
console.log(req.body);

const timestamp = {
id: timestamps.length + 1,
time: req.body.time
};
timestamps.push(timestamp);
res.send(timestamp);
});
 
// UPDATE
app.put('https://10.0.0.182/api/timestamps/:id', (req, res) => {
const timestamp = timestamps.find(c => c.id === parseInt(req.params.id));
if (!timestamp) res.status(404).send('Failed to update, record does not exist...');
 
const { error } = validateTimestamp(req, res);
if (error){
res.status(400).send(error.details[0].message);
return;
}
timestamp.time = req.body.time;
res.send(timestamp);
});
 
// DELETE
app.delete('https://10.0.0.182/api/timestamps/:id', (req, res) => {
 
const timestamp = timestamps.find(c => c.id === parseInt(req.params.id));
if(!timestamp) res.status(404).send('Failed to delete, record does not exist...');
 
const index = timestamps.indexOf(timestamp);
timestamps.splice(index,1);
 
res.send(timestamp);
});
 
function validateTimestamp(req, res) {
const schema = Joi.object({
    time: Joi.number(),
});
return schema.validate(req.body);
 
}
 
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));



// var url = "https://10.0.0.182:7777";
// var params = "somevariable=somevalue&anothervariable=anothervalue";
// var http = new XMLHttpRequest();

// http.open("GET", url+"?"+params, true);
// http.onreadystatechange = function()
// {
//     if(http.readyState == 4 && http.status == 200) {
//         alert(http.responseText);
//     }
// }
// http.send(null);
