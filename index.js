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
        .select()
    console.log(data)

    if(error) {
        console.log('Error')
        res.send(error)
    } else {
        res.send(data)
    }
})

app.post('/user', async(req, res) => {

    console.log(res)

    const { data, error } = await supabase
        .from('Profiles')
        .insert( 'Username')
        .select()

    if(error) {
        console.log('Error')
        res.send(error)
    } else {
        res.send(data)
    }
})

app.listen(port, () => {
    console.log('HELLO')
})