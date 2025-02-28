const mysql = require("mysql2");
const config = require("../config/mysqlConfig");
const pool = mysql.createPool(config);
class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
    }

    save() {
        return new Promise((resolve, reject) => {
            const data = { ...this };
            delete data.tableName;

            const query = `INSERT INTO ${this.tableName} SET ?`;
            pool.query(query, data, (err, results) => {
                if (err) {
                    reject(err);
                }  else if (results.insertId) {
                    // Fetch the inserted row
                    const fetchQuery = `SELECT * FROM ${this.tableName} WHERE id = ?`;
                    pool.query(fetchQuery, [results.insertId], (fetchErr, fetchResults) => {
                        if (fetchErr) {
                            reject(fetchErr);
                        } else {
                            resolve(fetchResults[0]);
                        }
                    });
                } else {
                    reject(new Error("Insert operation failed."));
                }
            });
        });
    }

    find(data = {}) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM ${this.tableName}`;
            const values = [];

            if (Object.keys(data).length > 0) {
                const conditions = Object.keys(data)
                    .map((key) => {
                        values.push(data[key]);
                        return `${key} = ?`;
                    })
                    .join(' AND ');
                query += ` WHERE ${conditions}`;
            }

            pool.query(query, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
            pool.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    deleteById(id) {
        return new Promise((resolve, reject) => {
            // Fetch the row to be deleted
            const fetchQuery = `SELECT * FROM ${this.tableName} WHERE id = ?`;
            pool.query(fetchQuery, [id], (fetchErr, fetchResults) => {
                if (fetchErr) {
                    reject(fetchErr);
                } else if (fetchResults.length === 0) {
                    reject(new Error("Record not found."));
                } else {
                    const rowToDelete = fetchResults[0];
                    // Delete the row
                    const deleteQuery = `DELETE FROM ${this.tableName} WHERE id = ?`;
                    pool.query(deleteQuery, [id], (deleteErr, deleteResults) => {
                        if (deleteErr) {
                            reject(deleteErr);
                        } else if (deleteResults.affectedRows > 0) {
                            resolve(rowToDelete);
                        } else {
                            reject(new Error("Delete operation failed."));
                        }
                    });
                }
            });
        });
    }
    

    updateById(id, updateData) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE ${this.tableName} SET ? WHERE id = ?`;
            pool.query(query, [updateData, id], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.affectedRows > 0) {
                    // Fetch the updated row
                    const fetchQuery = `SELECT * FROM ${this.tableName} WHERE id = ?`;
                    pool.query(fetchQuery, [id], (fetchErr, fetchResults) => {
                        if (fetchErr) {
                            reject(fetchErr);
                        } else {
                            resolve(fetchResults[0]);
                        }
                    });
                } else {
                    reject(new Error("Update failed, no rows affected."));
                }
            });
        });
    }
}

module.exports = BaseModel;
