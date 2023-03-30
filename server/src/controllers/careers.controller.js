import { StatusCodes } from 'http-status-codes';

import { Carrers } from '../models/Careers.js';
import { Students } from '../models/Students.js';

import {getCareersResponseDTO, getCareersDTO} from '../dto/careers.dto.js';

import { getStudentsByCareerResponseDTO } from '../dto/students.dto.js';

import { containsOnlyNumbers } from '../validations/validation.js';


export const getCareers = async (req, res) => {
    try {
        const careers = await Carrers.findAll(); 
        res.status(StatusCodes.OK).send(getCareersResponseDTO(careers));  
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: error.message});
    }
};

export const getStudentsByCareer = async (req, res) => {
    try {
        const { id } = req.params;
        if(!containsOnlyNumbers(id)){
            return res.status(StatusCodes.BAD_REQUEST).send({message: "id tiene que ser entero" });
        }
        const students = await Carrers.findAll({
            attributes: [],
            include:[{
                model: Students,
                attributes: ["id","name","rut","email"],
            }],
            where: {
                id: id
              }
        });
        res.status(StatusCodes.OK).send(getStudentsByCareerResponseDTO(students)); 
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: error.message});
    }
};

export const createCareer =  async (req, res) => {
    try {
        const { name } = req.body;
        const newCareer = await Carrers.create({
            name: name
        });
        res.status(StatusCodes.CREATED).send(getCareersDTO(newCareer)); 
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: error.message});
    }
};