import React, { Component } from 'react';
import firebase from './Firebase';
import { Link } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default class Create extends Component {
    constructor(props){
        super(props);
        this.ref = firebase.firestore().collection('test');
        console.log(this.ref);

        this.state = {
            name: '',
            email: '',
            mobile: '',
            address: '',
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, email, mobile, address } = this.state;

        this.ref.add({
            name,
            email,
            mobile,
            address
        }).then((docRef) => {
            this.setState({
                name: '',
                email: '',
                mobile: '',
                address: ''
            });
            this.props.history.push("/")
        }).catch((error) => {
            console.error("Error adding document: ", error);
        })
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    render() {
        return(
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            ADD PERSONAL DETAILS
                        </h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name: </label>
                                <input type="type" className="form-control" name="name" onChange={this.onChange} placeholder="Enter Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email: </label>
                                <input type="email" className="form-control" name="email" onChange={this.onChange} placeholder="Enter Email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mobile">Mobile Number: </label>
                                <input type="mobile" className="form-control" name="mobile" onChange={this.onChange} placeholder="Enter Mobile" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address: </label>
                                <input type="text" className="form-control" name="address" onChange={this.onChange} placeholder="Enter Address" />
                            </div>
                            <button type="submit" className="btn btn-success mr-2">
                                Submit
                            </button>
                            <Link to="/">
                                <button type="submit" className="btn btn-danger">Back</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}