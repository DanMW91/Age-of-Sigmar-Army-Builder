import reactDOM from "react-dom";
import { Fragment } from "react";
import Card from "./Card";
import classes from "./Modal.module.css";

const Overlay = (props) => {
  return (
    <div className={classes.overlay} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {reactDOM.createPortal(
        <Fragment>
          <Overlay onClick={props.onCloseModal} />
          <Card className={`${classes.modal} ${props.className}`}>
            {props.children}
          </Card>
        </Fragment>,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default Modal;
