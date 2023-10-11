<script lang="ts">
	import { onMount } from 'svelte';
	let Button2: HTMLElement | null = null;
	let MainDiv2: HTMLElement | null = null;
	import { adjustLine, lineRefresh } from '$lib/comp/Code/LineMaking';

	onMount(() => {
		// Make the DIV element draggable:
		dragElement(document.getElementById('mydiv'));
		dragElement(document.getElementById('mydiv2'));

		function dragElement(elmnt: any) {
			var pos1 = 0,
				pos2 = 0,
				pos3 = 0,
				pos4 = 0;
			if (document.getElementById(elmnt.id + 'header')) {
				// if present, the header is where you move the DIV from:
				document.getElementById(elmnt.id! + 'header')!.onmousedown = dragMouseDown;
			} else {
				// otherwise, move the DIV from anywhere inside the DIV:
				elmnt.onmousedown = dragMouseDown;
			}

			function dragMouseDown(e: any) {
				e = e || window.event;
				e.preventDefault();
				// get the mouse cursor position at startup:
				pos3 = e.clientX;
				pos4 = e.clientY;
				document.onmouseup = closeDragElement;
				// call a function whenever the cursor moves:
				document.onmousemove = elementDrag;
			}

			function elementDrag(e: any) {
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

				lineRefresh();
			}
		}
	});
</script>

<div id="FullScreen" class="w-screen h-screen">
	<div
		class="z-0 absolute text-center border border-neutral-500 bg-white top-1/2 left-1/2"
		id="mydiv"
	>
		<div id="mydivheader" class="bg-primary-focus text-black p-3 cursor-move z-10">
			Click here to move
		</div>
		<button
			class="w-3 m-1 h-8 inline relative btn btn-secondary ToBTN"
			id="Div0-btn-input"
			on:click={() => {
				adjustLine(document.getElementById("Div0-btn-input"));
			}}>&gt</button
		>

		<p class="inline-flex">this</p>
		<button
			class="w-3 m-1 h-8 inline-flex relative btn btn-secondary"
			id="Div0-btn-output"
			on:click={() => {
				adjustLine(document.getElementById('Div0-btn-output'));
			}}>&gt</button
		>
	</div>
	<div
		class="z-0 absolute text-white text-center border border-neutral-500 bg-white top-1/2 left-1/2"
		id="mydiv2"
	>
		<div id="mydiv2header" class="bg-primary-focus text-black p-3 cursor-move z-10">
			Click here to move
		</div>
		<!-- add a dropdown to select from 5 items -->
		<button
			class="w-3 m-1 h-8 inline relative btn btn-secondary"
			id="Div1-btn-input"
			on:click={() => {
				adjustLine(document.getElementById('Div1-btn-input'));
			}}>&gt</button
		>
		<select class="inline h-8 relative border-2 bg-black">
			<option value="volvo">Volvo</option>
			<option value="saab">Saab</option>
			<option value="mercedes">Mercedes</option>
			<option value="audi">Audi</option>
		</select>
		<button
			class="w-3 m-1 h-8 inline-flex relative btn btn-secondary"
			id="Div1-btn-output"
			on:click={() => {
				adjustLine(document.getElementById('Div1-btn-output'));
			}}>&gt</button
		>
	</div>
	<div id="lines"/>
</div>
