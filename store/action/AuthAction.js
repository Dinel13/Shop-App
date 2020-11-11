export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

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
    dispatch({ type: SIGNUP });
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
    console.log(resData);
    dispatch({ type: LOGIN });
  };
};
