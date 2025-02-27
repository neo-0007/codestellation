const BaseModel = require("./base.model");

class User extends BaseModel {
    constructor({ name, email, phone, gender, dob, password }) {
        super('groups'); // Pass the table name to the BaseModel
        this.groupName = groupName;
        this.groupID = groupID;
    }
}

module.exports = User;
