const WARRIOR_PROBABILITY = 80
const BUILDING_PROBABILITY = 33


export const getRandomNumber=(probability)=>{
    let randomNum = Math.floor(Math.random() * 100)
    console.log(randomNum)
    return randomNum
}

export const enemyTakeTurn=()=>{
    let enemyActions = []

    return enemyActions
}

export const pickUnit=(currentUnit, calcSpeed)=>{
    let unit = ''
    if(!currentUnit.length){
        let unitProbability = getRandomNumber()
        if(unitProbability >WARRIOR_PROBABILITY){
            unit = "worker"
            
        }else {
            unit = "warrior"
        }
        let newUnit ={
            unit: unit,
            turns:calcSpeed(unit)
        }
        return newUnit
    }
    return null
}

export const pickBuilding=(currentBuilding, speedCalc)=>{
    let building = ''
    if(!currentBuilding.length){
        let buildingProbability = getRandomNumber()
        if(buildingProbability >100 - BUILDING_PROBABILITY){
            building = "barracks"
            
        }else if (buildingProbability < 100 - BUILDING_PROBABILITY && buildingProbability > 100 - (BUILDING_PROBABILITY*2)){
            building = "house"
        }else  {
            building = "farm"
        }
        let newUnit ={
            building: building,
            turns:speedCalc(building)
        }
        return newUnit
    }
    return null
}

export const pickBuildingLocation=(locations)=>{
    let newLocation = Math.floor(Math.random()*locations.length)
    return locations[newLocation]
}


