import React, { useState, FormEvent } from 'react';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css'

const TeacherList = () => {

    

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_Day] = useState('');
    const [time, setTime] = useState('');
    const [ data, setData ] = useState([])
 
    async function searchTeachers(e: FormEvent){
        e.preventDefault();

        // const modifieldTime = time.split(':').join('%3A');

        const response = await api.get('classes',{
            params:{
                subject,
                week_day,
                time
            }
        })

        const data = response.data;
        
        return setData(data);
    };

    return(
        <div id="page-teacher-list" className="container">
            <PageHeader 
                title="Esses são os proffys disponíveis"
            >
                <form id="search-teachers" onSubmit={searchTeachers}>

                    <Select 
                        label="Matéria" 
                        name="subject" 
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        options={[
                            {value: 'Artes', label:"Artes"},
                            {value: 'Biologia', label:"Biologia"},
                            {value: 'Ciências', label:"Ciências"},
                            {value: 'Português', label:"Português"},
                            {value: 'Matemática', label:"Matemática"},
                            {value: 'Fisíca', label:"Fisíca"},
                            {value: 'Química', label:"Química"},
                            {value: 'Geografia', label:"Geografia"},
                            {value: 'História', label:"História"}
                        ]}
                    />

                    <Select 
                        label="Dia da semana" 
                        name="week_day" 
                        value={week_day}
                        onChange={e => setWeek_Day(e.target.value)}
                        options={[
                            {value: '0', label:"Domingo"},
                            {value: '1', label:"Segunda"},
                            {value: '2', label:"Terça-Feira"},
                            {value: '3', label:"Quarta-Feira"},
                            {value: '4', label:"Quinta-Feira"},
                            {value: '5', label:"Sexta-Feira"},
                            {value: '6', label:"Sabado"}
                        ]}
                    />

                    <Input
                        type="time"
                        label="Horas"
                        name="time"
                        value={time}
                        onChange={e => setTime(e.target.value) }
                    />

                    <button type="submit">
                        Buscar
                    </button>

                </form>
            </PageHeader>


            <main>
                {data.map((teacher: Teacher) => {
                    return(
                        <TeacherItem 
                            key={teacher.id}
                            teacher={teacher}
                        />
                    );
                })}
            </main>

        </div>
    )
}

export default TeacherList;