import { useContext, useLayoutEffect, useState } from "react";
import { retrieveUnits } from "../../firebase-api/firebase-api";
import AuthContext from "../../store/auth-context";
import UnitSelectContainer from "./UnitSelectContainer";

const UnitSelect = (props) => {
  const [displayUnits, setDisplayUnits] = useState();
  const authCtx = useContext(AuthContext);

  useLayoutEffect(() => {
    const userId = authCtx.userId;
    const token = authCtx.token;
    let mounted = true;

    (async () => {
      const units = await retrieveUnits(userId, token);
      console.log(units);
      if (mounted) setDisplayUnits(units);
    })();

    return function cleanup() {
      mounted = false;
    };
  }, [authCtx]);
  console.log(displayUnits);
  return (
    <>
      {displayUnits && (
        <div>
          {displayUnits.leaders[1] && (
            <UnitSelectContainer
              containerType={"Leaders"}
              units={displayUnits.leaders.slice(1)}
            />
          )}
          {displayUnits.battleline[1] && (
            <UnitSelectContainer
              containerType={"Battleline"}
              units={displayUnits.battleline.slice(1)}
            />
          )}
          {displayUnits.artillery[1] && (
            <UnitSelectContainer
              containerType={"Artillery"}
              units={displayUnits.artillery.slice(1)}
            />
          )}
          {(displayUnits.behemoths[1] || displayUnits.monsters[1]) && (
            <UnitSelectContainer
              containerType={"Behemoths"}
              units={displayUnits.behemoths
                .slice(1)
                .concat(displayUnits?.monsters.slice(1))}
            />
          )}
          {displayUnits.other[1] && (
            <UnitSelectContainer
              containerType={"Other"}
              units={displayUnits.other.slice(1)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default UnitSelect;
