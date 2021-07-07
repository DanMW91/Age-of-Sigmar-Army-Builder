import classes from "./Phase.module.css";

const Phase = (props) => {
  return <span className={classes.phase}>{props.children}</span>;
};

export default Phase;
