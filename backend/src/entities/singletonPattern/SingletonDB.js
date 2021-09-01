const { mongoose } = require("../../database");

exports.SingletonDB = class extends mongoose {
    instancia;

    constructor(){
        this.getSingleton()
    }

    getSingleton(){
        if(this.instancia === null){
            this.instancia = new SingletonDB()
        }
        return this.instancia;
    }
}