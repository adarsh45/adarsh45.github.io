//global variables
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
    const clearBtn = document.getElementById("clear_btn");
    const ctx = canvas.getContext("2d");

    //resize canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //variables
    let painting = false;

    //functions
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
        ctx.lineCap = "round";
        ctx.strokeStyle = mColor;

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }

    function clearCanvas(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }

    //event listeners
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mousemove", draw);
    clearBtn.addEventListener("click", clearCanvas);
});


window.addEventListener("resize", ()=> {
    //resize canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});