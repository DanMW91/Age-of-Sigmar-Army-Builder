import {useState} from 'react'
import Header from '../components/Header/Header'
import ArmyList from "../components/ArmyList/ArmyList";
import AddUnitModal from '../components/AddUnits/AddUnitModal';
const Army = () => {

  const [loadedArmy, setLoadedArmy] = useState()
 const [showAddUnitModal, setShowAddUnitModal] = useState(false)
  const onAddUnitHandler = (e) => {
    e.preventDefault();
    setShowAddUnitModal(false);
  };
  
  const onOpenAddUnitModalHandler = () => {
    setShowAddUnitModal(true);
  };

  const onCloseModalHandler = () => {
    setShowAddUnitModal(false);
  };
  return ( 
    <>
    
    {showAddUnitModal && (
        <AddUnitModal
          onCloseModal={onCloseModalHandler}
          onAddUnit={onAddUnitHandler}
        />
      )}

     <Header onOpenAddUnitModal={onOpenAddUnitModalHandler} />
    {loadedArmy && <ArmyList />}
    
  
  
  </>
  )
};

export default Army;
