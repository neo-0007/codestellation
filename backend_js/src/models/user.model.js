const BaseModel = require("./base.model");

class User extends BaseModel{
    constructor({ name, email, phone, gender,dob, password }) {
        super('users'); // Pass the table name to the BaseModel
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.username = username;
        this.gender = gender;
        this.dob = dob;
    }
}

module.exports = User;
