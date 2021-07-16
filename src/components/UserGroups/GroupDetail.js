import { useState } from "react";
import Members from "./Members";
import classes from "./GroupDetail.module.css";

const GroupDetail = () => {
  const [displayPage, setDisplayPage] = useState("MEMBERS");

  const setMembersViewHandler = () => {
    setDisplayPage("MEMBERS");
  };

  const setBattleLogsViewHandler = () => {
    setDisplayPage("BATTLE-LOGS");
  };

  return (
    <section className={classes.groupDetail}>
      <nav className={classes.detailNav}>
        <div
          className={`${classes.detailNavItem} ${
            displayPage === "MEMBERS" ? classes.active : ""
          }`}
          onClick={setMembersViewHandler}
        >
          Members
        </div>
        <div
          className={`${classes.detailNavItem} ${
            displayPage === "BATTLE-LOGS" ? classes.active : ""
          }`}
          onClick={setBattleLogsViewHandler}
        >
          Battle Logs
        </div>
      </nav>
      {displayPage === "MEMBERS" && <Members />}
    </section>
  );
};

export default GroupDetail;
