import { useState } from "react";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import classes from "./Allegience.module.css";

const Allegience = (props) => {
  const [displayWarscrollModal, setDisplayWarscrollModal] = useState(false);

  const onDisplayWarscrollHandler = () => {
    setDisplayWarscrollModal(true);
  };

  const onCloseModalHandler = () => {
    setDisplayWarscrollModal(false);
  };

  return (
    <>
      {displayWarscrollModal && (
        <Modal
          className={classes.warscrollmodal}
          onCloseModal={onCloseModalHandler}
        >
          <img
            className={classes.warscroll}
            src={process.env.PUBLIC_URL + props.warscrollPath}
            alt=""
          />
        </Modal>
      )}
      <Card className={classes.unit} onClick={onDisplayWarscrollHandler}>
        <div className={classes.unitname}>
          <h2>Settlers Gain</h2>
        </div>
      </Card>
    </>
  );
};

export default Allegience;
