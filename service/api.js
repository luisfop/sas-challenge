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

export const deleteCalendar = (id, token) => {
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
    let createResponse = await axios.post(
      `${baseURL}/calendar_patterns`,
      {
        calendar_patterns: {
          bg_color: newCalendar.bg_color,
          text_color: newCalendar.text_color,
          active: +newCalendar.checked,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("funfou");
    return createResponse;
  } catch (e) {
    //TODO: ERROR
    console.log("error on createNewCaledar", e);
    return { error: 400 };
  }
};

export const updateCalendar = async (id, token, updatedProduct) => {
  try {
    let updateResponse = await axios.put(
      `${baseURL}/calendar_patterns/${id})`,
      {
        calendar_patterns: {
          bg_color: updatedProduct.bg_color,
          text_color: updatedProduct.text_color,
          active: +updatedProduct.checked,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("funfou");
    console.log("updateResponse ->>>>>", updateResponse);

    return updateResponse;
  } catch (e) {
    //TODO: ERROR
    console.log("error on createNewCaledar", e);
    return { error: 400 };
  }
};
