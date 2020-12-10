import React from 'react';
import { Row, Col, Modal, Button , Input ,Form , Switch} from 'antd';
import './Direction.css'
import { v4 as uuidv4 } from 'uuid';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

class Direction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            direction: {
                uuid: uuidv4(),
                instructions: "",
                optional: true,
            }
        };
    }
    handleCancel = () => {
        this.props.handleCloseModalDirection();
    }
    handleChange = (e) => {
        this.setState({
            direction: {
                ...this.state.direction,
                [e.target.name]: e.target.value
            }
        });
    };
    handleButtonClick =() =>{
        this.props.addDirection(this.state.direction)
        this.setState({
            direction: {
                instructions: "",
                optional: true,
            }
        })
        toast.success("Added");
        this.props.handleCloseModalDirection();
    }
    handleOptional = () => {
        this.setState({
            direction:{
                ...this.state.direction,
                optional : !this.state.direction.optional
            }
        })
    }
    render() {

        let {
            instructions,
            optional
        } = this.state.direction;

        const validateMessages = {
            required: "Required field!",
            types: {
                number: "is not a validate number!",
            },
            number: {
                range: "must be between ${min} and ${max}",
            },
        };
        return (
            <Modal
                className="detail-modal-container"
                closable={true}
                visible={this.props.isModalActiveDirection}
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
                                        <span>Add new Direction</span>
                                    </div>
                                </Col>
                            </Row>
                            {/* <Row>
                                <Col span={24}>
                                    <div className="detail-modal-inputs">
                                        <Input name="amount" value={amount} onChange={this.handleChange} placeholder="amount"></Input>
                                        <Input name="measurement" value={measurement} onChange={this.handleChange} placeholder="measurement"></Input>
                                        <Input name="name" value={name} onChange={this.handleChange} placeholder="name"></Input>
                                    </div>
                                </Col>
                            </Row> */}
                            <Row>
                                <Col span={24}>
                                <Form
                                        className="Direction-form"
                                        labelCol={{ xs: 24 }}
                                        wrapperCol={{ xs: 24 }}
                                        name="newDirection"
                                        scrollToFirstError
                                        validateMessages={validateMessages}
                                        onFinish={this.handleButtonClick}
                                    >
                                        <Form.Item
                                            name="amount"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <div>
                                                <Input name="instructions" value={instructions} onChange={this.handleChange} placeholder="instructions"></Input>
                                            </div>
                                        </Form.Item>
                                        <Form.Item
                                            name="optional"
                                        >
                                            <div>
                                            <Switch
                                                checkedChildren={<CheckOutlined />}
                                                unCheckedChildren={<CloseOutlined />}
                                                defaultChecked={true}
                                                onChange
                                            />
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                >
                                                    Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                    
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Modal>
        );
    }


}

export default Direction

