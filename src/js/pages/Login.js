import React from 'react';
import Parse from 'parse';
import { Redirect } from "react-router-dom";

import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

class LoginForm extends React.Component{
    constructor(props){
		super(props);

		Parse.initialize(process.env.REACT_APP_parseAppId , process.env.REACT_APP_parseJavascriptKey);
        Parse.serverURL = process.env.REACT_APP_parseServerUrl;

        this.state = { 
            username: '', 
            password: '',
            toDashboard: false
        }
    }

    handleChange = (e, { name, value }) => this.setState({ 
        [name]: value 
    })

    logIn =  () => {
        // Create a new instance of the user class
        var that = this;
        Parse.User.logIn(this.state.username, this.state.password).then(function(user)  {
            console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
            that.setState({
				toDashboard:true
			});
        })/*.catch(function(error){
            console.log("Error: " + error.code + " " + error.message);
        });*/
    }
    render(){
        if (this.state.toDashboard === true) {
            return <Redirect to='/app/home' />
        }

        const { username, password } = this.state;

        return(
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                     Log-in to your account
                </Header>
                <Form size='large' onSubmit={this.handleSubmit}>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name='username' value={username} onChange={this.handleChange} />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name='password' 
                            value={password}
                            onChange={this.handleChange}
                        />
                        <Button onClick={this.logIn} color='teal' fluid size='large'>
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <a href='/'>Sign Up</a>
                </Message>
                </Grid.Column>
            </Grid>
        )
    }
}  
{/* as={Link} to='/app/home' */}

export default LoginForm;