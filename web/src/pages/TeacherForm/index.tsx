import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import Warning from '../../assets/images/icons/warning.svg';
import './styles.css';


const TeacherForm = () => {
    const history = useHistory();

    const [ name, setName ] = useState('');
    const [ avatar, setAvatar ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ bio, setBio ] = useState('');

    const [ subject, setSubject ] = useState('');
    const [ cost, setCost ] = useState('');

        
    const [ scheduleItems, setScheduleItems ] = useState([{
        week_day: -1,
        to: '',
        from: ''
    }]);

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            {
            week_day: 0,
            to: '',
            from: ''
        }])
    };

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso');

            history.push('/');
        }).catch(err => {
            alert('Ocorreu um erro ao realizar seu , veja log no console.');
            console.log({
                error: err
            });
        });
    };

    function setScheduleItemValue(position: number, field: string, value: string){
        const updatedScheduleItems = scheduleItems.map((schedule, index) => {
            if(index === position){
                return {...schedule, [field]: value};
            };

            return schedule;
        });

        setScheduleItems(updatedScheduleItems);
    };

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader  
                title="Que incrível que você quer dar aulas"
                description="O primeiro passo é preencher o formulário de inscrição."
            />

            <main>
                
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
    
                        <Input 
                            label="Nome Completo" 
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value) } 
                        />
    
                        <Input 
                            label="Avatar" 
                            name="avatar"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value) } 
                        />
    
                        <Input 
                            label="Whatsapp"  
                            name="whatsapp"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value) } 
                        />
    
                        <Textarea 
                            label="Bio" 
                            name="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value) } 
                        />
    
                    </fieldset>
    
                    <fieldset>
                        <legend>Sobre a aula</legend>
    
                        <Select 
                            label="Matéria" 
                            name="subject" 
                            value={subject}                                            
                            onChange={(e) => setSubject(e.target.value)}
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
    
                        <Input 
                            label="Custo da sua hora por aula" 
                            name="cost"
                            value={cost}                                                
                            onChange={(e) => setCost(e.target.value)}
                        />
    
                    </fieldset>
    
    
                    <fieldset>
                        <legend>
                            Horários diponíveis
                            
                            <button 
                                type="button" 
                                onClick={() => addNewScheduleItem()}
                            >
                                + Novo Horário
                            </button>    
                        </legend>
    
    
                        {scheduleItems.map((schedule, index) => {
                            return(
                                <div key={schedule.week_day} className="schedule-item">
                                    <Select 
                                        label="Dia da semana" 
                                        name="week_day" 
                                        value={schedule.week_day}
                                        onChange={e => setScheduleItemValue(index, "week_day", e.target.value)}
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
                                        name="from" 
                                        label="Das" 
                                        type="time" 
                                        value={schedule.from}
                                        onChange={e => setScheduleItemValue(index, "from", e.target.value)}
                                    />
                                    <Input 
                                        name="to" 
                                        label="Até" 
                                        type="time" 
                                        value={schedule.to}
                                        onChange={e => setScheduleItemValue(index, "to", e.target.value)}
                                    />
                                </div>
                            );
                        })}
    
                    </fieldset>
    
                    <footer>
                        <p>
                            <img src={Warning} alt="Aviso importante"/>
                            Importante!<br/>
                            Preencha todos os dados
                        </p>
    
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;