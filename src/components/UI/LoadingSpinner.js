import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  return (
    <div className={classes.loaderContainer}>
      <div className={`${classes.loader} ${props.className}`}></div>
    </div>
  );
};

export default LoadingSpinner;
