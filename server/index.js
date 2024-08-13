import  express  from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import bodyParser from 'body-parser';

const db =mysql.createPool({
    host: 'localhost',
    user:'root',
    password:"Lalan@56",
    database:'contact'
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get",(req,res)=>{
    const sqlGet= " select * from contact_db";
    db.query(sqlGet,(error,result)=>{
        res.send(result);
    })

});

app.post("/api/post",(req,res)=>{
    const {name,email,number} =req.body;
    const sqlInsert = "insert into contact_db(name,email,number) values (?,?,?)";
    db.query(sqlInsert,[name,email,number],(error,result)=>{
        if(error){
            console.log(error);
        }
    })

})

app.delete("/api/remove/:id",(req,res)=>{
    const {id} =req.params;
    const sqlremove = "delete from contact_db where id=?";
    db.query(sqlremove,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    })

})


app.get("/api/get/:id",(req,res)=>{
    const {id}=req.params;
    const sqlGet= " select * from contact_db where id=?";
    db.query(sqlGet,id,(error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })

});

app.put("/api/update/:id",(req,res)=>{
    const {id}=req.params;
    const {name,email,number}= req.body;
    const sqlUpdate= "update  contact_db set name=?,email=?,number=? where id=?";
    db.query(sqlUpdate,[name,email,number,id],(error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })

});

app.get("/",(req,res)=>{
    // const sqlInsert = "insert into contact_db(name,email,number) values ('tanishq','tanhishq@gmail.com','8889115518')";
    // db.query(sqlInsert,(error,result)=>{
    //     console.log("error",error);
    //     console.log("result", result);
    //     res.send("Hello express");
    // })
   
})

app.listen(5000,()=>{
    console.log("server is running on port 5000");
})