const express=require("express")
require("dotenv").config()
const {connection}=require("./db")
const {userRoute}=require("./routes/user.routes")
const {productsRoute}=require("./routes/products.route")
const {adminRoute}=require("./routes/admin.route")
const{authenticate}=require("./middlewares/authenticate")
const cors=require("cors")

const app=express()
app.use(cors())
app.use(express.json())


// //////////////////////////////////////////////////////////////////////////


app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users",userRoute)

app.use("/admin",adminRoute)

app.use("/products",productsRoute)

app.post("/authenticate",authenticate,(req,res)=>{
    res.send({"user":req.body.user})
})



// //////////////////////////////////////////////////////////////////////////



app.listen(process.env.port,async()=>{
    console.log("Server is On")
    try {
        await connection
        console.log("Successfully connected to DB")
    } catch (error) {
        console.log(error)
    }
})