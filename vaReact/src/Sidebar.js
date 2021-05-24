import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import AddEventModal from './Components/AddEventModal';
import EditProfileModal from './Components/EditProfileModal';
export default class Sidebar extends Component {
    state = {
        showAddEventModal: false,
        showProfileModal: false,
    };


    render() {
        return (
            <div className="sidebar">

                <div>
                    <ListGroup>
                        <ListGroupItem>AnaSayfa</ListGroupItem>
                        <ListGroupItem onClick={() => this.setState({ showAddEventModal: true })}>Etkinllik Ekle</ListGroupItem>
                        <ListGroupItem>Arkadaş Ekle</ListGroupItem>
                        <ListGroupItem onClick={() => this.setState({ showProfileModal: true })}>Profil Düzenle</ListGroupItem>
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
