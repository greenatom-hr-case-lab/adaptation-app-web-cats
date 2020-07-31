import React, { Component } from 'react'
import api from '../api'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import NotHR from '../components/NotHR/index'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    
`

const Label = styled.label`
    margin: 5px;
    font-size: 20px;

`
let now = new Date()
        let day = now.getDate()
        let month = now.getMonth()+1
        
        if (day < 10){
            day = `0${day}`
        }
        if (month < 10){
            month = `0${month}`
        }
const date = `${day}/${month}/${now.getFullYear()}`

class PlanInsert extends Component {
    constructor(props) {
        super(props)    
        const { user } = this.props.auth;
        this.state = { 
            users: [],           
            crtr: user.fullName,
            title: '',
            description: '',
            updDate: date,
            worker: '',
            startDate:'',
            endDate: '',
            leader: '',
            planState: 'Создание плана',
            planMark: 'None',
            finalState: false
        }

    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await api.getUsers().then(users => {
            this.setState({
                users: users.data.users,
                isLoading: false,
            })
        })
    }

    handleChangeInputTitle = async event => {
        const title = event.target.value
        this.setState({ title })
    }

    handleChangeInputDesc = async event => {
        const description = event.target.value
        this.setState({ description })
    }

    handleChangeInputWorker = async event => {
        const n = document.getElementById('select-worker').options.selectedIndex
        const select = document.getElementById('select-worker').options[n].value
        const worker = select
        this.setState({ worker })
    }

    handleChangeInputStartDate = async event => {
        const startDate = event.target.value
        this.setState({ startDate })
    }

    handleChangeInputEndDate = async event => {
        const endDate = event.target.value
        this.setState({ endDate })
    }

    handleChangeInputLeader = async event => {
        const leader = event.target.value
        this.setState({ leader })
    }

    
    handleChangeInputCrtr = async event => {
        const crtr = event.target.value
        console.log(crtr)
        this.setState({ crtr })
    }

    handleChangeInputUpdDate = async event => {
        const updDate = event.target.value
        this.setState({ updDate })
    }

    handleIncludePlan = async () => {
        const { title, description, crtr, updDate, worker, startDate, endDate, leader, planState, planMark, finalState } = this.state
        const payload = { title, description, crtr, updDate, worker, startDate, endDate, leader, planState, planMark, finalState }
        const { user } = this.props.auth;

        await api.insertPlan(payload).then(res => {
            window.alert(`План успешно добавлен`)
            this.setState({
                title: '',
                description: '',
                crtr: user.fullName,
                updDate: date,
                worker: '',
                startDate:'',
                endDate: '',
                leader: '',
                planState: 'Создание плана',
                planMark: 'None',
                finalState: false
            })
            window.location.href = `/plan/list`
        })
    }

    render() {
        const { title, description,  crtr, updDate, leader, users } = this.state
        const role = this.props.auth.user.role
        return (            
            <Wrapper>
                {role == 'hr' ? (
                    <div>
                    <Title>Создать план</Title>

                    <Label>Название </Label><br/>
                    <input type="text" value={title} onChange={this.handleChangeInputTitle}/><br/>
    
                    <Label>Описание </Label><br/>
                    <textarea type="text" cols="45" value={description} onChange={this.handleChangeInputDesc}/><br/>
    
                    <Label>Работник </Label><br/>
                    <select id="select-worker" onChange={this.handleChangeInputWorker}>
                        <option value="Имя сотрудника">-</option>
                        {users.map(item => 
                            <option key={item._id} value={item._id} > {item.fullName} </option>
                        )
                        }
                    </select><br/>
    
                    <Label>Руководитель </Label><br/>
                    <input type="text" value={leader} onChange={this.handleChangeInputLeader}/><br/>    
    
                    <Label>Сотрудник КС </Label><br/>
                    <input type="text" value={crtr} onChange={this.handleChangeInputCrtr} readOnly/><br/>    
                    <Label>Создан</Label><br/>
                    <input type="text" value={updDate} onChange={this.handleChangeInputUpdtDate} readOnly/><br/>
    
                    <Label>Дата начала</Label><br/>
                    <input type="date" onChange={this.handleChangeInputStartDate}/><br/>
    
                    <Label>Дата окончания</Label> <br/>
                    <input type="date" onChange={this.handleChangeInputEndDate}/><br/>                                            	     
    
                    <button  onClick={this.handleIncludePlan}>Сохранить изменения</button>
                    </div>
                ):(
                    <NotHR/>
                )
                }                
            </Wrapper>
        )
    }
}

PlanInsert.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(
    mapStateToProps,
    { logoutUser }
  )(PlanInsert);
