import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import Logo from '../../assets/images/logo.svg';
import LandingImg from '../../assets/images/landing.svg';
import StudyIcon from '../../assets/images/icons/study.svg';
import GiveClasses from '../../assets/images/icons/give-classes.svg';
import PurpleHeart from '../../assets/images/icons/purple-heart.svg';

const Landing = () => {
    return(
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={Logo} alt="Logo do Proffy" />
                    <h2>Sua plataforma da estudos online.</h2>
                </div>

                <img 
                    src={LandingImg} 
                    alt="Proffy - Plataforma da estudos" 
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={StudyIcon} alt="Study in Proffy"/>
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={GiveClasses} alt="Teach in Proffy"/>
                        Dar aula
                    </Link>
                    
                </div>

                <span className="total-connections">
                    Total de 200 conexões já realizadas 
                    <img src={PurpleHeart} alt="Total of connections in Proffy"/>
                </span>
            </div>
        </div>
    );
};

export default Landing