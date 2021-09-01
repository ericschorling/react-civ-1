
const isPlayerCastle =  (position)=>{
    console.log(position)
    if (position[0] === 10){
        if(position[1] === 10){
            console.log(true)
            return "castlelt"
        }
        if(position[1] === 11){
            return "castlert"
        }
    }
    else if (position[0] === 11){
        if(position[1] === 10){
            return "castellb"
        }
        if(position[1] === 11){
            return "castlerb"
        }
    }
    else if (position[0] === 2){
        if(position[1] === 2){
            console.log(true)
            return "castlelt"
        }
        if(position[1] === 3){
            return "castlert"
        }
    }
    else if (position[0] === 3){
        if(position[1] === 2){
            return "castellb"
        }
        if(position[1] === 3){
            return "castlerb"
        }
    }
    return "grass"
    
}

export {  isPlayerCastle}