import React from "react";
import loginImg from "../../logo.png";
import alertify from "alertifyjs";
import axios from 'axios';


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: "",
            password: "",
        }
    }

    loginUser = () => {
        let self = this;
        let obj = {
            user_name: self.state.user_name,
            password: self.state.password,
        };


        let data= JSON.stringify(obj);
       //axios.post(`/api/user/loginUser`, data)
       //    .then((response) => {
       //        localStorage.clear();
       //        localStorage.setItem('currentUser', response.data);
       //        alertify.success("Giriş Başarılı.");
       //    }).catch(function (error) {
       //        alertify.error("Hatalı İşlem!");
       //    });

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