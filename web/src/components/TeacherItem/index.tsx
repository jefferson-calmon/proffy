import React from 'react';
import api from '../../services/api';

import WhatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export interface Teacher{
    id: number;
    avatar: string;
    name: string;
    subject: string;
    cost: number;
    whatsapp: string;
    bio: string;
}

interface TeacherProps{
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherProps> = ({ teacher }) => {

    async function createNewConnection(){
        await api.post('connections', {
            user_id: teacher.id
        })
    }


    return(
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt="Jefferson Calmon"/>

                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>
                {teacher.bio}
            </p>

            <footer>
                <p>
                    Preço/hora:
                    <strong>R$ {teacher.cost},00</strong>
                </p>

                

                <a 
                    href={`https://wa.me/${teacher.whatsapp}?text=I am%20interested%20in%20your%20classe`} target="_blank" 
                    rel="noopener noreferrer"
                    onClick={createNewConnection}
                >
                    <button type="button">
                        <img src={WhatsappIcon} alt="Entrar em contato via whatsapp"/>
                        Entrar em contato
                    </button>
                </a>
            </footer>
        </article>

    )
}

export default TeacherItem;