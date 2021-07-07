import classes from "./UnitStats.module.css";

const UnitStats = (props) => {
  return (
    <div className={classes.stats}>
      <table>
        <thead>
          <tr>
            <td>Save</td>
            <td>Move</td>
            <td>Bravery</td>
            <td>Wounds</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.stats.save}+</td>
            <td>{props.stats.move}"</td>
            <td>{props.stats.bravery}</td>
            <td>{props.stats.wounds}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UnitStats;
