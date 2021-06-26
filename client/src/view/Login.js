import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../const/defaultValues'

class Login extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
        }

        if (
            localStorage.getItem("__token__") !== null &&
            localStorage.getItem("__token__") !== undefined
        ) {
            props.history.goBack();
        }
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    login = (e) => {
        e.preventDefault()
        axios.post(API_URL + 'user/login', {
            ...this.state
        })
            .then(function (response) {
                if (response.data.status) {
                    alert(response.data.message)
                    let token = response.data.data._token
                    localStorage.setItem("__token__", token)
                    window.location.replace('/users')
                } else {
                    alert(response.data.message);
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }

    render() {
        let { email, password } = this.state
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <div className="col-md-6">
                        <h1 className="text-center">Adrixus</h1>
                        <form onSubmit={(e) => this.login(e)} className="form">
                            <input type="text"
                                placeholder="Email"
                                value={email}
                                name="email"
                                className="form-control"
                                onChange={(e) => this.handleInput(e)}
                            />
                            <br />
                            <input type="text"
                                placeholder="Password"
                                value={password}
                                name="password"
                                className="form-control"
                                onChange={(e) => this.handleInput(e)}
                            />
                            <br />
                            <button type="submit" className="btn btn-block btn-sm btn-primary">Login</button>
                            <br />
                            <div className="text-center">
                                <Link to="/signup">Sign Up</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login