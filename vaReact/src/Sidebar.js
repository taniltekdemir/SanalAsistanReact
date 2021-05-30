import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import AddEventModal from './Components/AddEventModal';
import EditProfileModal from './Components/EditProfileModal';
import Swal from "sweetalert2";

export default class Sidebar extends Component {
    state = {
        showAddEventModal: false,
        showProfileModal: false,

    };

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
    render() {
        return (
            <div className="sidebar">

                <div>
                    <ListGroup>
                        <ListGroupItem>AnaSayfa</ListGroupItem>
                        <ListGroupItem onClick={() => this.setState({ showAddEventModal: true })}>Etkinllik Ekle</ListGroupItem>
                        <ListGroupItem>Arkadaş Ekle</ListGroupItem>
                        <ListGroupItem onClick={() => this.setState({ showProfileModal: true })}>Profil Düzenle</ListGroupItem>
                        <ListGroupItem onClick={() => { this.logout() }}>Çıkış Yap</ListGroupItem>
                    </ListGroup>
                </div>
                {this.state.showAddEventModal &&
                    <AddEventModal
                        modal={this.state.showAddEventModal}
                        toggleModal={(flag) => this.setState({ showAddEventModal: flag })}
                    />}

                {this.state.showProfileModal &&
                    <EditProfileModal
                        modal={this.state.showProfileModal}
                        toggleModal={(flag) => this.setState({ showProfileModal: flag })}
                    />}
            </div>
        )
    }
}
