import classes from "./UnitAttacks.module.css";

const UnitAttacks = (props) => {
  return (
    <div className={classes.attacks}>
      <table>
        <thead>
          <tr>
            <td>Range</td>
            <td>Attacks</td>
            <td>To Hit</td>
            <td>To Wound</td>
            <td>Rend</td>
            <td>Dam</td>
          </tr>
        </thead>
        <tbody>
          {props.attacks.map((attack) => {
            return (
              <tr>
                <td>{attack.range}"</td>
                <td>{attack.attacks}</td>
                <td>{attack.toHit}+</td>
                <td>{attack.toWound}+</td>
                <td>-{attack.rend}</td>
                <td>{attack.damage}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UnitAttacks;
