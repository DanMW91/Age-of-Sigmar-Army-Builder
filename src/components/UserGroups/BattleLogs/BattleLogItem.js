import { useState } from "react";
import BattleViewModal from "./BattleViewModal";
import Card from "../../UI/Card";
import classes from "./BattleLogItem.module.css";

const BattleLogItem = (props) => {
  const [showBattleModal, setShowBattleModal] = useState(false);

  console.log(props);
  const battleName = props.log.battleName;
  const player1 = props.log.yourName;
  const player2 = props.log.opponentName;
  const date = props.log.date;
  const winner = props.log.winner;

  return (
    <>
      {showBattleModal && (
        <BattleViewModal
          log={props.log}
          onCloseModal={() => setShowBattleModal(false)}
        />
      )}

      <Card
        className={classes.battleLog}
        onClick={() => setShowBattleModal(true)}
      >
        <div className={`${classes.logDetail} ${classes.battleName}`}>
          {battleName}
        </div>
        <div className={classes.logDetail}>
          {player1} vs. {player2}
        </div>
        <div className={classes.logDetail}>{date}</div>
        <div className={classes.logDetail}>
          <div className={classes.winner}>
            Winner: <br />
            {winner}
          </div>
        </div>
      </Card>
    </>
  );
};

export default BattleLogItem;
