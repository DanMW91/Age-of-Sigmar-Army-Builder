import {
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
  useRef,
} from "react";
import { retrieveUnits } from "../../firebase-api/firebase-api";
import AuthContext from "../../store/auth-context";
import UnitSelectContainer from "./UnitSelectContainer";
import classes from "./UnitSelect.module.css";

const UnitSelect = (props) => {
  const [displayUnits, setDisplayUnits] = useState();
  const authCtx = useContext(AuthContext);

  const mounted = useRef(true);

  const setUnits = useCallback(async () => {
    const userId = authCtx.userId;
    const token = authCtx.token;
    const units = await retrieveUnits(userId, token);
    if (mounted) setDisplayUnits(units);
  }, [authCtx.token, authCtx.userId, mounted]);

  useLayoutEffect(() => {
    (async () => {
      await setUnits();
    })();

    return function cleanup() {
      mounted.current = false;
    };
  }, [authCtx, setUnits]);

  return (
    <>
      {displayUnits && (
        <div className={classes.unitSelectList}>
          {displayUnits.leaders[1] && (
            <UnitSelectContainer
              onSetUnits={setUnits}
              containerType={"Leaders"}
              units={displayUnits.leaders.slice(1)}
            />
          )}
          {displayUnits.battleline[1] && (
            <UnitSelectContainer
              onSetUnits={setUnits}
              containerType={"Battleline"}
              units={displayUnits.battleline.slice(1)}
            />
          )}
          {displayUnits.artillery[1] && (
            <UnitSelectContainer
              onSetUnits={setUnits}
              containerType={"Artillery"}
              units={displayUnits.artillery.slice(1)}
            />
          )}
          {(displayUnits.behemoths[1] || displayUnits.monsters[1]) && (
            <UnitSelectContainer
              onSetUnits={setUnits}
              containerType={"Behemoths"}
              units={displayUnits.behemoths
                .slice(1)
                .concat(displayUnits?.monsters.slice(1))}
            />
          )}
          {displayUnits.other[1] && (
            <UnitSelectContainer
              onSetUnits={setUnits}
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
