import {useContext, useState, useRef} from 'react'
import AuthContext from '../../store/store'
import Modal from '../UI/Modal'
import {createNewArmy} from '../../firebase-api/firebase-api'


const NewArmyForm = (props) => {
    const authCtx = useContext(AuthContext)
    const armyNameRef = useRef();
    



    const addNewArmyHandler = async (e) =>{
        e.preventDefault()
        const userId = authCtx.userId
        const token = authCtx.token 
        const newArmyName = armyNameRef.current.value;
        const armyId = Math.random()

        const newArmy = await createNewArmy(userId, token, newArmyName, armyId)

        authCtx.setArmy(newArmy)

        props.onCreateArmy()
        
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
    <Modal onCloseModal={props.onCloseModal}>
        <button onClick={showNewArmyFormHandler}>Add New Army</button>
        {showNewArmyForm && <NewArmyForm onCreateArmy={hideNewArmyFormHandler}/>}
    </Modal>
    )
}

export default ArmiesModal