import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./config/constant";
const authenticationService = {
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      axios
        .post(API_URL + "partner-permission", {
          partnerID: localStorage.getItem("partner_id"),
        })
        .then((res) => {
          const { data } = res?.data;
          data.role = "Partner";
          resolve(data);
        })
        .catch((e) => {
          resolve({ role: "Partner" });
        });
    });
  },
};

export default authenticationService;
