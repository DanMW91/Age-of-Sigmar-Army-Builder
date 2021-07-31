export const storeArmy = async (userId, userArmy, token) => {
  try {
    const response = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/armies/${userArmy.armyId}.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(userArmy),
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error.message);
    }
  } catch (err) {
    console.error(err);
  }
};

export const retrieveArmy = async (userId, token, armyId) => {
  try {
    const armyData = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/armies/${armyId}.json?auth=${token}`
    );
    const userArmy = await armyData.json();

    return userArmy;
  } catch (err) {
    console.error(err);
  }
};

export const createNewArmy = async (userId, token, newArmyName, armyId) => {
  const newArmy = {
    armyId,
    armyName: newArmyName,
    allegience: "",
    activeBattalions: [0],
    units: {
      leaders: [0],
      battleline: [0],
      artillery: [0],
      monsters: [0],
      behemoths: [0],
      other: [0],
    },
  };

  try {
    const response = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/armies/${armyId}.json?auth=${token}`,
      {
        method: "POST",
        body: JSON.stringify(newArmy),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(response);
    }

    const res = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/allArmies/${armyId}.json?auth=${token}`,
      {
        method: "POST",
        body: JSON.stringify({ newArmyName, armyId }),
      }
    );
    if (!res.ok) {
      throw new Error(res);
    }
  } catch (err) {
    console.error(err);
  }

  return newArmy;
};

export const storeUserName = async (userId, userName, token) => {
  try {
    const response = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/userName.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(userName),
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error.message);
    }
    const res = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/allUsers/${userName}.json?auth=${token}`,
      {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );
    const nameData = await res.json();
    if (!response.ok) {
      throw new Error(nameData.error.message);
    }
  } catch (err) {
    console.err(err);
  }
};

const checkUserNameIsUnique = async (userName) => {
  try {
    const userData = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/allUsers.json`
    );
    const userNames = await userData.json();

    if (!userNames) return;

    const formattedNames = Object.keys(userNames).map((user) =>
      user.toLowerCase()
    );

    if (formattedNames.includes(userName.toLowerCase())) {
      throw new Error("Username already taken.");
    }
  } catch (err) {
    throw new Error(err);
  }
};

const createAllUnitsFrame = async (userId, token) => {
  try {
    const response = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/allUnits/.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify({
          leaders: [0],
          battleline: [0],
          artillery: [0],
          monsters: [0],
          behemoths: [0],
          other: [0],
        }),
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error.message);
    }
  } catch (err) {
    console.error(err);
  }
};

export const registerUser = async (
  enteredEmail,
  enteredPassword,
  enteredUserName
) => {
  try {
    await checkUserNameIsUnique(enteredUserName);

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDw_R-kZ2yj56Xri9CWKlk2Yuj4Gq2wo4g",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const results = await response.json();

    if (!response.ok) {
      throw new Error(results.error.message);
    }

    const { localId: userId, idToken: token } = results;

    await storeUserName(userId, enteredUserName, token);
    await createAllUnitsFrame(userId, token);

    return { userId, token };
  } catch (err) {
    throw new Error(err.message);
  }
};

export const loginUser = async (enteredEmail, enteredPassword) => {
  try {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDw_R-kZ2yj56Xri9CWKlk2Yuj4Gq2wo4g",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const results = await response.json();
    if (!response.ok) {
      throw new Error(results.error.message);
    }
    const { localId: userId, idToken: token } = results;

    const userNameResponse = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/userName.json?auth=${token}`
    );

    const userNameResult = await userNameResponse.json();

    if (!userNameResponse.ok) {
      throw new Error(results.error.message);
    }

    return { userId, token, userNameResult };
  } catch (err) {
    throw new Error(err.message);
  }
};

export const retrieveArmies = async (userId, token) => {
  try {
    const armiesData = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/allArmies.json?auth=${token}`
    );
    const allArmies = await armiesData.json();

    if (!armiesData.ok) {
      throw new Error(allArmies.error);
    }

    return allArmies;
  } catch (err) {
    console.error(err);
  }
};

export const deleteArmy = async (userId, token, armyId) => {
  try {
    const deleteArmyResponse = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/allArmies/${armyId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    const result = await deleteArmyResponse.json();

    if (!deleteArmyResponse.ok) {
      throw new Error(result);
    }
  } catch (err) {
    console.error(err);
  }
};

export const retrieveUnits = async (userId, token) => {
  try {
    const unitsData = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/allUnits.json?auth=${token}`
    );
    const allUnits = await unitsData.json();

    if (!unitsData.ok) {
      throw new Error(allUnits.error);
    }

    return allUnits;
  } catch (err) {
    console.error(err);
  }
};

export const storeNewUnit = async (userId, token, unitObj, unitType) => {
  let units = await retrieveUnits(userId, token);

  units[`${unitType}`].push(unitObj);

  try {
    const response = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/allUnits/.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(units),
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error.message);
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteUnit = async (userId, token, unitType, unitId) => {
  try {
    let allUnits = await retrieveUnits(userId, token);
    const newArray = allUnits[unitType].filter((unit) => unit.id !== unitId);
    allUnits[unitType] = newArray;

    const response = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/allUnits/.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(allUnits),
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error.message);
    }
  } catch (err) {
    console.error(err);
  }
};

export const createGroup = async (
  userId,
  token,
  userName,
  groupName,
  groupId
) => {
  try {
    const response = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/groups/.json?auth=${token}`,
      {
        method: "POST",
        body: JSON.stringify({ groupId, groupName }),
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error.message);
    }

    const res = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/groups/${groupId}.json?auth=${token}`,
      {
        method: "POST",
        body: JSON.stringify({
          groupName,
          groupId,
          members: [{ userId, userName, admin: true }],
        }),
      }
    );
    const groupResponse = await res.json();

    if (!res.ok) {
      throw new Error(groupResponse.error);
    }
  } catch (err) {
    console.error(err);
  }
};

export const fetchGroups = async (userId, token) => {
  try {
    const response = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/groups.json?auth=${token}`
    );
    const groupsData = await response.json();

    if (!response.ok) {
      throw new Error(response);
    }

    return groupsData;
  } catch (err) {
    console.error(err);
  }
};

export const fetchActiveGroup = async (token, groupId) => {
  try {
    const response = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/groups/${groupId}.json?auth=${token}`
    );
    const groupData = await response.json();

    if (!response.ok) {
      throw new Error(response);
    }

    return groupData;
  } catch (err) {
    console.error(err);
  }
};

export const sendGroupRequest = async (token, groupId, userName, groupName) => {
  try {
    const response = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/allUsers/${userName}.json?auth=${token}`
    );
    const userIdObj = await response.json();
    if (!userIdObj) throw new Error("no such user!");
    const userId = Object.values(userIdObj)[0].userId;

    const checkGrp = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/groupReqs/${userId}/${groupId}.json?auth=${token}`
    );
    const reqExists = await checkGrp.json();

    if (reqExists) throw new Error("Already invited");

    const groupReq = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/groupReqs/${userId}/${groupId}.json?auth=${token}`,
      {
        method: "POST",
        body: JSON.stringify({
          groupId,
          groupName,
        }),
      }
    );
    if (!groupReq.ok) throw new Error(groupReq);
  } catch (err) {
    console.error(err);
  }
};

export const fetchGroupReqs = async (userId, token) => {
  try {
    const response = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/groupReqs/${userId}.json?auth=${token}`
    );

    const res = await response.json();
    if (!res) return;
    const groupReqs = Object.values(res);
    return groupReqs;
  } catch (err) {
    console.error(err);
  }
};

export const deleteGroupRequest = async (userId, groupId, token) => {
  try {
    const deleteResponse = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/groupReqs/${userId}/${groupId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    const deleteResult = deleteResponse.json();
    if (!deleteResponse.ok) {
      throw new Error(deleteResult);
    }
  } catch (err) {
    console.error(err);
  }
};

export const addUserToGroup = async (
  userId,
  userName,
  token,
  groupId,
  groupName
) => {
  try {
    // retrieving existing group data in order to modify
    const response = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/groups/.json?auth=${token}`,
      {
        method: "POST",
        body: JSON.stringify({ groupId, groupName }),
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error.message);
    }
    const groupData = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/groups/${groupId}.json?auth=${token}`
    );

    const fetchedGroups = await groupData.json();

    // Adding new user to the group members array and storing the new user group in firebase database

    const newGroupsObj = Object.values(fetchedGroups)[0];

    newGroupsObj.members.push({ userId, userName, admin: false });

    const res = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/groups/${groupId}.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify({ newGroupsObj }),
      }
    );
    const groupRes = await res.json();
    if (!res.ok) throw new Error(groupRes);

    // deleting the group request

    await deleteGroupRequest(userId, groupId, token);
  } catch (err) {
    console.error(err);
  }
};

export const sendNotification = async (token, notificationObj) => {
  const targetUser = notificationObj.targetUserName;
  const notificationId = notificationObj.notificationId;
  const notificationType = notificationObj.type;

  try {
    const response = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/allUsers/${targetUser}/.json?auth=${token}`
    );
    console.log(response);
    const result = await response.json();

    if (!response.ok) {
      console.log(response);
      throw new Error(response.error);
    }
    const targetUserId = Object.values(result)[0].userId;
    console.log(targetUserId);

    const secondResponse = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/notifications/${targetUserId}/${notificationId}/${notificationType}/.json?auth=${token}`,
      { method: "POST", body: JSON.stringify(notificationObj) }
    );
    console.log(secondResponse);
    const secondResult = await secondResponse.json();

    if (!secondResponse.ok) {
      throw new Error(secondResponse.error);
    }
  } catch (err) {
    console.error(err);
  }
};

export const fetchNotifications = async (token, userId) => {
  try {
    const response = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/notifications/${userId}/.json?auth=${token}`
    );

    const notificationsResponse = await response.json();

    if (!response.ok) {
      throw new Error(response.error);
    }
    return notificationsResponse;
  } catch (err) {
    console.error(err);
  }
};

export const deleteLogNotification = async (userId, token, notificationId) => {
  try {
    const response = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/notifications/${userId}/${notificationId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    console.log(response);
    if (!response.ok) {
      console.log(response);
      throw new Error(response.error);
    }
  } catch (err) {
    console.error(err);
  }
};
