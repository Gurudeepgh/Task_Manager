const express = require('express')
//import { Express } from "express"
const mongoose = require('mongoose');
const fs=require('fs')
const path=require('path')
const cors = require('cors');
const taskPath =path.join(__dirname,'task.json')
const app = express()
const port = 3000
app.use(express.json());
app.use(cors());
//app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/courses', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "task-manager" }).then(() => console.log('MongoDB Connected'))
// .catch(err => console.log(err));


app.get('/tasks',(req,res)=>{
  try{
    const taskData=fs.readFileSync(taskPath,'utf8');
    const tasks=JSON.parse(taskData);
    res.json(tasks);
  }catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});

app.post('/tasks',(req,res)=>{
  try{
    const {title,description}=req.body;
    const taskData=fs.readFileSync(taskPath,'utf8');
    const tasks=JSON.parse(taskData);
    const newTask={id: tasks.length+1,title,description};
    tasks.push(newTask);
    fs.writeFileSync(taskPath,JSON.stringify(tasks,null,2));
    res.json(newTask);
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});

app.put('/tasks/:id',(req,res)=>{
  try{
    const {title,description}=req.body;
    const taskId=parseInt(req.param.id);
    const taskData=fs.readFileSync(taskPath,'utf8');
    const tasks=JSON.parse(taskData);
    const taskIndex=tasks.findIndex(task=>task.id===taskId);
    if(taskIndex===-1){
      return res.status(404).json({msg:'task not found'});
    }
    tasks[taskIndex]={...tasks[taskIndex],title,description};
    fs.writeFileSync(taskPath,JSON.stringify(tasks,null,2));
    res.json(tasks[taskIndex]);
  }catch(err){
    res.status(500).send('server error');
  }
});

app.delete('/tasks/:id',(req,res)=>{
  try{
    const taskId=parseInt(req.param.id);
    const taskData=fs.readFileSync(taskPath,'utf8');
    const tasks=JSON.parse(taskData);
    const updateTasks=tasks.filter(task=>task.id!==taskId);
    if(tasks.length === updateTasks.length){
      return res.status(404).json({msg:'task not found'});
      
    }
    fs.writeFileSync(taskPath,JSON.stringify(updateTasks,null,2));
    res.json({msg:'task deleted'})
  }catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})