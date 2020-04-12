
const express= require('express');
const body_parser= require('body-parser');
const fs= require('fs');
const path = require('path');
const app = express();
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());
app.use(express.static(path.join(__dirname,"public")));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});
const readJson = fs.readFileSync('./public/data/client.json');
let data = JSON.parse(readJson);
app.set('views', './public/views'); 
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + './public/views'));






//login
app.get('/login', function(req, res){
    res.sendFile(__dirname + "/login.html");
});
app.get('/register', function(req, res){
    res.sendFile(__dirname + "/Register.html");
});



app.get('/client', (req, res) => {
	res.render('client', { data });
});






//Registration validation =================================================================

app.post('/register',function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var re_password = req.body.re_password;


fs.readFile('./public/data/user.json', 'utf-8', function(err, data) {
	if (err) throw err;

	var arrayOfObjects = JSON.parse(data);
	arrayOfObjects.push({
		name: name,
        email: email,
        password : password,
        re_password : re_password
	});

    // console.log(arrayOfObjects);

    fs.writeFile('./public/data/user.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
        if (err) throw err;
        console.log('Done!');
        // res.sendFile(__dirname + "/list.html");
        res.redirect('/login')
       



    });
});

});
//Registration login =================================================================
app.post('/login',function(req, res){
    var your_name = req.body.your_name;
    var your_pass = req.body.your_pass;


fs.readFile('./public/data/user.json', 'utf-8', function(err, data) {
	if (err) throw err;

	var arrayOfObjects = JSON.parse(data);


    console.log(arrayOfObjects);

    arrayOfObjects.forEach(element => {
        if (your_name === element.name && your_pass === element.pass ) {

        //  res.sendFile(__dirname + "/page1.html");
        res.redirect('/client')


        }else
        res.sendFile(__dirname + "/404.html");




    });

});

});

//Add, delet, idit client =================================================================
app.get('/add', (req, res) => {
	res.render('add');
});

app.post('/add', (req, res) => {
	const { name, Matricule,permis,DatePirmis,ville,Phone} = req.body;

	data.push({ ID: data.length + 1,
		name: name,
		Matricule: Matricule,
		permis:permis,
		DatePirmis:DatePirmis,
		ville:ville,
		Phone:Phone
	 });
	fs.writeFileSync('./public/data/client.json', JSON.stringify(data, null, 4));
	res.redirect('client');
});


app.get('/edit/:id', (req, res) => {
	const { id } = req.params;
	let dataId;

	for (let i = 0; i < data.length; i++) {
		if (Number(id) == data[i].ID) {
			dataId = i;
		}
	}

	res.render('edit', { data: data[dataId] });
	res.redirect('client');
});


app.post('/edit/:id', (req, res) => {
	const { id } = req.params;
	const { name, Matricule,permis,DatePirmis,ville,Phone } = req.body;

	let dataId;
	for (let i = 0; i < data.length; i++) {
		if (Number(id) === data[i].ID) {
			dataId = i;
		}
	}

	data[dataId].name = name;
	data[dataId].Matricule = Matricule;
	data[dataId].permis = permis;
	data[dataId].DatePirmis = DatePirmis;
	data[dataId].ville = ville;
	data[dataId].Phone = Phone;

	fs.writeFileSync('./public/data/client.json', JSON.stringify(data, null, 4));
	// res.redirect('index ');
	res.render('client',{data});
});

app.get('/delete/:id', (req, res) => {
	const { id } = req.params;

	const newData = [];
	for (let i = 0; i < data.length; i++) {
		if (Number(id) !== data[i].ID) {
			newData.push(data[i]);
		}
	}

	data = newData;
	fs.writeFileSync('./public/data/client.json', JSON.stringify(data, null, 4));
	// res.redirect('index');
	res.render('client',{data});
});















            
            
                      
                       
                       






app.listen(8080,function(){
        // run server on http://localhost:8080/
    console.log("run server on http://localhost:8080/");

});