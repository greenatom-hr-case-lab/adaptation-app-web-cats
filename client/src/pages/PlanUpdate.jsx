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
    font-size: 20px
`



class PlanUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: '',
            description: '',
            worker: '',
            startDate:'',
            endDate: '',
            leader: '',
            planState: '',
            planMark: '',
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

    handleChangeInputPlanState = async event => {
        const planState = event.target.value
        this.setState({ planState })
    }

    handleChangeInputPlanMark = async event => {
        const planMark = event.target.value
        this.setState({ planMark })
    }

    handleChangeInputFinalState = async event => {
        const finalState = event.target.checked ? true :false       
        this.setState({ finalState })
    }

    handleUpdatePlan = async () => {
        const { id, title, description, worker, startDate, endDate, leader, planState, planMark, finalState} = this.state
        const payload = { title, description, worker, startDate, endDate, leader, planState, planMark, finalState }

        await api.updatePlanById(id, payload).then(res => {
            window.alert(`План успешно сохранен`)
            this.setState({
                title: '',
                description: '',
                worker: '',
                startDate:'',
                endDate: '',
                leader: '',
                planState: '',
                planMark: '',
                finalState: false
            })
            window.location.href = `/plan/list`
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const plan = await api.getPlanById(id)

        this.setState({
            title: plan.data.data.title,
            description: plan.data.data.description,
            worker: plan.data.data.worker,
            startDate: plan.data.data.startDate,
            endDate: plan.data.data.endDate,
            leader: plan.data.data.leader,
            planState: plan.data.data.planState,
            planMark: plan.data.data.planMark,
            finalState: plan.data.data.finalState,
        })
    }

    render() {
        const { title, description, worker, startDate, endDate, leader, planState, planMark, finalState } = this.state
        return (
            <Wrapper>
                <Title>Редактировать план</Title>

                <Label>Название </Label><br/>
                <input type="text" value={title} onChange={this.handleChangeInputTitle}/><br/>

                <Label>Описание </Label><br/>
                <input type="textarea" value={description} onChange={this.handleChangeInputDesc}/><br/>

                <Label>Работник </Label><br/>
                <input type="text" value={worker} onChange={this.handleChangeInputWorker}/><br/>

                <Label>Руководитель </Label><br/>
                <input type="text" value={leader} onChange={this.handleChangeInputLeader}/><br/>                

                <input type="date" value={startDate} onChange={this.handleChangeInputStartDate} placeholder="Дата начала"/><br/>
	            <input type="date" value={endDate} onChange={this.handleChangeInputEndDate}placeholder="Дата окончания"/><br/>

                <select value={planMark} onChange={this.handleChangeInputPlanMark}>
                    <option>-</option>
	                <option>A</option>
	                <option>B</option>
	                <option>C</option>
	                <option>D</option>
                </select><br/>

                <select value={planState} onChange={this.handleChangeInputPlanState} >
                    <option>Создание плана</option>
                    <option>Заполнение сотрудником</option>
                    <option>Согласование руководителем</option>
                    <option>Выполнение</option>
                    <option>Оценка руководителем</option>
                    <option>Оценка завершена</option>
                </select><br/>

                <Label>Программа пройдена?</Label>
                <input type="checkbox" checked={ finalState ? true : false} onChange={this.handleChangeInputFinalState}/><br/>	     

                <button onClick={this.handleUpdatePlan}>Сохранить изменения</button>
            </Wrapper>
        )
    }
}

export default PlanUpdate
