//global variables
let erase = false;
let painting = false;
let drawingShapes = false;
let firstTimeLineDraw = true;
let startX, startY, endX, endY;

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

//sidebar navigation
function toggleSidebar(){
    var toggleBtn = document.getElementById('sidebar');
    toggleBtn.classList.toggle('active');
  }

// change board radio btn events
const radioGroup = document.forms['radio-form'].elements['optradio'];
for(let i=0; i<radioGroup.length; i++){
    radioGroup[i].onclick = function(){
        canvas.style.backgroundColor = this.value;
    };
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
        firstTimeLineDraw = true;
        //removing styling of st line
        lineDraw.style.backgroundColor = '#FFFFFF';
        lineDraw.style.color = '#202020';
    });

    eraseBtn.addEventListener("click", ()=> {
        allowDraw = false;
        allowErase = true;

        //removing event listeners of drawing
        canvas.removeEventListener("mousedown",startPainting);
        canvas.removeEventListener("mouseup", stopPainting);
        canvas.removeEventListener("mousemove", draw);
        //removing draw shapes event listeners
        canvas.removeEventListener("mousedown",startDrawingLine);
        canvas.removeEventListener("mouseup", stopDrawingLine);

        //adding event listeners of erasing
        canvas.addEventListener("mousedown", startErasing);
        canvas.addEventListener("mouseup", finishErasing);
        canvas.addEventListener("mousemove", eraseBoard);

        canvas.style.cursor = "url(https://adarsh45.github.io/blackboard/img/circle.svg), auto";
        //console.log("started to erase");
        //removing styling of st line
        lineDraw.style.backgroundColor = '#FFFFFF';
        lineDraw.style.color = '#202020';
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
            //removing draw shapes event listeners
            canvas.removeEventListener("mousedown",startDrawingLine);
            canvas.removeEventListener("mouseup", stopDrawingLine);
        
            canvas.style.cursor = "crosshair";
            //console.log("started to draw now");
            //removing styling of st line
            lineDraw.style.backgroundColor = '#FFFFFF';
            lineDraw.style.color = '#202020';
        });
    }

    //drawing shapes
    const lineDraw = document.getElementById('line');
    lineDraw.addEventListener('click', ()=> {
        //styling
        lineDraw.style.backgroundColor = '#202020';
        lineDraw.style.color = '#FFFFFF';
        lineDraw.style.borderRadius = '4px';
        
        //removing all event listeners
        canvas.removeEventListener("mousedown",startPainting);
        canvas.removeEventListener("mouseup", stopPainting);
        canvas.removeEventListener("mousemove", draw);
        canvas.removeEventListener("mousedown", startErasing);
        canvas.removeEventListener("mouseup", finishErasing);
        canvas.removeEventListener("mousemove", eraseBoard);

        //adding draw shapes event listeners
        canvas.addEventListener("mousedown",startDrawingLine);
        canvas.addEventListener("mouseup", stopDrawingLine);
    
        canvas.style.cursor = "pointer";
        //console.log("started to draw line now");
    });

    //drawing line function
    function startDrawingLine(e){
        startX = e.clientX;
        startY = e.clientY;
        ctx.lineWidth = mThickness;
        ctx.strokeStyle = mColor;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
    function stopDrawingLine(e){
        endX = e.clientX;
        endY = e.clientY;
        // drawing perfect straight line
        if(modSubtraction(startX, endX) < modSubtraction(startY, endY)){
            //x coordinate should be constant
            ctx.lineTo(startX, e.clientY);

        } else if(modSubtraction(startX, endX) > modSubtraction(startY, endY)){
            //y coordinate should be constant
            ctx.lineTo(e.clientX, startY);

        } else {
            ctx.lineTo(e.clientX, e.clientY);
        }
        ctx.stroke();
        ctx.beginPath();
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

function modSubtraction(num1, num2){
    let result;
    if (num1>num2){
        result = num1 - num2;
    } else if(num2>num1){
        result = num2 - num1;
    } else {
        result = 0;
    }
    return result;
}
