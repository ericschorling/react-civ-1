export const turnEnd =(board, ebuildingqueue, pbuildingqueue, etrainingqueue, ptrainingqueue)=>{
    
}
export const updateBuildingQueue =(buildingqueue) => {
    console.log(buildingqueue)
    if(buildingqueue.length > 0){
        if(buildingqueue[0].turns > 1){
            let newbuildingqueue = buildingqueue.map((building)=> building)
            console.log(newbuildingqueue)
            newbuildingqueue[0].turns -=1
            return newbuildingqueue
        }
    }
}