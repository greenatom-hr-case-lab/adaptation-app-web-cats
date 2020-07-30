import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 100px;
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

        this.state = {            
            crtr: 'Unkid',
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

    handleChangeInputTitle = async event => {
        const title = event.target.value
        this.setState({ title })
    }

    handleChangeInputDesc = async event => {
        const description = event.target.value
        this.setState({ description })
    }

    handleChangeInputWorker = async event => {
        const worker = event.target.value
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
        console.log(updDate)
        this.setState({ updDate })
    }

    handleIncludePlan = async () => {
        const { title, description, crtr, updDate, worker, startDate, endDate, leader, planState, planMark, finalState } = this.state
        const payload = { title, description, crtr, updDate, worker, startDate, endDate, leader, planState, planMark, finalState }

        await api.insertPlan(payload).then(res => {
            window.alert(`План успешно добавлен`)
            this.setState({
                title: '',
                description: '',
                crtr: 'Unkid',
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
        const { title, description, worker, crtr, updDate, leader } = this.state
        return (
            <Wrapper>
                <Title>Создать план</Title>

                <Label>Название </Label><br/>
                <input type="text" value={title} onChange={this.handleChangeInputTitle}/><br/>

                <Label>Описание </Label><br/>
                <textarea type="text" cols="45" value={description} onChange={this.handleChangeInputDesc}/><br/>

                <Label>Работник </Label><br/>
                <input type="text" value={worker} onChange={this.handleChangeInputWorker}/><br/>

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

                <button className="btn-gradient btn-green" onClick={this.handleIncludePlan}>Сохранить изменения</button>
            </Wrapper>
        )
    }
}


export default PlanInsert
