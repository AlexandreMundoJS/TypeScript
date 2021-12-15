import moment from 'moment';
import {connection} from '../infra/connection';
import {Request, Response, NextFunction} from 'express';


export default new class Attendances {
    add(attendance: any, res: Response){
        const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
        console.log(dataCriacao);
        const data = moment(attendance.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:MM:SS");
        console.log(moment(attendance.data, "DD/MM/YYYY"));
        const validateDate = moment(data).isSameOrAfter(dataCriacao);
        const validateCustomer = attendance.cliente.length >= 5;
        
        const validateInformation = [
            {
                name: 'data',
                valid: validateDate,
                message: 'Date need to be greater than the actual date'
            },
            {
                name: 'customer',
                valid: validateCustomer,
                message: 'Customer name need to be greater than five characters'
            }
        ];

        const errors = validateInformation.filter(field => !field.valid);
        const errorsFinded = errors.length;

        if (errorsFinded){
            res.status(400).json(errors);
        } else {
            const datedAttendance = {...attendance, data, dataCriacao};
            const sql: string = 'INSERT INTO Atendimentos SET ?';
            connection.query(sql, datedAttendance, (err: any, results: any) => {
                if (err) {
                    return res.status(400).json(err);
                } else {
                    return res.status(201).json(attendance)
                }
            })
        }
    }

    list(res: Response){
        const sql: string = 'SELECT * FROM Atendimentos';
        connection.query(sql, (err: any, results: any)=>{
            if (err){
                res.status(400).json(err);
            } else {
                res.status(200).json(results)
            }
        })
    }
}