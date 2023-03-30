import { StatusCodes } from 'http-status-codes';
import { Carrers } from '../models/Careers.js';
import { Students } from '../models/Students.js';
import { CareersStudents } from '../models/CareersStudents.js';

import { getStudentsResponseDTO, getStudentsDTO } from '../dto/students.dto.js';

import { containsOnlyNumbers } from '../validations/validation.js';

export const getStudents = async (req, res) => {
    try {
        const students = await Students.findAll();
        res.status(StatusCodes.OK).send(getStudentsResponseDTO(students));    
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
};

export const createStudent = async (req, res) => {
    try {

        const { name, rut, email, carId } = req.body;
        
        if(!containsOnlyNumbers(carId)){
            return res.status(StatusCodes.BAD_REQUEST).send({message: "carId tiene que ser entero" });
        }
        const career = await Carrers.findByPk(carId);

        if (!career) {
            return res.status(StatusCodes.BAD_REQUEST).send({message: "Carrera no existe en los registros" });
        }

        const newStudent = await Students.create({
            name,
            rut,
            email
        });

        const newCareer = await CareersStudents.create({
            careerId: carId,
            studentId: newStudent.id
        });

        res.status(StatusCodes.CREATED).send(getStudentsDTO(newStudent));
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
};

export const getStudentsById = async (req, res) => {
    try {

        const { id } = req.params;

        if(!containsOnlyNumbers(id)){
            return res.status(StatusCodes.BAD_REQUEST).send({message: "id tiene que ser entero" });
        }

        const student = await Students.findByPk(id);

        if (!student) {
            return res.status(StatusCodes.BAD_REQUEST).send({ message: "No existe en los registros" });
        }

        res.status(StatusCodes.OK).send(getStudentsDTO(student));

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
};

export const updateStudent = async (req, res) => {
    try {

        const { id } = req.params;

        if(!containsOnlyNumbers(id)){
            return res.status(StatusCodes.BAD_REQUEST).send({message: "id tiene que ser entero" });
        }

        const student = await Students.findByPk(id);

        if (!student) {
            return res.status(StatusCodes.BAD_REQUEST).send({message: "No existe en los registros" });
        }
        const { name, rut, email } = req.body;

        student.name = name;
        student.rut = rut;
        student.email = email;
        student.save();

        res.status(StatusCodes.ACCEPTED).send(getStudentsDTO(student));

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
};

export const deleteStudent = async (req, res) => {
    try {

        const { id } = req.params;

        if(!containsOnlyNumbers(id)){
            return res.status(StatusCodes.BAD_REQUEST).send({message: "id tiene que ser entero" });
        }

        const student = await Students.findByPk(id);

        if (!student) {
            return res.status(StatusCodes.BAD_REQUEST).send({message: "No existe en los registros" });
        }

        Students.destroy({
            where: {
                id: id
            }
        })

        res.status(StatusCodes.ACCEPTED).send({message:"Usuario eliminado correctamente"});

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
};