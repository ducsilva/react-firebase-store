import React, { Component } from 'react';
import firebase from './Firebase';
import {Link} from 'react-router-dom';

export default class Show extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('test');
      
        this.state = {
            key:'',
         name:'',
         email:'',
         mobile:'',
         address:''
        };
      }
      onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }
      onSubmit = (e) => {
        e.preventDefault();
    
        const { name, email, mobile,address } = this.state;
        const updateRef = firebase.firestore().collection('test').doc(this.state.key);
        console.log(updateRef)
        updateRef.set({
            name,
            email,
            mobile,
            address
        }).then((docRef) => {
           
          this.setState({
            name: '',
            email: '',
            mobile: '',
            address:''
          });
         
          this.props.history.push("/")
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }
   
      componentDidMount() {
        
        const ref = firebase.firestore().collection('test').doc(this.props.match.params.id);
        ref.get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            this.setState({
              key: doc.id,
              name: data.name,
            email: data.email,
            mobile: data.mobile,
            address:data.address
             
            });
          } else {
            console.log("No such document!");
          }
        });
      }
    
      render() {
        
        return (
          <div class="container">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">
                  EDIT PERSONAL DETAILS
                </h3>
              </div>
              <div class="panel-body">
              
                <form onSubmit={this.onSubmit}>
                  <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" class="form-control" name="name" value={this.state.name}  onChange={this.onChange} placeholder="Enter Name" />
                  </div>
                  <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.onChange} placeholder="Enter Email" />

                  </div>
                  <div class="form-group">
                    <label for="mobile">Mobile Number:</label>
                    <input type="text" class="form-control" name="mobile" value={this.state.mobile} onChange={this.onChange} placeholder="Enter Mobile" />
                  </div>
                  <div class="form-group">
                    <label for="address">Address:</label>
                    <input type="text" class="form-control" name="address" value={this.state.address} onChange={this.onChange} placeholder="Enter Address" />
                  </div>
                  <button type="submit" class="btn btn-success mr-2">Submit</button>  <Link to="/"><button type="submit" class="btn btn-danger">Back</button></Link>
                </form>
              </div>
            </div>
          </div>
        );
      }

}