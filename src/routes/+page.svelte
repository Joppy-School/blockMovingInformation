<script lang="ts">
	import { onMount } from 'svelte';
    let Button2: HTMLElement | null = null
    let MainDiv2: HTMLElement | null = null

	onMount(() => {
		// Make the DIV element draggable:
		dragElement(document.getElementById('mydiv'));
        dragElement(document.getElementById('mydiv2'));


        function dragElement(elmnt) {
            var pos1 = 0,
			pos2 = 0,
			pos3 = 0,
			pos4 = 0;
            if (document.getElementById(elmnt.id + 'header')) {
                // if present, the header is where you move the DIV from:
                document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown;
            } else {
                // otherwise, move the DIV from anywhere inside the DIV:
                elmnt.onmousedown = dragMouseDown;
            }
            
            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }
            
            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
                elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
            }
            
            function closeDragElement() {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    });

    // function to draw line between two divs that can be moved
    function drawLine(Button1: HTMLElement|null, mainDiv: HTMLElement|null) {
        if(Button1 == null) return;
        if(mainDiv == null) return;
        if(Button2 == null){
            console.log("Button2 is null")
            Button2 = Button1
            MainDiv2 = mainDiv
        }else{
            var canvas = document.getElementById("BackgroundDrawing") as HTMLCanvasElement;
            var ctx = canvas.getContext("2d");

            if(ctx == null) return;
            if(MainDiv2 == null) return;
            var bodyRec = mainDiv.getBoundingClientRect()
            var bodyRec2 = MainDiv2.getBoundingClientRect()
            var PosButton1 = Button1.getBoundingClientRect()
            var PosButton2 = Button2.getBoundingClientRect()
            ctx.shadowColor = "white"

            // draw line from one button to another on a canvas that is behind the divs
            ctx.beginPath();
            ctx.moveTo(PosButton2.x - bodyRec2.x, PosButton2.y - bodyRec2.y);
            ctx.lineTo(PosButton1.x - bodyRec.x, PosButton1.y - bodyRec.y);
            ctx.stroke();
            ctx.closePath();
            Button2 = null
            MainDiv2 = null




            // var Move1 = (PosButton1.x - bodyRec.x) + (PosButton1.width / 2)
            // var Move2 = (PosButton1.y - bodyRec.y) + (PosButton1.height / 2)
            // var Move3 = (PosButton2.x - bodyRec2.x) + (PosButton2.width / 2)
            // var move4 = (PosButton2.y - bodyRec2.y) + (PosButton2.height / 2)
            // console.log(Move1, Move2, Move3, move4)
            // ctx.beginPath();
            // ctx.moveTo(Move1, Move2);
            // ctx.lineTo(Move3, move4);
            // ctx.stroke();
            // ctx.closePath();
            // Button2 = null
        }
    }
    
</script>
    
<div class="w-screen h-screen">
    <div class="z-0 absolute text-center border border-neutral-500 bg-white top-1/2 left-1/2" id="mydiv"> 
        <div id="mydivheader" class="bg-primary-focus text-black p-3 cursor-move z-10">Click here to move</div>
        <button class="w-3 m-1 h-8 inline relative btn btn-secondary" id="ToBTN" on:click={() => {drawLine(document.getElementById("ToBTN"), document.getElementById("mydiv"))}}>&gt</button>
        
        <p class="inline-flex">this</p>
        <button class="w-3 m-1 h-8 inline-flex relative btn btn-secondary" id="FromBTN" on:click={() => {drawLine(document.getElementById("FromBTN"), document.getElementById("mydiv"))}}>&gt</button>
        
    </div>
    <div class="z-0 absolute text-white text-center border border-neutral-500 bg-white top-1/2 left-1/2" id="mydiv2"> 
        <div id="mydiv2header" class="bg-primary-focus text-black p-3 cursor-move z-10">Click here to move</div>
        <!-- add a dropdown to select from 5 items -->
        <button class="w-3 m-1 h-8 inline relative btn btn-secondary" id="ToBTN" on:click={() => {drawLine(document.getElementById("ToBTN"), document.getElementById("mydiv2"))}}>&gt</button>
        <select class="inline h-8 relative border-2 bg-black">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
            </select>
            <button class="w-3 m-1 h-8 inline-flex relative btn btn-secondary" id="FromBTN" on:click={() => {drawLine(document.getElementById("FromBTN"), document.getElementById("mydiv2"))}}>&gt</button>
            
            
        </div>
    <canvas id="BackgroundDrawing" class="-z-10 absolute h-screen w-screen"></canvas>
</div>
