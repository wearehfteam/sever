"use strict";

const util = require("util");
const mysql = require("mysql");
const db = require("../db");
const { join } = require("path");
const { json } = require("express");

module.exports = {
  get: (req, res) => {
    let sql = "SELECT * FROM decks";
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },

  getByUsername: (req, res) => {
    let sql = "SELECT * FROM user_deck WHERE username = ?";
    db.query(sql, [req.params.username], (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },

  saveUserDeck: (req, res) => {
    let data = req.body;
    console.log(data);

    let checkExist =
      "SELECT * FROM user_deck WHERE username = ? and deckid = ?";
    db.query(checkExist, [data.username, data.deckid], (err, response) => {
      if (err) throw err;
      if (response.length) {
        let sql =
          "UPDATE user_deck SET score = ? where username = ? and deckid = ?";
        db.query(
          sql,
          [data.score, data.username, data.deckid],
          (err, response) => {
            if (err) {
              res.json({ error: err });
            } else {
              res.json({ message: "success" });
            }
          }
        );
      } else {
        let sql = "INSERT INTO user_deck SET ?";
        db.query(sql, [data], (err, response) => {
          if (err) {
            res.json({ error: err });
          } else {
            res.json({ message: "success" });
          }
        });
      }
    });
  },
  deleteUserDeck: (req, res) => {
    let data = req.body;
    console.log(data);
    let sql = "DELETE FROM user_deck WHERE username = ? and deckid = ?";
    db.query(sql, [data.username, data.deckid], (err, response) => {
      if (err) throw err;
      res.json({ message: "Delete success!" });
    });
  },
};
