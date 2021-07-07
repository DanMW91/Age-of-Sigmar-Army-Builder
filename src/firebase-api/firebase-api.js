export const storeArmy = async (userId, userArmy, token) => {
  if (!token) return;
  try {
    if (!userArmy) {
      const response = await fetch(
        `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/army.json?auth=${token}`,
        {
          method: "PUT",
          body: JSON.stringify({
            allegience: "",
            allUnits: {
              leaders: [0],
              battleline: [0],
              artillery: [0],
              monsters: [0],
              behemoths: [0],
              other: [0],
            },
            activeBattalions: [0],
            units: {
              leaders: [0],
              battleline: [0],
              artillery: [0],
              monsters: [0],
              behemoths: [0],
              other: [0],
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(response);
      }
    }
    if (userArmy) {
      const response = await fetch(
        `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/army.json?auth=${token}`,
        {
          method: "PUT",
          body: JSON.stringify(userArmy),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error.message);
      }
    }
  } catch (err) {
    console.error(err);
  }
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
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/allUsers.json?auth=${token}`,
      {
        method: "POST",
        body: JSON.stringify(userName),
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
    const formattedNames = Object.values(userNames).map((user) =>
      user.toLowerCase()
    );

    if (formattedNames.includes(userName.toLowerCase())) {
      throw new Error("Username already taken.");
    }
  } catch (err) {
    throw new Error(err);
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

    await storeArmy(userId);

    await storeUserName(userId, enteredUserName, token);

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

    const data = await fetch(
      `https://sigmar-ec5f7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/army.json?auth=${token}`
    );
    const armyData = await data.json();
    return { userId, token, armyData };
  } catch (err) {
    throw new Error(err.message);
  }
};
