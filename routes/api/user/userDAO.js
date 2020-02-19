"use strict";
 
var Models = require("./user.model");
 
const getUsers = (criteria, fields) =>
new Promise((resolve, reject) => {
  Models.find(criteria, fields)
  .then(client => resolve(client))
  .catch(err => reject(err));
});
 
const createUser = objToSave =>
new Promise((resolve, reject) => {
  new Models(objToSave)
  .save()
  .then(client => resolve(client))
  .catch(err => {reject(err);
  console.log(err);
});
});
 
const updateUser = (criteria, dataToSet, options) =>
new Promise((resolve, reject) => {
  options.lean = true;
  options.new = true;
  Models.findOneAndUpdate(criteria, dataToSet, options)
    .then(client => resolve(client))
    .catch(err => reject(err));
});
 
const deleteUser = criteria =>
new Promise((resolve, reject) => {
  Models.findOneAndRemove(criteria)
  .exec()
  .then(client => resolve(client))
  .catch(err => reject(err));
});

module.exports = {
  updateUser: updateUser,
  createUser: createUser,
  deleteUser: deleteUser,
  getUsers: getUsers
};