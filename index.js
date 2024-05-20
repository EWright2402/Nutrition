const  supabaseClient  = require("@supabase/supabase-js")
const { profile } = require("console")
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
    .select('username,name, password');

    if (error) {
        console.log('Error:', error);
        res.status(500).send(error); 
    } else {
        // Separate the data into three arrays
        const usernames = data.map(profile => profile.username);
        const names = data.map(profile => profile.name);
        const pass = data.map(profile => profile.password);
        // Structure the response
        const response = {
            usernames,
            names,
            pass
        };
        //console.log(usernames,names)
        res.status(200).send(response); 
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
    console.log(`server is running on ${port}`)
})
async function addEntry(user,cal,date){
    //filter so its just for that username
    console.log()
    const { data,error } = await supabase
    .from('Calories')
    .insert({date,cal,user})
    if(error){
        console.error("ERROR", error.message)
    }else{
        console.log(data)
    }
}
async function logon(){
    //filter so its just for that username- set username
    const user = document.getElementById("1")
    const pass = document.getElementById("2")
    const name = document.getElementById("3")
    
        let { data, error } = await supabase
            .from('Profiles')
            .select('*')
            .eq('username', user)
            .eq('password', pass)
            .eq('name', name);

        if (error) {
            console.error('Error:', error);
            return false;
        }

        if (data.length > 0) {
            const userRecord = userData[0];
            if (userRecord.password === pass) {
                console.log('User exists:', userRecord);
                return true;
            } else {
                alert('Incorrect password');
                return false;
            }
        } else {
            confirm("Would you like to sign up?")
            const { data, error} = await supabase
                .from('Profiles')  // Replace with your table name
                .insert([
                    { username: user, password: pass, name: name }
                ]);
            return false;
        }
}
window.addEntry= addEntry;
window.logon= logon;