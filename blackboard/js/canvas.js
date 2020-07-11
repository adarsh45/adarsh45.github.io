//global variables
let erase = false;
let painting = false;

const eraseBtn = document.getElementById("erase_btn");
const colorBtn = document.getElementsByClassName("round");
const clearAllBtn = document.getElementById("clear_all_btn");

let mColor = '#FFFFFF';
let mThickness = 5;

function changeColor(color){
    mColor = color; 
}
function changeThickness(thickness){
    mThickness = thickness;
}

window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    //resize canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    //event listeners for drawing
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mousemove", draw);
    
    clearAllBtn.addEventListener('click', ()=> {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    eraseBtn.addEventListener("click", ()=> {
        allowDraw = false;
        allowErase = true;

        //removing event listeners of drawing
        canvas.removeEventListener("mousedown",startPainting);
        canvas.removeEventListener("mouseup", stopPainting);
        canvas.removeEventListener("mousemove", draw);

        //adding event listeners of erasing
        canvas.addEventListener("mousedown", startErasing);
        canvas.addEventListener("mouseup", finishErasing);
        canvas.addEventListener("mousemove", eraseBoard);

        canvas.style.cursor = "url('../img/circle.svg'), auto";
        console.log("started to erase");
    });


    for(var i = 0; i<colorBtn.length; i++){
        colorBtn[i].addEventListener("click", ()=> {
            //adding event listeners of drawing
            canvas.addEventListener("mousedown",startPainting);
            canvas.addEventListener("mouseup", stopPainting);
            canvas.addEventListener("mousemove", draw);
        
            //removing event listeners of erasing
            canvas.removeEventListener("mousedown", startErasing);
            canvas.removeEventListener("mouseup", finishErasing);
            canvas.removeEventListener("mousemove", eraseBoard);
        
            canvas.style.cursor = "crosshair";
            console.log("started to draw now");
        });
    }

    //drawing functions
    function startPainting(e){
        painting = true;
        draw(e);
    }
    function stopPainting(){
        painting = false;
        ctx.beginPath();
    }
    function draw(e){
        if(!painting) return;
        ctx.lineWidth = mThickness;
        ctx.strokeStyle = mColor;
        ctx.lineCap = "round";

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }

    //erasing functions
    function startErasing(){
        erase = true;
    }
    function finishErasing(){
        erase = false;
    }
    function eraseBoard(e){
        if(!erase) return;
        ctx.clearRect(e.clientX, e.clientY, 30, 30);
    }

});


window.addEventListener("resize", ()=> {
    //resize canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});