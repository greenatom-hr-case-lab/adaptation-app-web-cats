import React, { Component } from 'react'
import api from '../api'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class UpdatePlan extends Component {
    updatePlan = event => {
        event.preventDefault()
        window.location.href = `/plan/update/${this.props.id}`
    }

    render() {
        return <button className=" mr-2" onClick={this.updatePlan}>Редактировать</button>
    }
}

class ShowPlan extends Component {
    updatePlan = event => {
        event.preventDefault()
        window.location.href = `/plan/view/${this.props.id}`
    }

    render() {
        return <button className=" mr-2" onClick={this.updatePlan}>Подробнее</button>
    }
}

class DeletePlan extends Component {
    deletePlan = event => {
        event.preventDefault()
        if (
            window.confirm(
                `Удалить план ${this.props.title}?`
            )
        ) {
            api.deletePlanById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <button className=" mr-2"onClick={this.deletePlan}>Удалить</button>
    }
}

class PlansList extends Component {
    constructor(props) {
        super(props)
        this.state = {
			plans: [],
			users: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllPlans().then(plans => {
            this.setState({
                plans: plans.data.plans,
                isLoading: false,
            })
		})
        
        await api.getUsers().then(users => {
            this.setState({
                users: users.data.users,
                isLoading: false,
            })
            const updPlans = this.state.plans.map((plan,i) => {
                this.state.users.forEach(user => {
                    if (user._id === plan.worker){
                        plan.worker = user.fullName
                    }
                })
            })
            this.setState({updPlans})
            
        })		
    }
   

    render() {
        const { plans, isLoading } = this.state
        const {user} = this.props.auth
        let showCards = true
        if (!plans.length) {
            showCards = false
        }

        return (showCards &&(
          <div className="container">
                      
            {plans.map( plan => (
							<div className="card mb-3" key={plan._id}>
								<div className="card-header">
								{plan.title}
								</div>
								<div className="card-body">
								<h5 className="card-title">{plan.worker}</h5>
								<p className="card-text">{plan.description}</p>
                                {user.role === 'hr' ?
								(
                                <div className="buttons">
                                    <ShowPlan id={plan._id}/>
                                    <UpdatePlan id={plan._id}/>
                                    <DeletePlan id={plan._id} title={plan.title} />
                                </div>
                                )
                                :(
                                    <div className="buttons">
                                    <ShowPlan id={plan._id}/>
                                    </div>
                                )}
								</div>
								<div className="card-footer text-muted">
								{plan.updDate}
								</div>
							</div>
            ))}
          </div>
        ))
    }
}
PlansList.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(
    mapStateToProps,
    { logoutUser }
  )(PlansList);

