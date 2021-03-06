import React, {
  useState,
  useReducer,
  useEffect,
  useLayoutEffect,
} from "react";
import { storeArmy, sendRefreshToken } from "../firebase-api/firebase-api";

import produce from "immer";

const AuthContext = React.createContext({
  token: "",
  userId: "",
  userArmy: {},
  userName: "",
  isLoggedIn: false,
  isLoading: false,
  login: () => {},
  logout: () => {},
  addUnit: () => {},
});

const armyReducer = (state, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "UNLOAD-ARMY":
        return (draft = {});

      case "LOAD-ARMY":
        return action.val;

      case "ADD-UNIT":
        draft.units[`${action.unitType}`].push(action.unit);

        break;
      case "DELETE-UNIT":
        draft.units[`${action.unitType}`] = draft.units[
          `${action.unitType}`
        ].filter((unit) => unit.id !== action.unitId || unit === 0);

        break;

      case "ADD-TO-BATTALION":
        draft.units[`${action.unitType}`][action.unitIndex].inBattalion =
          action.battalion;

        break;
      case "ADD-BATTALION":
        if (!draft.activeBattalions) {
          draft.activeBattalions = [action.battalionObj];
        } else {
          draft.activeBattalions.push(action.battalionObj);
        }
        break;
      case "REMOVE-BATTALION":
        draft.activeBattalions = draft.activeBattalions.filter(
          (battalion) => battalion?.battalionId !== action.battalionId
        );

        action.unitTypeArr.forEach((type) => {
          draft.units[`${type}`].slice(1).forEach((unit, i) => {
            if (action.unitIds.includes(unit.id)) {
              draft.units[`${type}`][i + 1].inBattalion = false;
            }
          });
        });
        break;

      default:
        throw new Error("invalid action in army reducer");
    }
  });

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userArmy, dispatchUserArmy] = useReducer(armyReducer, {});
  const [armyLoaded, setArmyLoaded] = useState(false);
  const [userName, setUserName] = useState("");

  const userIsLoggedIn = !!token;

  useLayoutEffect(() => {
    setIsLoading(true);
    const refreshToken = localStorage.getItem("refreshToken");
    (async () => {
      if (!token && refreshToken) {
        const { userId, token, userNameResult } = await sendRefreshToken(
          refreshToken
        );

        loginHandler(token, userId, userNameResult, refreshToken);
      }
      setIsLoading(false);
    })();
  }, [token]);

  const setArmyHandler = (army) => {
    dispatchUserArmy({
      type: "LOAD-ARMY",
      val: army,
    });
    setArmyLoaded(true);
  };

  const unloadArmy = () => {
    setArmyLoaded(false);
  };

  const loginHandler = (token, userId, name, refreshToken) => {
    setUserId(userId);
    setToken(token);
    setUserName(name);

    // setIsLoading(true);

    localStorage.setItem("refreshToken", refreshToken);
    // setIsLoading(false);
  };

  useEffect(() => {
    if (!userIsLoggedIn) return;

    if (userArmy?.units) {
      const sendUpdatedArmy = async () => {
        try {
          setIsLoading(true);
          await storeArmy(userId, userArmy, token);
          setIsLoading(false);
        } catch (err) {
          console.err(err);
          setIsLoading(false);
        }
      };
      sendUpdatedArmy();
    }
  }, [userArmy, token, userIsLoggedIn, userId]);

  const logoutHandler = () => {
    localStorage.removeItem("refreshToken");
    setUserId(null);
    setToken(null);
    setArmyLoaded(false);
    dispatchUserArmy({
      type: "UNLOAD-ARMY",
    });
  };

  const addUnitHandler = (unitObj) => {
    if (unitObj.current.type)
      dispatchUserArmy({
        type: "ADD-UNIT",
        unitType: unitObj.current.type,
        unit: unitObj.current.unit,
      });
    if (unitObj.current.unitType)
      dispatchUserArmy({
        type: "ADD-UNIT",
        unitType: unitObj.current.unitType,
        unit: unitObj.current,
      });
  };

  const addToBattalionHelperFn = (unitTypeArr, unitType, battalionObj) => {
    unitTypeArr.forEach((batUnit) => {
      userArmy.units[`${unitType}`].forEach((unit, i) => {
        if (batUnit.id === unit.id) {
          dispatchUserArmy({
            type: "ADD-TO-BATTALION",
            unitType,
            unitIndex: i,
            battalion: battalionObj,
          });
        }
      });
    });
  };

  const addBattalionHandler = (battalionUnitsArr, battalionName) => {
    const battalionId = Math.random();
    const battalionObj = {
      battalionName,
      battalionId,
    };

    const leaders = battalionUnitsArr.filter(
      (unit) => unit.unitType === "leaders"
    );
    const battleline = battalionUnitsArr.filter(
      (unit) => unit.unitType === "battleline"
    );
    const monsters = battalionUnitsArr.filter(
      (unit) => unit.unitType === "monsters"
    );
    const artillery = battalionUnitsArr.filter(
      (unit) => unit.unitType === "artillery"
    );
    const other = battalionUnitsArr.filter((unit) => unit.unitType === "other");

    if (leaders[0]) {
      addToBattalionHelperFn(leaders, "leaders", battalionObj);
    }
    if (battleline[0]) {
      addToBattalionHelperFn(battleline, "battleline", battalionObj);
    }
    if (monsters[0]) {
      addToBattalionHelperFn(monsters, "monsters", battalionObj);
    }
    if (artillery[0]) {
      addToBattalionHelperFn(artillery, "artillery", battalionObj);
    }
    if (other[0]) {
      addToBattalionHelperFn(other, "other", battalionObj);
    }

    dispatchUserArmy({
      type: "ADD-BATTALION",
      battalionObj,
    });
  };

  const setLoadingHandler = (loading) => {
    setIsLoading(loading);
  };

  const deleteBattalionHandler = (battalionId, unitTypeArr, unitIds) => {
    dispatchUserArmy({
      type: "REMOVE-BATTALION",
      battalionId,
      unitTypeArr,
      unitIds,
    });
  };

  const deleteUnitHandler = (unitType, unitId) => {
    dispatchUserArmy({
      type: "DELETE-UNIT",
      unitType,
      unitId,
    });
  };

  const contextValue = {
    token: token,
    userId: userId,
    userArmy: userArmy,
    userName,
    isLoggedIn: userIsLoggedIn,
    isLoading,
    login: loginHandler,
    logout: logoutHandler,
    addUnit: addUnitHandler,
    deleteUnit: deleteUnitHandler,
    setLoading: setLoadingHandler,
    addBattalion: addBattalionHandler,
    deleteBattalion: deleteBattalionHandler,
    setArmy: setArmyHandler,
    unloadArmy,
    armyLoaded,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
