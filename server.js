const express = require('express')
const app = express()



const users =[
    {
      "userId": 34512,
      "username": "Henry",
      "age": 42
    },
    {
      "userId": 87921,
      "username": "Flora",
      "age": 29
    },
    {
      "userId": 56230,
      "username": "David",
      "age": 58
    },
    {
      "userId": 10345,
      "username": "Alice",
      "age": 23
    },
    {
      "userId": 72198,
      "username": "George",
      "age": 35
    },
    {
      "userId": 95613,
      "username": "Eve",
      "age": 18
    },
    {
      "userId": 28741,
      "username": "Bob",
      "age": 47
    },
    {
      "userId": 63052,
      "username": "Charlie",
      "age": 62
    }
  ]

app.get("/users",paginatedResult(users),(req,res)=>{
  
res.json(res.paginatedResult);
})



function paginatedResult(model){
return async (req ,res, next) =>{
    const page =  parseInt(req.query.page)||0;
    const limit = parseInt(req.query.limit)||5;
    console.log(limit,page);
    const startIndex= (page-1)*limit;
    const endIndex = page*limit;
    const result ={};
    if(startIndex>0)
    result.previous = {
        page:page-1,
        limit
     }
    // result.users = model.slice(startIndex,endIndex);
    //in mongodb you will do
    result.users = await model.find().limit(limit).skip(startIndex).exec();
    if(endIndex<model.length) 
    result.next = {
        page:page+1,
        limit
     }

     res.paginatedResult= result;
     next();
   
}
}


app.listen(5000,()=>{console.log("listening")});