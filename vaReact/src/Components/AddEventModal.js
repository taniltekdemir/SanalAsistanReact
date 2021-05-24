import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap"
import Datetime from "react-datetime"
import 'react-datetime/css/react-datetime.css'
import moment from "moment/moment"
import 'moment/locale/tr'
import { TimePicker } from 'antd'
import 'antd/dist/antd.css';
import StarRatingComponent from 'react-star-rating-component'
import Alert from "react-s-alert"

export default class AddEventModal extends Component {


    state = {
        currentTime: '00:00',
        addEventModal: false,
        eventName: '',
        eventDescriptions: '',
        eventDate: '',
        startTime: '',
        finishTime: '',
        rating: 1,

    }


    onChangeText = (e) => {
        let { name, value } = e.target;
        if (name === 'eventName') {
            this.setState({ eventName: value })
        } else if(name === 'eventDescription') {
            this.setState({eventDescriptions: value})
        }
    }

    onChangeDate(momentObj, type) {
        let value;
        if (!(typeof momentObj === "string")) {

            if (type === "date") {
                value = momentObj.format("YYYY-MM-DD");
                this.setState({ value });
            } else if (type === "datetime") {
                value = momentObj.format("YYYY-MM-DD");
                this.setState({ value })
            } else if (type === "month") {
                value = momentObj.format("YYYY-MM-DD");
                this.setState({ value });
            }
        } else {
            value = momentObj;
            if (type === "datetime" && moment(value, "DD-MM-YYYY", true).isValid()) {
                value = moment(value, "DD-MM-YYYY", true).format("YYYY-MM-DD");
            }
            this.setState({ value })
        }

        this.setState({ eventDate: value })
    }

    onChangeTime = (e) => {
        let name = (e && e.target && e.target.name) ? e.target.name : '';
        let value = (e && e.target && e.target.value) ? e.target.value : '';
        if (name === 'startTime') {
            this.setState({ startTime: value })
        } else {
            this.setState({ finishTime: value })
        }
    }

    onStarClick = (nextValue, prevValue, name) => {
        this.setState({ rating: nextValue });
    }

    addEvent = () => {
        let self = this;
        let obj = {
            eventName: self.state.eventName,
            eventDescription: self.state.eventDescription,
            eventDate: self.state.eventDate,
            startTime: self.state.startTime,
            finishTime: self.state.finishTime,
            rating: self.state.rating
        };

        let params = {
            url: ``,
            method: "post",
            data: JSON.stringify(obj)
        };
      //  request(params)
         // .then(function (response) {
           //     Alert.success("Etkinlik Oluşturuldu", {
         //        position: 'top-right',
         //        effect: 'stackslide',
         //        timeout: 5000
         //    });
         //    self.props.toggleModal(false);
         //}).catch(function (error) {

        //});

        self.props.toggleModal(false);

    }

    render() {
        return (
            <div>
                {this.state.alert}
                <Modal isOpen={this.props.modal} size='lg'>

                    <ModalHeader toggle={this.cancelModal}>
                        <div style={{ display: "inline-flex" }}>
                            <label>{"Etkinlik Ekleme"}</label>
                        </div>
                    </ModalHeader>

                    <ModalBody>
                        <div style={{ marginTop: '20px' }}>
                            <Form>
                                <div className="Form" style={{ marginBottom: '10px', paddingLeft: '20px', paddingRight: '20px' }}>
                                    <Row>
                                        <Col sm={12}>
                                            Etkinlik Adı: <input className="form-control"
                                                type="text"
                                                value={this.props.value}
                                                onChange={(e) => this.onChangeText({
                                                    target: {
                                                        name: 'eventName',
                                                        value: (e && e.target && e.target.value) ? e.target.value : ''
                                                    }
                                                })} />
                                        </Col>
                                    </Row>
                                    <Label>&nbsp;&nbsp;</Label>
                                    <Row>
                                        <Col sm={12}>
                                            Etkinlik Detayı: <input className="form-control"
                                                type="text"
                                                value={this.props.value}
                                                onChange={(e) => this.onChangeText({
                                                    target: {
                                                        name: 'eventDescription',
                                                        value: (e && e.target && e.target.value) ? e.target.value : ''
                                                    }
                                                })} />
                                        </Col>
                                    </Row>
                                    <Label>&nbsp;&nbsp;</Label>
                                    <Row>
                                        <Col sm={12}>
                                            Etkinlik Tarihi: <Datetime locale="tr"
                                                className="datepicker"
                                                input={true}
                                                closeOnSelect={true}
                                                value={moment(this.state.eventDate, "YYYY-MM-DD", true).isValid() ? moment(this.state.eventDate).format("DD-MM-YYYY") : this.state.eventDate}
                                                dateFormat="DD-MM-YYYY"
                                                timeFormat={false}
                                                onChange={(e) => this.onChangeDate(e, "date")}
                                                inputProps={{ readOnly: true }} />
                                        </Col>
                                    </Row>
                                    <Label>&nbsp;&nbsp;</Label>
                                    <Row>
                                        <Col sm={6}>
                                            Etkinlik Başlama Saati: <TimePicker
                                                minuteStep={30}
                                                defaultValue={moment(this.state.currentTime, 'HH:mm')}
                                                format='HH:mm'
                                                allowClear={false}
                                                onChange={(e) => this.onChangeTime(e, "StartTime")}
                                            />
                                        </Col>
                                        <Col sm={6}>
                                            Etkinlik Bitiş Saati: <TimePicker
                                                minuteStep={30}
                                                defaultValue={moment(this.state.currentTime, 'HH:mm')}
                                                format='HH:mm'
                                                allowClear={false}
                                                onChange={(e) => this.onChangeTime(e, "finishTime")}
                                            />
                                        </Col>
                                    </Row>
                                    <Label>&nbsp;&nbsp;</Label>
                                    <Row>
                                        <Col sm={12}>
                                            Önem Derecesi: <StarRatingComponent
                                                name="rate1"
                                                starCount={5}
                                                value={this.state.rating}
                                                onStarClick={this.onStarClick.bind(this)}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <nav className="col-sm-12 row">
                            <div className="col-sm-2">
                                <button type="button" data-toggle="tooltip" data-placement="bottom"
                                    style={{ background: 'rgb(158, 158, 158)', padding: '11px 45px 11px 20px' }}
                                    rel="tooltip" className="iptal"
                                    onClick={() => this.props.toggleModal(false)}>İptal
                                </button>
                            </div>
                            <div className="col-sm-8"></div>
                            <div className="col-sm-2">
                                <button type="button" data-toggle="tooltip" data-placement="bottom"
                                    style={{ background: 'linear-gradient(rgba(159, 208, 55, 0.6), #9fd037)', padding: '11px 45px 11px 20px' }}
                                    rel="tooltip" className="kaydet"
                                    onClick={() => this.addEvent()}>Kaydet
								</button>
                            </div>

                        </nav>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
