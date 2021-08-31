import styled from 'styled-components'

//const CASTLE_POSTION_ARRAY_PLAYER= [[10,10],[10,11],[11,10],[11,11]]



const GrassTileStyle = styled.div`
    background: green;
    height: 50px;
    width: 50px;
    border: 1px solid black;
    
`
const HouseTileStyle = styled.div`
    background-image: url("assets/house.jpg");
    background-repeat: no-repeat;
    background-position: center;
    height: 50px;
    width: 50px;
    border: 1px solid black;
`
const FarmTileStyle = styled.div`
    background-image: url("assets/farm.jpg");
    background-repeat: no-repeat;
    background-position: center;
    height: 50px;
    width: 50px;
    border: 1px solid black;
`
const BarracksTileStyle = styled.div`
    background-image: url("assets/barracks.jpg");
    background-repeat: no-repeat;
    background-position: center;
    height: 50px;
    width: 50px;
    border: 1px solid black;
`

const CastleLeftTopStyle = styled.div`
    background-image: url("assets/castlelt.jpg");
    background-repeat: no-repeat;
    background-position: center;
    border-sytle: none;
    height: 50px;
    width: 50px;
    border-top: 2px solid black;
    border-left: 2px solid black;
`
const CastleLeftBottomStyle = styled.div`
    background-image: url("assets/castlelb.jpg");
    background-repeat: no-repeat;
    background-position: center;
    height: 51px;
    width: 50px;
    border-bottom: 1px solid black;
    border-left: 2px solid black;    
`
const CastleRightTopStyle = styled.div`
    background-image: url("assets/castlert.jpg");
    background-repeat: no-repeat;
    background-position: center;
    height: 50px;
    width: 50px;
    border-top: 2px solid black;
    border-right: 2px solid black;
`
const CastleRightBottomStyle = styled.div`
    background-image: url("assets/castlerb.jpg");
    background-repeat: no-repeat;
    background-position: center;
    height: 51px;
    width: 50px;
    border-bottom: 1px solid black;
    border-right: 2px solid black;
`
const Wrapper = styled.div`
    &:hover ${GrassTileStyle}{
        transform: scale(1.2)
    }
`

const selectStyle = (style) => {
    switch (style) {
        case "grass":
            return GrassTileStyle;
        case "house":
            return HouseTileStyle;
        case "castlelt":
            return CastleLeftTopStyle;
        case "castlert":
            return CastleRightTopStyle;
        case "castellb":
            return CastleLeftBottomStyle;
        case "castlerb":
            return CastleRightBottomStyle;
        default:
            break;
    }
}

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

export {GrassTileStyle, HouseTileStyle, FarmTileStyle, BarracksTileStyle, CastleLeftBottomStyle, CastleRightTopStyle, CastleRightBottomStyle, CastleLeftTopStyle, Wrapper, isPlayerCastle, selectStyle}