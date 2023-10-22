import express, { json } from "express";

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.render("index.ejs");
})

app.post("/newTask", (req,res)=>{
    let task = req.body.task;
    if(task){
        tasks(task);
    }
    res.render("index.ejs", {
        allTasks:allTasks,
        doingTasks: doingTasks,
        doneTasks: doneTasks
    })
})

var allTasks = [];
function tasks(value){
    if(value){
        allTasks.push(value);
        console.log(allTasks.length);
    }
}

var doingTasks = []
function doing(value){
    if(value){
        doingTasks.push(value);
        console.log(doingTasks.length);
        console.log(doingTasks);
        return;
    }
}

var doneTasks = []
function done(value){
    if(value){
        doneTasks.push(value);
        console.log(doneTasks.length);
    }
}


function remove(value){
    for(let i = 0; i < allTasks.length ; i++){
        if(value === allTasks[i]){
            let indexToBeRemoved = allTasks.indexOf(value);
            allTasks.splice(indexToBeRemoved, 1);
            return;
        }
    }
}

function removeDoing(value){
    for(let i = 0; i < doingTasks.length ; i++){
        if(value === doingTasks[i]){
            let indexToBeRemoved = doingTasks.indexOf(value);
            doingTasks.splice(indexToBeRemoved, 1);
            return;
        }
    }
}


app.post("/doing", (req,res) =>{
    let clickedTask = req.body.clickedTask;
    console.log(clickedTask);
    for(let i = 0; i < allTasks.length ; i++){
        if(clickedTask == allTasks[i]){
            console.log("Found Element");
            doing(clickedTask);
            remove(clickedTask);
            res.json({
                success: true,
                allTasks: allTasks,
                doingTasks: doingTasks,
            })
            return;
        }
    } res.json({
        success: false,
        message: "task not found",
    })
})

app.post("/done", (req,res)=>{

    let clickedTask = req.body.clickedTask;
    console.log(clickedTask);
    for(let i = 0 ; i < doingTasks.length ; i++){
        if(clickedTask === doingTasks[i]){
            done(clickedTask);
            removeDoing(clickedTask);
            res.json({
                success:true,
                allTasks: allTasks,
                doingTasks: doingTasks,
                doneTasks: doneTasks
            })
        }   
    }
})

app.listen(port, () =>{
    console.log("Server is running on "+port);
})