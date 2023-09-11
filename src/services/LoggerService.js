import winston from 'winston';
import config from '../config/config.js';

export default class LoggerService {
    constructor(){
        this.options = {
            //Todo lo que mi logger necesite
            levels:{
                fatal:0,
                error:1,
                warning:2,
                http:3,
                info:4
            }
        },
        this.logger = this.createLogger();
    }

    createLogger = () =>{
        switch(config.app.LOGGER_ENV){
            //Decido la config de mi logger a devolver
            case "DEVELOPMENT":
                return winston.createLogger({
                    levels: this.options.levels,
                    transports:[
                        new winston.transports.Console({level:"info", format: winston.format.simple()})
                    ]
                })
            case "PRODUCTION":
                return winston.createLogger({
                    levels: this.options.levels,
                    transports: [
                        new winston.transports.Console({level:"info", format: winston.format.simple()}),
                        new winston.transports.File({level:"warning",filename:'./errors.log'})
                    ]
                })
        }
    }
}