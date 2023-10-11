
let oldDiv:HTMLElement|null = null;

const Storage: Obj[] = [];


interface Obj {
    oldDiv: HTMLElement,
    newDiv: HTMLElement,
    id: string
}

function addStorage(oldDiv: HTMLElement, newDiv: HTMLElement, id: string) {
    Storage.push({ oldDiv, newDiv, id })
    console.log(Storage)
}

export function adjustLine(from:HTMLElement|null=null){    
    if(from == null) return;
    if(oldDiv === from) return;
    if(oldDiv == null){
        oldDiv = from;
    }else{
        
        const to = oldDiv
        const StoragePoint = Storage.find(x => x.oldDiv === to && x.newDiv === from || x.oldDiv === from && x.newDiv === to)
        if (StoragePoint){
            console.log(StoragePoint)
            console.log("SameItemFound")
            
            const num = Storage.indexOf(StoragePoint)
            console.log(num)
            if(num === -1) return
            Storage.splice(num, 1)
            console.log(Storage)
            document.getElementById(StoragePoint?.id)?.remove()
            oldDiv = null
            return 
        };
        const line = document.createElement('div');
        const ID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        line.id = ID
        line.className = "absolute w-px -z-50 bg-orange-600"
        
        // check if it is an input or output
        // we will check that using input or output in the id name

        const fromId = from.id.split("-").pop()!
        const toId = oldDiv.id.split("-").pop()!
        console.log(fromId, toId)
        if(fromId == ("input") && toId.includes("input")){
            return
        }
        if(fromId.includes("output") && toId.includes("output")){
            return
        }
        if(oldDiv.parentElement?.id == from.parentElement?.id){
            oldDiv = null
            return
        }
        let fT
        let fL
        let tT
        let tL

        if(fromId.includes("input")){
            fT = (from.offsetTop  + from.parentElement!.offsetTop)  + from.offsetHeight/2;
            fL = (from.offsetLeft + from.parentElement!.offsetLeft) ;
            tT = (to.offsetTop    + to.parentElement!.offsetTop)    + to.offsetHeight/2;
            tL = (to.offsetLeft   + to.parentElement!.offsetLeft)    + to.offsetWidth;
        }
        else{
            fT = (from.offsetTop  + from.parentElement!.offsetTop)  + from.offsetHeight/2;
            fL = (from.offsetLeft + from.parentElement!.offsetLeft) + from.offsetWidth;
            tT = (from.offsetLeft + from.parentElement!.offsetLeft) + to.offsetWidth/2;
            tL = (from.offsetLeft + from.parentElement!.offsetLeft);
        }

        const CA   = Math.abs(tT - fT);
        const CO   = Math.abs(tL - fL);
        const H    = Math.sqrt(CA*CA + CO*CO);
        let ANG  = 180 / Math.PI * Math.acos( CA/H );

        let top  = 0;
        let left = 0;
    
        if(tT > fT){
            top  = (tT-fT)/2 + fT;
        }else{
            top  = (fT-tT)/2 + tT;
        }
        if(tL > fL){
            left = (tL-fL)/2 + fL;
        }else{
            left = (fL-tL)/2 + tL;
        }
    
        if(( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)){
            ANG *= -1;
        }
        top-= H/2;

        line.style.setProperty("-webkit-transform", 'rotate('+ ANG +'deg)');
        line.style.setProperty("-moz-transform", 'rotate('+ ANG +'deg)');
        line.style.setProperty("-ms-transform", 'rotate('+ ANG +'deg)');
        line.style.setProperty("-o-transform", 'rotate('+ ANG +'deg)');
        line.style.setProperty("transform", 'rotate('+ ANG +'deg)');
        line.style.top    = top+'px';
        line.style.left   = left+'px';
        line.style.height = H + 'px';
        document.getElementById("lines")?.appendChild(line);
        addStorage(oldDiv, from, ID)
        oldDiv = null
    }
}


export function lineRefresh(){
    for(let i = 0; i < Storage.length; i++){
        const StoragePoint = Storage[i] as Obj        
        const from = StoragePoint.oldDiv
        const to = StoragePoint.newDiv
        const ID = StoragePoint.id
        document.getElementById("lines")!.removeChild(document.getElementById(ID)!);
        
        let fT
        let fL
        let tT
        let tL

        if(from.id.includes("input")){
            fT = (from.offsetTop  + from.parentElement!.offsetTop)  + from.offsetHeight/2;
            fL = (from.offsetLeft + from.parentElement!.offsetLeft) ;
            tT = (to.offsetTop    + to.parentElement!.offsetTop)    + to.offsetHeight/2;
            tL = (to.offsetLeft   + to.parentElement!.offsetLeft)    + to.offsetWidth;
        }
        else{
            fT = (from.offsetTop  + from.parentElement!.offsetTop)  + from.offsetHeight/2;
            fL = (from.offsetLeft + from.parentElement!.offsetLeft) + from.offsetWidth;
            tT = (to.offsetTop + to.parentElement!.offsetTop) + to.offsetWidth/2;
            tL = (to.offsetLeft + to.parentElement!.offsetLeft);
        }

        const CA   = Math.abs(tT - fT);
        const CO   = Math.abs(tL - fL);
        const H    = Math.sqrt(CA*CA + CO*CO);
        let ANG  = 180 / Math.PI * Math.acos( CA/H );

        let top  = 0;
        let left = 0;
        
        if(tT > fT){
            top  = (tT-fT)/2 + fT;
        }else{
            top  = (fT-tT)/2 + tT;
        }
        if(tL > fL){
            left = (tL-fL)/2 + fL;
        }else{
            left = (fL-tL)/2 + tL;
        }

        if(( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)){
            ANG *= -1;
        }
        top-= H/2;
        const line = document.createElement('div');
        line.className = "absolute w-px -z-50 bg-orange-600"


        // create a new randomized id for the line
        line.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        line.style.setProperty("-webkit-transform", 'rotate('+ ANG +'deg)');
        line.style.setProperty("-moz-transform", 'rotate('+ ANG +'deg)');
        line.style.setProperty("-ms-transform", 'rotate('+ ANG +'deg)');
        line.style.setProperty("-o-transform", 'rotate('+ ANG +'deg)');
        line.style.setProperty("transform", 'rotate('+ ANG +'deg)');
        line.style.top    = top+'px';
        line.style.left   = left+'px';
        line.style.height = H + 'px';

        Storage[Storage.indexOf(StoragePoint)] = {"oldDiv": StoragePoint.oldDiv, "newDiv": StoragePoint.newDiv, "id": line.id}
        document.getElementById("lines")?.appendChild(line);

    }
}