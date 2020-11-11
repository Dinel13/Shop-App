import { AsyncStorage } from "react-native";

//export const SIGNUP = "SIGNUP";
//export const LOGIN = "LOGIN";
export const AUTH_WITH_DATA = "AUTH_WITH_DATA";
export const LOGOUT = "LOGOUT"

export const AuthWithData = (userId, token) => {
  return { type: AUTH_WITH_DATA, token: token, userId: userId };
};

export const Signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBfdVRzwgssDItRf6Zi8ytfWy0dXBn_E_0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errResData = await response.json();
      const errorId = errResData.error.message;
      let pesan = "masalah terjadi di server";
      if (errorId === "EMAIL_EXISTS") {
        pesan = "Email sudah digunakan";
      }
      throw new Error(pesan);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(AuthWithData(resData.localId, resData.idToken));
    const expirationDate = new Date(
      //dibungkus Date agar hasil kembali ke objek date
      new Date().getTime() + parseInt(resData.expiresIn) * 1000 // dikali 1000 agar menjadi milisekon kareana getTime menghasilkan milisekon
    );
    saveDataToStrorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const Login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfdVRzwgssDItRf6Zi8ytfWy0dXBn_E_0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errResData = await response.json();
      const errorId = errResData.error.message;
      let pesan = "masalah terjadi di server";
      if (errorId === "EMAIL_NOT_FOUND") {
        pesan = "Email tidak bisa ditemukan";
      } else if (errorId === "INVALID_PASSWORD") {
        pesan = "Passord anda tidak benar";
      }
      throw new Error(pesan);
    }

    const resData = await response.json();
    dispatch(AuthWithData(resData.localId, resData.idToken));
    const expirationDate = new Date(
      //dibungkus Date agar hasil kembali ke objek date
      new Date().getTime() + parseInt(resData.expiresIn) * 1000 // dikali 1000 agar menjadi milisekon kareana getTime menghasilkan milisekon
    );
    saveDataToStrorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const Logout = () => {
  return{type : LOGOUT}
}

const saveDataToStrorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData", //sebagai keynya
    JSON.stringify({
      token: token,
      userId: userId,
      expDate: expirationDate.toISOString()
    })
  );
};
