import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./config/constant";
const authenticationService = {
  getCurrentUser(role) {
    return new Promise((resolve, reject) => {
      if (role === "Partner") {
        axios
          .post(API_URL + "partner-permission", {
            partnerID: localStorage.getItem("partner_id"),
          })
          .then((res) => {
            const { data } = res?.data;
            data.role = role;
            resolve(data);
          })
          .catch((e) => {
            resolve({ role: role });
          });
      } else {
        axios
          .post(API_URL + "admin-permission", {
            adminId: localStorage.getItem("adminId"),
          })
          .then((res) => {
            const { data } = res?.data;
            data.role = role;
            resolve(data);
          })
          .catch((e) => {
            resolve({ role: role });
          });
      }
    });
  },
};

export default authenticationService;
