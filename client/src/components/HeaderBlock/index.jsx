import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../style/logo.png'

class HeaderBlock extends Component {
    render() {
        return (
            <header>
                <nav id='header-block' className="navbar navbar-expand-md justify-content-center navbar-dark fixed-top bg-dark">
                  <a className="navbar-brand">
                      <img src={logo} width="60" height="60" alt="Гринатом" />
                  </a>
                  <div className= "collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <Link to="/plan/list" className="nav-link">
                            Список планов
                        </Link>
                      </li>.
                      <li className="nav-item">
                        <Link to="/plan/create" className="nav-link">
                            Создать план
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
            </header>
        )
    }
}

export default HeaderBlock
