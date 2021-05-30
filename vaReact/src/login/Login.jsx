import React from "react";
import loginImg from "../image/logo.png";
import alertify from "alertifyjs";
import axios from 'axios';
import Swal from "sweetalert2";


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }

    componentDidMount() {
        this.logout();
    }
    loginUser = () => {
        const { username, password } = this.state;
        let obj = {
            username: this.state.username,
            password: this.state.password,
        };
        let data = JSON.stringify(obj);
        let user = {
            authdata: '',
        }
        //user.authdata = window.btoa(username + ':' + password);
        //localStorage.setItem('user', JSON.stringify(user));
        //const { from } = this.props.location || { from: { pathname: "/" } };
        //this.context.history.push(from);
        //alertify.success("Giriş Başarılı.");

        axios.post(`/api/user/loginUser`, data)
            .then(this.handleResponse)
            .then(user => {
                if (user) {
                    user.authdata = window.btoa(username + ':' + password);
                    localStorage.setItem('user', JSON.stringify(user));
                }

                return user;
            })
            .then((user) => {
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
                const { from } = this.props.location.state || { from: { pathname: "/" } };
                this.props.history.push(from);
                alertify.success("Giriş Başarılı.");
            }).catch(function (error) {
                alertify.error("Hatalı İşlem!");
            });

    }



    logout = () => {


        Swal.fire({
            title: 'Oturum kapatılsın mı?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Evet`,
            cancelButtonText: `Vazgeç`,
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                Swal.fire('Çıkış!', '', 'yapıldı')
            }
        })
        //routing Login Page
    }

    handleResponse = (response) => {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    this.logout();
                    window.location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
    }

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Giriş</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg}></img>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Kullanıcı Adı</label>
                            <input type="text" name="username" placeholder="kullanıcı adınız" value={this.state.user_name}
                                onChange={(e) => this.setState({ user_name: e.target.value })}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Parola</label>
                            <input type="password" name="password" placeholder="parola" value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}></input>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn" onClick={() => this.loginUser()} >Giriş</button>
                </div>
            </div>
        );
    }
}

