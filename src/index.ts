import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database";
import User from "./models/user.model";

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT;

connectDb().then(() => {
    app.listen(Number(port), () => console.log(`Server Started and runnung at ${port}`));
});

app.post('/login', async (req, resp) => {
    const { name, email } = req.body
    const user = new User({ name, email });
    const savedUser = await user.save();
    resp.status(200).json(savedUser);
})

app.put('/updateLogin', async (req, resp) => {
    const { name} = req.body
    const email = req.query.email;
    const user = await User.updateOne({email:email}, {name: name}).exec();
    resp.status(200).json(user ?? "user not found");
})



app.get('/', (req, res) => {
    res.send('Home pagefnwuif wiufbiwub')
}); 