import React, { Component } from 'react'
import api from '../api'
import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})

const Label = styled.label`
    margin: 5px;
    font-size: 20px
`

class PlanPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            users: [],
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
            updDate: plan.data.data.updDate,
            crtr: plan.data.data.crtr
        })

        await api.getUsers().then(users => {
            this.setState({
                users: users.data.users,
                isLoading: false,
            })
            
        })

        let updPlans = ''
        this.state.users.forEach(user => {
            if (user._id === this.state.worker){
                updPlans = user.fullName
            }
            console.log(updPlans)
        })

        
        this.setState({worker:updPlans})
    }

    render() {
        const { title, description, startDate, endDate, worker, crtr, updDate, leader, planState, planMark, finalState } = this.state        
        return (
            <div className="container">
                <Title>{title}</Title>
                <Label>Описание: {description} </Label><br/>
                <Label>Работник: {worker}  </Label><br/>
                <Label>Руководитель: {leader} </Label><br/>
                <Label>Дата начала: {startDate}</Label> <br/>
                <Label>Дата окончания: {endDate}</Label> <br/>
                <Label>Оценка: {planMark}</Label> <br/>
                <Label>Этап: {planState}</Label> <br/>
                <div className="finalState">
                {finalState ? (
                    <div className="finalState">
                    <Label>Выполнен</Label> <br/>
                    </div>)
                : (
                    <div className="finalState">
                    <Label>Не завершен</Label> )<br/>
                    </div>
                )}
                </div>
                <Label>Автор: {crtr}</Label> <br/>
                <Label>Дата создания: {updDate}</Label> <br/>
                    
            </div>
        )
    }

}

export default PlanPage