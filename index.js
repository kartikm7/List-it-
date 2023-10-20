import express from "express";

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
        allTasks: allTasks
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
    }
}

// var doneTasks = []
// function done(value){
//     if(value){
//         doneTasks.push(value);
//         console.log(doneTasks.length);
//     }
// }


function remove(value){
    for(let i = 0; i < allTasks.length ; i++){
        if(value === allTasks[i]){
            let indexToBeRemoved = allTasks.indexOf(value);
            allTasks.splice(indexToBeRemoved, 1);
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
        }
        return;
    }
    res.render("index.ejs",{
        allTasks:allTasks,
        doingTasks: doingTasks,
    })
})

// app.post("/done", (req,res)=>{
//     // res.json({ message: 'Data received' });
//     let clickedTask = req.body.clickedTask;
//     console.log(clickedTask);
//     allTasks.forEach(element => {
//         if(clickedTask === allTasks[element]){
//             done(clickedTask);
//             remove(clickedTask);
//             res.render("index.ejs",{
//                 clickedTask: clickedTask,
//             })
//         }
//     });

// })

app.listen(port, () =>{
    console.log("Server is running on "+port);
})