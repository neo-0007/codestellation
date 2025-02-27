const BaseModel = require("./base.model");

class Group extends BaseModel {
    constructor({ groupName }) {
        super('chat_groups'); // Pass the table name to the BaseModel
        this.group_name = groupName;
        this.group_id = `groupName_${Math.floor(Math.random() * 99999)}`;
    }
}

module.exports = Group;
