function clicked(clickedID){
    let clickedTask = document.getElementById(clickedID);
    clickedTask.addEventListener("click", () =>{
        if(clickedID.charAt(0) === 't'){
            fetch('/doing',{
                method: "POST",
                body: JSON.stringify({
                    clickedTask: clickedTask.innerText,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then((json) => {
                if(json.success){
                    clickedTask.remove();
                    updateUI(clickedID,json, clickedTask)
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }else if(clickedID.charAt(0) === 'd'){
            fetch('/done',{
                method: "POST",
                body: JSON.stringify({
                    clickedTask: clickedTask.innerText,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })    
            .then((response) => response.json())
            .then((json) =>{
                if(json.success){
                    clickedTask.remove();
                    updateUI(clickedID,json, clickedTask)
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    })
    // .then((response) => response.json())
    // .then((json) => console.log(json));
}

let count = 0;
let count1 = 0;

function updateUI(clickedID, json , clickedTask){
    if(clickedID.charAt(0) === 't'){
        // alert(json.doingTasks)
        const doingList = document.getElementById("doingList");
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(clickedTask.innerText))
        count++
        li.setAttribute("id", `doing${count}`)
        li.setAttribute("class", "doingList")
        li.setAttribute("onclick", "clicked(this.id)")
        doingList.appendChild(li);  
        return;
        // for(let i = 0 ; i < json.doingTasks.length ; i++){
        //     let li = document.createElement("li");
        //     li.appendChild(document.createTextNode(`${json.doingTasks[i]}`))
        //     count++
        //     li.setAttribute("id", `doing${count}`)
        //     li.setAttribute("onclick", "clicked(this.id)")
        //     doingList.appendChild(li);    
        // }
    }else if(clickedID.charAt(0) === 'd'){
        let doneList = document.getElementById("doneList");
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(`${clickedTask.innerText}`))
        count1++
        li.setAttribute("id", `Done${count}`)
        li.setAttribute("class", "doneList")
        li.setAttribute("onclick", "clicked(this.id)")
        doneList.appendChild(li);
    }
}