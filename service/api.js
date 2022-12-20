import axios from "axios";

let baseURL = "https://sys-dev.searchandstay.com/api/admin";

export const getUserToken = () => {
  let getToken = localStorage.getItem("user");
  let tokenConvertido = JSON.parse(getToken);

  if (!tokenConvertido) {
    return;
  }

  return tokenConvertido.token;
};

export const getCalendar = async (token) => {
  try {
    let response = await axios.get(`${baseURL}/calendar_patterns`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (e) {
    return { status: 400 };
  }
};

export const deleteCalendar = async (id, token) => {
  try {
    axios.delete(`${baseURL}/calendar_patterns/${id})`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "delete",
    });
  } catch (error) {
    //TODO: ERROR
    console.log("Error delete", error);
  }
};

export const createNewCalendar = async (newCalendar) => {
  let token = getUserToken();
  try {
    await axios.post(
      `${baseURL}/calendar_patterns`,
      {
        calendar_patterns: {
          bg_color: "#FFFFFF",
          text_color: "#000000",
          active: 1,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    //TODO: ERROR
    console.log("error on createNewCaledar", e);
  }
};
