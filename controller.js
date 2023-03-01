const express = require("express");
const router = express.Router();
var request = require("request");

const clientID = "aacd595520ea45a184e3aaf8879f2650";
const clientSecret = "6622f8d9e484440689ea1268ac1af23e";
let accessToken =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVGQUQ4RTE5MjMwOURFRUJCNzBCMzU5M0E2MDU3OUFEMUM5NjgzNDkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJYNjJPR1NNSjN1dTNDeldUcGdWNXJSeVdnMGsifQ.eyJuYmYiOjE2Nzc2NDEwNzIsImV4cCI6MTY3NzcyNzQ3MiwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiJhYWNkNTk1NTIwZWE0NWExODRlM2FhZjg4NzlmMjY1MCIsInNjb3BlIjpbImJhc2ljIl19.delQ9xFZbkjpf13iN-yqMzOiB0-O5UCkYysptAgeRj0n6X14JRfXoxsR3wFp4rPd44zSp_mM07sMgDZhlnCGdQgyEmAFgd73-0V8fv2gHEueC-m2rGlwZOzmF6_BfMOzQcZNw9e78XHRaZatKo8yC_LGw7LjcL5g7Miepu6tIt6aC3V9Dt4UxknA-kSIQVKuN8ktgEpwaQeZK5WEm6mqtkwamqezXWTW2CdXCRqyxhS158_4oDFp4XG42KSwwu4StvHZqxn_aJh15VShlTt-tzZpksy2FJqvvEMaU_tsunxIHHBKM9DTCefP_W26wR5lomCEqslrHa3eZKCaiDrFDQ";

const baseRequestOption = {
  method: "POST",
  url: "https://platform.fatsecret.com/rest/server.api",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    Authorization: "Bearer " + accessToken,
  },
  json: true,
};

//Refresh authentication token
router.get("/auth", async (req, res) => {
  var options = {
    method: "POST",
    url: "https://oauth.fatsecret.com/connect/token",
    auth: {
      user: clientID,
      password: clientSecret,
    },
    headers: { "content-type": "application/x-www-form-urlencoded" },
    form: {
      grant_type: "client_credentials",
      scope: "basic",
    },
    json: true,
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    accessToken = body.access_token;
    res.send(accessToken);
  });
});

router.get("/search", async (req, res) => {
  var options = {
    ...baseRequestOption,
    qs: {
      format: "json",
      method: "foods.search",
      search_expression: req.query.search_expression,
      max_results: "10",
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    res.send(body);
  });
});

module.exports = router;
