import React, { Component } from 'react';
import firebase from './Firebase';
import { Link, NavLink, Redirect } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('test');
        this.unsubscribe = null;
        this.state = {
            data: []
        }
    }

    onCollectionUpdate = (querySnapshot) => {
        const data = this.state;
        querySnapshot.forEach((doc) => {
            const { name, email, mobile, address } = doc.data();
            data.push({
                key: data.id,
                doc,
                name,
                email,
                mobile,
                address,
            });
        });
        
        this.setState({
            data
        });
    }

    componentDidMount(){
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    remove = (e, k) => {
        firebase.firestore().collection('test').doc(k).delete()
            .then(() => {
                console.log("Data successfully deleted!");
                this.props.history.push("/");
            })
            .catch((error) => {
                console.log('Error removing document: ', error);
            });
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            LIST DETAILS
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4 style={{ float: 'right' }} >
                            <Link to="/create">Add Details</Link>
                        </h4>
                        <table className="table table-stripe">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Address</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map(data =>
                                    <tr>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.mobile}</td>
                                        <td>{data.address}</td>
                                        <td><Link to={`/show/${data.key}`}>Edit</Link></td>
                                        <td><Link onClick={(e) => this.remove(this, data.key)}>Remove</Link></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

