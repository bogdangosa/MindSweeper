const GridContainer = document.getElementById("grid-container");
let n=10;
let bombs_total = 15;
let bombs_counter = 15;
let BoardMatrix = new Array(n); 
let vdy = new Array(-1,-1,-1,0,1,1,1,0);
let vdx = new Array(-1,0,1,1,1,0,-1,-1);


const Random = (min,max)=>{
    return Math.floor(Math.random() * max) + min;
}

const Initial = () =>{
    for(let i=0;i<n;i++){
        BoardMatrix[i] = new Array(n);
        for(let j=0;j<n;j++){
            BoardMatrix[i][j]=0;
        }
    }

    for(let i=0;i<bombs_total;i++){
        let y = Random(0,9);
        let x = Random(0,9);
        if(BoardMatrix[y][x]!=-1){
            BoardMatrix[y][x]=-1;
            for(let j=0;j<8;j++){
                let ny = y+vdy[j];
                let nx = x+vdx[j];
                if(ny>=0 && nx>=0 && ny<n && nx<n)
                    if(BoardMatrix[ny][nx]!=-1)
                        BoardMatrix[ny][nx]=BoardMatrix[ny][nx]+1;
            }
        }
        else
            i--;
    }
    console.log(BoardMatrix);


    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){            
            let grid_cell = document.createElement("div");
            grid_cell.classList.add("grid-cell");
            let p = document.createElement("p");
            p.id = "p"+i.toString()+j.toString();
            p.innerHTML=BoardMatrix[i][j];
            p.classList.add("cell-value");
            grid_cell.id = i.toString()+j.toString();
            grid_cell.appendChild(p);
            grid_cell.addEventListener('click',()=>CellClicked(i,j));
            grid_cell.addEventListener('contextmenu',()=>CellMarked(i,j));
            GridContainer.appendChild(grid_cell); 
        }
    }
    let BombCounter = document.getElementById("bombs_counter");
    BombCounter.innerHTML="Bombs: "+bombs_counter.toString();

} 

const CellClicked = (i,j) =>{
    let cell = document.getElementById(i.toString()+j.toString());
    cell.classList.add("viewed_cell");
    
    let cell_value = document.getElementById("p"+i.toString()+j.toString());
    
    if(cell_value.innerHTML==0)
        Fill(i,j);
    
}


const CellMarked = (i,j) =>{
    let cell_value = document.getElementById(i.toString()+j.toString());
    cell_value.classList.toggle("bomb");
    if(cell_value.classList.contains("bomb"))
        bombs_counter--;
    else
        bombs_counter++;
        
    let BombCounter = document.getElementById("bombs_counter");
    BombCounter.innerHTML="Bombs: "+bombs_counter.toString();
    
}

const Fill = (i,j)=>{
    let queueX = [];
    let queueY = [];
    console.log("got here");
    queueY.push(i);
    queueX.push(j);
    while(queueY.length>0){
        let y = queueY[0];
        let x = queueX[0];
        let cell = document.getElementById(y.toString()+x.toString());
        cell.classList.add("viewed_cell");
        if(BoardMatrix[y][x]!=0){
            queueY.shift();
            queueX.shift();
            continue;
        }
        let cell_value = document.getElementById("p"+y.toString()+x.toString());
        cell_value.innerHTML="";
        for(let k=0;k<8;k++){
            let ny = y+vdy[k];
            let nx = x+vdx[k];    
            if(ny<0||nx<0||ny>=n||nx>=n)
                continue;
            let new_cell = document.getElementById(ny.toString()+nx.toString());
            if(new_cell.classList.contains("viewed_cell"))
                continue
            queueX.push(nx);
            queueY.push(ny);
        }
        queueY.shift();
        queueX.shift();
    }
}



Initial();