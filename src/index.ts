import express from "express" ;

const PORT = 9000;
const app = express();

app.listen(Number(PORT), () => console.log('Server Started'));

app.get('/' , (req , res) => {
res.send('Home page')
});