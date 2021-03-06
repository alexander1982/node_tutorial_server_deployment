const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
var app = express();

var fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date();
	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n' ,(err) => {
		if(err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

//app.use((req, res) => {
//	res.render('maintenance.hbs', {
//		message: 'funky message',
//		more: 'some more message'
//	});
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) =>{
	res.render('homePage.hbs', {
		pageTitle: 'Homepage',
		message: 'Some message'
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About page'
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects page',
		message: 'Hello from projects page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		error: 'Some shit happen'
	         });
});



app.listen(port, () => {
	console.log(`We run at ${port}`);
});
