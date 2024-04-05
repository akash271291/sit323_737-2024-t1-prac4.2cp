const express = require("express"); //Importing the express library
const winston = require('winston'); //Importing winston library
const app = express(); //craeting an object of express

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));  

const logger = winston.createLogger({ //creating logger object/instance with the below values
level: 'info', //setting level to 'info'
format: winston.format.json(), //format to json format
defaultMeta: { service: 'calculator-microservice' },  
transports: [
    
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), //logging error to error.log
    new winston.transports.File({ filename: 'logs/combined.log' }), //logging all logs including info, error & warnings to combined.log
],
});

// Creating a function to log the operation with 2 parameters
const logOperation = function(operation, num1, num2){ //passing 3 parameters operation, num1 and num2
logger.log({
    level:'info',
    message:`New ${operation} operation requested: ${num1} ${operation} ${num2}`
})
}

// Creating a function to log the operation with single parameter
const logOperation2 = function(operation, num1){ //passing 2 parameters operation, num1
    logger.log({
        level:'info',
        message:`New ${operation} operation requested: ${num1} ${operation}`
    })
    }

// function for division of 2 numbers: num1 & num2
const division = (num1, num2) =>{ //passing 2 parameters num1 and num2
var ans = num1 / num2; //performing the division operation
return ans; //returning answer
}

// function for addition of 2 numbers: num1 & num2
const addition = (num1, num2) =>{ //passing 2 parameters num1 and num2
var ans = num1 + num2 //performing the addition operation
return ans; //returning answer
}

// function for multiplication of 2 numbers: num1 & num2
const multiplication = (num1, num2) =>{ //passing 2 parameters num1 and num2
var ans = num1 * num2; //performing the multiplication operation
return ans; //returning answer
}

// function for subtraction of 2 numbers: num1 & num2
const subtraction = (num1, num2) =>{ //passing 2 parameters num1 and num2
var ans = num1 - num2; //performing the subtraction operation
return ans; //returning answer
}

// function for squareroot of number: num1
const squareroot = (num1) =>{ //passing 1 parameter num1
    var ans = Math.sqrt(num1); //performing the squareroot operation
    return ans; //returning answer
    }

// function for exponential of 2 numbers: num1 & num2
const exponential = (num1, num2) =>{ //passing 2 parameters num1 and num2
    var ans = Math.pow(num1, num2); //performing the exponential operation
    return ans; //returning answer
    }

// function for modulus of 2 numbers: num1 & num2
const modulus = (num1, num2) =>{ //passing 2 parameters num1 and num2
    var ans = num1 % num2; //performing the modulus operation
    return ans; //returning answer
    }

//Defining the endpoint url to handle division request
app.post('/division', function (req,res){ 
try{
    if(isNaN(req.body.num1) || req.body.num1 == null || req.body.num1 == '') //checking if num1 is empty or null, if yes it will throw error that num1 is incorrect
        throw new Error("Number 1 is incorrect");    
    if(isNaN(req.body.num2) || req.body.num2 == null || req.body.num2 == '') //checking if num2 is empty or null, if yes it will throw error that num2 is incorrect
        throw new Error("Number 2 is incorrect");    
    let num1 = parseFloat(req.body.num1); //storing the value of num1 from the request body to variable num1
    let num2 = parseFloat(req.body.num2); //storing the value of num2 from the request body to variable num2
    logOperation('division', num1, num2); //Calling logOperation method to log the arithmetic operation
    res.send(`<div><h1>The division of the two numbers is ${ division(num1, num2) }</h1><a href='/'>Home</a></div>`); //sending response back to user
}catch(err){
    logger.error(err.toString());
    res.status(500).send(`<h3>${ err.toString() }</h3> <a href='/'>Home</a>`); //If there is an error in try block then it will set the status to 500 and send the error string
}
});

//Defining the endpoint url to handle multiplication request
app.post('/multiplication', function (req,res){
try{
    if(isNaN(req.body.num1) || req.body.num1 == null || req.body.num1 == '') //checking if num1 is empty or null, if yes it will throw error that num1 is incorrect
        throw new Error("Number 1 is incorrect");    
    if(isNaN(req.body.num2) || req.body.num2 == null || req.body.num2 == '') //checking if num2 is empty or null, if yes it will throw error that num2 is incorrect
        throw new Error("Number 2 is incorrect");    
    let num1 = parseFloat(req.body.num1); //storing the value of num1 from the request body to variable num1
    let num2 = parseFloat(req.body.num2); //storing the value of num2 from the request body to variable num2
    logOperation('multiplication', num1, num2); //Calling logOperation method to log the arithmetic operation
    res.send(`<div><h1>The multiplication of 2 numbers is ${ multiplication(num1, num2) }</h1><a href='/'>Home</a></div>`); //sending response back to user
}catch(err){
    logger.error(err.toString());
    res.status(500).send(`<h3>${ err.toString() }</h3> <a href='/'>Home</a>`); //If there is an error in try block then it will set the status to 500 and send the error string
}
});

//Defining the endpoint url to handle addition request
app.post('/addition', function (req,res){
try{
    if(isNaN(req.body.num1) || req.body.num1 == null || req.body.num1 == '') //checking if num1 is empty or null, if yes it will throw error that num1 is incorrect
        throw new Error("Number 1 is incorrect");    
    if(isNaN(req.body.num2) || req.body.num2 == null || req.body.num2 == '') //checking if num2 is empty or null, if yes it will throw error that num2 is incorrect
        throw new Error("Number 2 is incorrect");    
    let num1 = parseFloat(req.body.num1); //storing the value of num1 from the request body to variable num1
    let num2 = parseFloat(req.body.num2); //storing the value of num2 from the request body to variable num2
    logOperation('addition', num1, num2); //Calling logOperation method to log the arithmetic operation
    res.send(`<div><h1>The sum is ${ addition(num1, num2) }</h1><a href='/'>Home</a></div>`); //sending response back to user
}catch(err){
    logger.error(err.toString());
    res.status(500).send(`<h3>${ err.toString() }</h3> <a href='/'>Home</a>`);//If there is an error in try block then it will set the status to 500 and send the error string
}
});

//Defining the endpoint url to handle subtraction request
app.post('/subtraction', function (req,res){
try{
    if(isNaN(req.body.num1) || req.body.num1 == null || req.body.num1 == '') //checking if num1 is empty or null, if yes it will throw error that num1 is incorrect
        throw new Error("Number 1 is incorrect");    
    if(isNaN(req.body.num2) || req.body.num2 == null || req.body.num2 == '') //checking if num2 is empty or null, if yes it will throw error that num2 is incorrect
        throw new Error("Number 2 is incorrect");    
    let num1 = parseFloat(req.body.num1); //storing the value of num1 from the request body to variable num1
    let num2 = parseFloat(req.body.num2); //storing the value of num2 from the request body to variable num2
    logOperation('subtraction', num1, num2); //Calling logOperation method to log the arithmetic operation
    res.send(`<div><h1>The subtraction of 2 numbers is ${ subtraction(num1, num2) }</h1><a href='/'>Home</a></div>`);//sending response back to user
}catch(err){
    logger.error(err.toString());
    res.status(500).send(`<h3>${ err.toString() }</h3> <a href='/'>Home</a>`);//If there is an error in try block then it will set the status to 500 and send the error string
}
});

//Defining the endpoint url to handle modulus request
app.post('/modulus', function(req, res) {
    try{
        if(isNaN(req.body.num1) || req.body.num1 == null || req.body.num1 == '') //checking if num1 is empty or null, if yes it will throw error that num1 is incorrect
            throw new Error("Number 1 is incorrect");    
        if(isNaN(req.body.num2) || req.body.num2 == null || req.body.num2 == '') //checking if num2 is empty or null, if yes it will throw error that num2 is incorrect
            throw new Error("Number 2 is incorrect");    
        let num1 = parseFloat(req.body.num1); //storing the value of num1 from the request body to variable num1
        let num2 = parseFloat(req.body.num2); //storing the value of num2 from the request body to variable num2
        logOperation('modulus', num1, num2); //Calling logOperation method to log the arithmetic operation
        res.send(`<div><h1>The modulus is ${ modulus(num1, num2) }</h1><a href='/'>Home</a></div>`); //sending response back to user
    }catch(err){
        logger.error(err.toString());
        res.status(500).send(`<h3>${ err.toString() }</h3> <a href='/'>Home</a>`);//If there is an error in try block then it will set the status to 500 and send the error string
    }
    });


    //Defining the endpoint url to handle exponential request
app.post('/exponential', function(req, res) {
    try{
        if(isNaN(req.body.num1) || req.body.num1 == null || req.body.num1 == '') //checking if num1 is empty or null, if yes it will throw error that num1 is incorrect
            throw new Error("Number 1 is incorrect");    
        if(isNaN(req.body.num2) || req.body.num2 == null || req.body.num2 == '') //checking if num2 is empty or null, if yes it will throw error that num2 is incorrect
            throw new Error("Number 2 is incorrect");    
        let num1 = parseFloat(req.body.num1); //storing the value of num1 from the request body to variable num1
        let num2 = parseFloat(req.body.num2); //storing the value of num2 from the request body to variable num2
        logOperation('exponential', num1, num2); //Calling logOperation method to log the exponential operation
        res.send(`<div><h1>The exponential is ${ exponential(num1, num2) }</h1><a href='/'>Home</a></div>`); //sending response back to user
    }catch(err){
        logger.error(err.toString());
        res.status(500).send(`<h3>${ err.toString() }</h3> <a href='/'>Home</a>`);//If there is an error in try block then it will set the status to 500 and send the error string
    }
    });

   //Defining the endpoint url to handle square root request
app.post('/squareroot', function(req, res) {
    try{
        if(isNaN(req.body.num1) || req.body.num1 == null || req.body.num1 == '') //checking if num1 is empty or null, if yes it will throw error that num1 is incorrect
            throw new Error("Number 1 is incorrect");     
        let num1 = parseFloat(req.body.num1); //storing the value of num1 from the request body to variable num1
        logOperation2('squareroot', num1); //Calling logOperation method to log the squareroot operation
        res.send(`<div><h1>The squareroot is ${ squareroot(num1) }</h1><a href='/'>Home</a></div>`); //sending response back to user
    }catch(err){
        logger.error(err.toString());
        res.status(500).send(`<h3>${ err.toString() }</h3> <a href='/'>Home</a>`);//If there is an error in try block then it will set the status to 500 and send the error string
    }
    });

var port = process.env.port || 3000;
app.listen(port,() => console.log("Connection successful at localhost:" + port));