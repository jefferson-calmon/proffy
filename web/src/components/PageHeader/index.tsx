import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/logo.svg';
import BackIcon from '../../assets/images/icons/back.svg';

import './styles.css';


interface PageHeaderProps{
    title: string;
    description?: string;
}


const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return(
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={BackIcon} alt="Voltar para landing page do Proffy"/>
                </Link>

                <img src={Logo} alt="Proffy"/>
            </div>

            <div className="header-content">
                <strong>
                    {props.title}
                </strong>
                {props.description && <p>{props.description}</p>}

                {props.children}

            </div>
        </header>
    )
}

export default PageHeader;