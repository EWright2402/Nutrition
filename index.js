const  supabaseClient  = require("@supabase/supabase-js")
const express = require('express')

const app = express()
const port = 3000
app.use(express.static(__dirname+'/public'))


const supabaseUrl = 'https://xmazthpkovtmqbabkknb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtYXp0aHBrb3Z0bXFiYWJra25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4MTkwMjgsImV4cCI6MjAzMTM5NTAyOH0.onzB_K2UyUpjIuIaknYyTXBaV3Q_Fa3ddswWxktXl4c'
const supabase = supabaseClient.createClient(supabaseUrl,supabaseKey)


app.get('/users', async (req,res) =>{
    console.log('get all usernames')
    const { data, error } = await supabase
    .from('Profiles')
    .select('username, name');

    if (error) {
        console.log('Error:', error);
        res.status(500).send(error);  // Send HTTP 500 for server error
    } else {
        // Separate the data into three arrays
        const usernames = data.map(profile => profile.username);
        const names = data.map(profile => profile.name);
        // Structure the response
        const response = {
            usernames,
            names
        };
        //console.log(usernames,names)
        res.status(200).send(response);  // Send HTTP 200 for success
    }
    const {data1, error1 } = await supabase
    .from('calories')
    .select('date, username, calories');
    if (error) {
        console.log('Error:', error);
        res.status(500).send(error);  // Send HTTP 500 for server error
    } else {
        // Separate the data into three arrays
        const date = data.map(cal => cal.date);
        const user = data.map(cal => cal.username);
        const calorie = data.map(cal => cal.calories);
        // Structure the response
        const response = {
            date,
            user,
            calorie
        };
        //console.log(usernames,names)
        res.status(200).send(response);  // Send HTTP 200 for success
    }
});
app.listen(port, () => {
    console.log('HELLO')
})

async function addUser(){
    const newUser = document.getElementById("name") //get from
    const { error } = await supabase
    .from('Profiles')
    .insert({ name: newUser })
}
async function addEntry(){
    const user = document.getElementById()
    const cal = document.getElementById()
    const date = document.getElementById()
    const { error } = await supabase
    .from('Calories')
    .insert({date,cal,user})
}