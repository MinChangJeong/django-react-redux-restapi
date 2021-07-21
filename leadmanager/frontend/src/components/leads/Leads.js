import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import { getLeads, deleteLead } from '../../actions/leads'

// react component에서 redux state를 가져다가 사용하기 위해서 react-redux모듈 사용

export class Leads extends Component {
    static PropTypes = {
        leads : PropTypes.array.isRequired,
        getLeads : PropTypes.func.isRequired,
        deleteLead : PropTypes.func.isRequired,

    }

    componentDidMount() {
        this.props.getLeads();
    }

    render() {
        return (
            <Fragment>
                <h2>Leads</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.leads.map((lead) => (
                                <tr key={lead.id}>
                                    <td>{lead.id}</td>
                                    <td>{lead.name}</td>
                                    <td>{lead.email}</td>
                                    <td>{lead.message}</td>
                                    <td>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={this.props.deleteLead.bind(this, lead.id)}
                                    >
                                        {" "}
                                        Delete
                                    </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

// mapStateToProps 함수를 사용하여 component 의 props에서 state로 사용할 함수들을 설정
const mapStateToProps = (state) => ({
    // leads : action(일반 함수 객체)
    leads: state.leads.leads,
  });


export default connect(mapStateToProps, { getLeads, deleteLead })(Leads);
