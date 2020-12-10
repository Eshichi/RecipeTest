import React from 'react';
import { Row, Col, Modal, Button, Pagination, Collapse , Input} from 'antd';
import './DetailModal.css'


class DetailModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handleCancel = () => {
        this.props.handleCloseModal();
    }
    render() {


        return (
            <Modal
                className="detail-modal-container"
                closable={true}
                visible={this.props.isModalActive}
                onCancel={this.handleCancel}
                centered
                footer={
                    null
                }
            >
                <Row>
                    <Col span={24}>
                        <div>
                            <Row>
                                <Col span={24}>
                                    <div className="detail-modal-title">
                                        <span>Add new ingredient</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <div className="detail-modal-inputs">
                                        <Input placeholder="Name"/>
                                        <Input placeholder="amount"/>
                                        <Input placeholder="measurement"/>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <div className="detail-modal-button">
                                        <Button>Submit</Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Modal>
        );
    }


}

export default DetailModal

