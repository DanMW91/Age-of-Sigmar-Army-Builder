import {useContext} from 'react'
import { retrieveArmy } from '../../firebase-api/firebase-api'
import AuthContext from '../../store/store'


const ArmyItem = (props) => {
    const authCtx = useContext(AuthContext)

    const chooseArmyHandler = async () => {
        const armyId = props.armyId;
        const userId = authCtx.userId;
        const token = authCtx.token;

       const selectedArmy = await retrieveArmy(userId, token, armyId)

       authCtx.setArmy(selectedArmy)

    }

   
    return (
        <li onClick={chooseArmyHandler}>{props.armyName}</li>
    )
}




const ArmiesList = (props) => {

const armiesArray=Object.values(props.armies)
console.log(armiesArray);
    return (
    <div>
        <ul>
            {armiesArray.map((army)=> 
                <ArmyItem 
                key={army.armyId}
                armyId={army.armyId}
                armyName={army.newArmyName}
                />
            )}
        </ul>
    </div>
    )
}

export default ArmiesList