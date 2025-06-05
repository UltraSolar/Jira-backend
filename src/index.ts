import express from "express" ;
import dotenv from "dotenv";

const PORT = 9000;
dotenv.config();
const app = express();

app.listen(Number(PORT), () => console.log('Server Started'));

app.get('/' , (req , res) => {
res.send('Home page')
}); 