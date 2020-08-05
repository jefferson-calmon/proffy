import { Request, Response } from 'express';
import db from '../database/connection';
import convertHoursToMinutes from '../utils/convertHoursToMinutes';


export default class ClassesController{


    async index(req: Request, res: Response){

        const filters = req.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string

        if (!filters.week_day || !filters.subject || !filters.time){
            return res.status(400).json({
                "error": "Missing filters to search classes"
            });
        };

        const timeInMinutes = convertHoursToMinutes(time);

        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        res.json(classes);
    };


    async create (req: Request, res: Response) {

        interface ScheduleItem{
            week_day: number;
            from: string;
            to: string;
        }
    
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
    
        } = req.body;
    
        
        const trx = await db.transaction();
    
        try{
    
            const insertedUsersId = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
        
            const user_id = insertedUsersId[0];
            const insertedClassesId = await trx('classes').insert({
                subject,
                cost,
                user_id
            });
        
            const class_id = insertedClassesId[0];
        
            const classSchedule = schedule.map( (scheduleItem: ScheduleItem) => {
                return {
                    week_day: scheduleItem.week_day,
                    from: convertHoursToMinutes(scheduleItem.from),
                    to: convertHoursToMinutes(scheduleItem.to),
                    class_id
                }
            })
        
            await trx('class_schedule').insert(classSchedule)
        
        
            await trx.commit();
        
            return res.status(201).send('<h1>sucess</h1>');
    
        } catch (err){
            await trx.rollback();
    
            return res.status(400).json({'error': "Unexpected error while creating new class"});
        };
    
    }
}