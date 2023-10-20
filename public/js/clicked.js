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
            clickedTask.remove();
        }else if(clickedID.charAt(0) === 'd'){
            fetch('/done',{
                method: "POST",
                body: JSON.stringify({
                    clickedTask: clickedTask.innerText,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })    // .then((response) => response.json())
            // .then((json) => console.log(json));
            // clickedTask.remove();
        }
    })
    // .then((response) => response.json())
    // .then((json) => console.log(json));

}