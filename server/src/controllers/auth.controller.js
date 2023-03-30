import { StatusCodes } from 'http-status-codes';

import { createToken } from '../middleware/token.js'


export const getToken = async (req, res) => {
    try {
        const { username, password } = req.body;
        if(!username && !password){
            return res.status(StatusCodes.BAD_REQUEST).send({message: "username y password con requerido" });
        }
        const token = createToken(username, password);
        if(!token){
            return res.status(StatusCodes.BAD_REQUEST).send({ message: "username o password con invalido" });
        }
        res.status(StatusCodes.OK).send({token:token});  
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: error.message});
    }
};
