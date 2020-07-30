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
        return <button className="btn btn-success mr-2" onClick={this.updatePlan}>Редактировать</button>
    }
}

class DeletePlan extends Component {
    deletePlan = event => {
        event.preventDefault()
        if (
            window.confirm(
                `Do tou want to delete the plan ${this.props.title} permanently?`
            )
        ) {
            api.deletePlanById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <button className="btn btn-secondary mr-2"onClick={this.deletePlan}>Удалить</button>
    }
}

class PlansList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            plans: [],
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
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

    render() {
        const { plans, isLoading } = this.state
        console.log('TCL: PlansList -> render -> plans', plans)
        const { user } = this.props.auth;

        let showCards = true
        if (!plans.length) {
            showCards = false
        }

        return (showCards &&(
          <div className="container">
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-secondary"
            >
              Logout
            </button>
            <b>{user.fullName}</b>
            
            {plans.map( plan => (
                          <div className="card mb-3" key={plan._id}>
                            <div className="card-header">
                              {plan.title}
                            </div>
                            <div className="card-body">
                              <h5 className="card-title">{plan.worker}</h5>
                              <p className="card-text">{plan.description}</p>
                              <UpdatePlan id={plan._id}/>
                              <DeletePlan id={plan._id} title={plan.title} />
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

