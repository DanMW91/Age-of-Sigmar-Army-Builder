import {useState} from 'react'
import classes from './Army.module.css'
import Header from '../components/Header/Header'
import ArmyList from "../components/ArmyList/ArmyList";
import AddUnitModal from '../components/AddUnits/AddUnitModal';
import ArmiesModal from '../components/ArmiesModal/ArmiesModal'

const Army = () => {

 const [loadedArmy, setLoadedArmy] = useState()
 const [showAddUnitModal, setShowAddUnitModal] = useState(false)
 const [showArmiesModal, setShowArmiesModal] = useState(false)
const [displayingArmy, setDisplayingArmy] = useState(false)


  const onAddUnitHandler = (e) => {
    e.preventDefault();
    setShowAddUnitModal(false);
  };
  
  const openAddUnitModalHandler = () => {
    setShowAddUnitModal(true);
  };

  const onCloseModalHandler = () => {
    setShowAddUnitModal(false);
    setShowArmiesModal(false)
  };

  const openArmiesModalHandler = ()=> {
    setShowArmiesModal(true)
  }




  return ( 
    <>
     
    {showAddUnitModal && (
        <AddUnitModal
          onCloseModal={onCloseModalHandler}
          onAddUnit={onAddUnitHandler}
        />
      )}

     <Header />
     <div className={classes.button} onClick={openArmiesModalHandler}>
        <h4>Select Army</h4>
      </div>
      {displayingArmy && 
      <div className={classes.button} onClick={openAddUnitModalHandler}>
        <h4>Add Unit</h4>
      </div>}

    {showArmiesModal && <ArmiesModal onCloseModal={onCloseModalHandler}/>}

    {loadedArmy && <ArmyList />}
    
  
  
  </>
  )
};

export default Army;
