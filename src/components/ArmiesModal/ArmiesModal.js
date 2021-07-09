import {v4 as uuidv4} from 'uuid';
import {useContext, useState, useRef} from 'react'
import AuthContext from '../../store/store'
import Modal from '../UI/Modal'
import {createNewArmy} from '../../firebase-api/firebase-api'
import classes from './Armies.module.css'

const NewArmyForm = (props) => {
    const authCtx = useContext(AuthContext)
    const armyNameRef = useRef();
    



    const addNewArmyHandler = async (e) =>{
        e.preventDefault()
        const userId = authCtx.userId
        const token = authCtx.token 
        const newArmyName = armyNameRef.current.value;
        const armyId = uuidv4()

        const newArmy = await createNewArmy(userId, token, newArmyName, armyId)

        authCtx.setArmy(newArmy)

        
       
        
    }

    return (
        <form onSubmit={addNewArmyHandler}>
            <label htmlFor="armyName">Army Name:</label>
            <input id='armyName' type='text' ref={armyNameRef} required/>
            <button type="submit">Add Army</button>
        </form>
    )

}





const ArmiesModal = (props) => {
const [showNewArmyForm, setShowNewArmyForm] = useState(false)

const showNewArmyFormHandler = () => {
    setShowNewArmyForm(true)
}
const hideNewArmyFormHandler = () => {
    setShowNewArmyForm(false)
}



    return (
    <Modal onCloseModal={props.onCloseModal} className={classes.armiesModal}>
        <button onClick={showNewArmyFormHandler}>Add New Army</button>
        {showNewArmyForm && <NewArmyForm />}
    </Modal>
    )
}

export default ArmiesModal