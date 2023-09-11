import LoggerService from "../services/LoggerService.js";

const loggerService = new LoggerService();

const attachLogger = (req,res,next) =>{
    req.logger = loggerService.logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
}

export default attachLogger;