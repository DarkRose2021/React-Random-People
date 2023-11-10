const express = require("express");
const app = express();
const cors = require("cors");
const port = 5001;

const names = require('./names.json')

console.log("running");

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, resp) => {
	resp.send("Getting to the api backend");
});

function getRandomInt(max) {
	return Math.floor(Math.random() * max) + 1;
}

function getRandomFixedInt(length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

//takes a gender and returns an url for an image
function getRandomPersonUrl(gender) {
	num = getRandomInt(40);
    if(num.toString().length == 1){
        num = `00${num}`
    }else if(num.toString().length == 2){
        num = `0${num}`
    }
    
    if(gender == 'male'){
        url = `http://localhost:5001/images/men/m${num}.jpg`;
    }else{
        url = `http://localhost:5001/images/women/f${num}.jpg`;
    }
	
	return url;
}
function getRandomEntryFromArray(array){
    return array[getRandomInt(array.length - 1)]
}

function randomGender(){
    if(getRandomInt(2) === 1){
        return gender = 'female'
    }else{
        return gender = 'male'
    }
}

function generateRandomPerson(gender){
    let first = gender=='male' ? getRandomEntryFromArray(names.male_names): getRandomEntryFromArray(names.female_names)
    let last = getRandomEntryFromArray(names.last_names)
    let img = getRandomPersonUrl(gender)

    let person = {
        name: {
            first: first,
            last: last
        },
        location: {
			street: {
				number: getRandomFixedInt(4),
				name: `${getRandomEntryFromArray(names.last_names)}${getRandomEntryFromArray(names.street_types)}`,
			},
			city: `${getRandomEntryFromArray(names.last_names)}${getRandomEntryFromArray(names.city_endings)}`,
			state: getRandomEntryFromArray(names.states),
			country: "USA",
			postcode: getRandomFixedInt(5),
		},
		email: `${first}.${last}@example.com`,
		login: {
			username: `${getRandomEntryFromArray(names.username_a)}${getRandomEntryFromArray(names.username_b)}${getRandomFixedInt(3)}`,
		},
		dob: {
			age: getRandomInt(120+1),
		},
		phone: `${getRandomFixedInt(3)}-${getRandomFixedInt(3)}-${getRandomFixedInt(3)}`,
		cell: `${getRandomFixedInt(3)}-${getRandomFixedInt(3)}-${getRandomFixedInt(3)}`,
		picture: {
			large: img,
			medium: img,
			thumbnail: img
		},
    }
    return person
}

app.get("/people", (res, resp) => {
	let people = peopleData;
	let responseData = {
		results: people,
	};
	resp.json(responseData);
});

app.get("/api", (req, res) => {
	let results = req.query.results

    console.log('input ' +results)
    if(results > 5000){
        results = 5000
    }
    console.log('input ' +results)
	//generate n number of users and respond with them
	let data = []; //todo fetch from database
    for(let i=0; i<results; i++){
        data.push(generateRandomPerson(randomGender())); // Push a new random person on
    }

    let responseData = {
		results: data,
	}
    console.log('people ' +data.length)

    res.json(responseData); //similar to return
});

app.listen(port, () => {
	console.log(`listening on ${port}`);
});
