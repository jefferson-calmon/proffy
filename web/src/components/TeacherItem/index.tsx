import React from 'react';

import WhatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem = () => {
    return(
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/2254731?s=400&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4" alt="Diego fernandes"/>

                <div>
                    <strong>Diego Fernandes</strong>
                    <span>Quimíca</span>
                </div>
            </header>

            <p>
                Entusiasta das melhores tecnologias de química avançada.

                <br /><br />

                Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas com as suas experiências. Mais de 200.000 pessoas já passaram por suas explosões.
            </p>

            <footer>
                <p>
                    Preço/hora:
                    <strong>R$ 80,00</strong>
                </p>

                <button type="button">
                    <img src={WhatsappIcon} alt="Entrar em contato via whatsapp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>

    )
}

export default TeacherItem;