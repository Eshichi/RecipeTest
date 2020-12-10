import React from 'react';
import { Row, Col, Modal, Button , Input ,Form} from 'antd';
import './Ingredients.css'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

class Ingredients extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Ingredients: {
                uuid: uuidv4(),
                amount: "",
                measurement: "",
                name: ""
            }
        };
    }
    handleCancel = () => {
        this.props.handleCloseModalIngredients();
    }
    handleChange = (e) => {
        this.setState({
            Ingredients: {
                ...this.state.Ingredients,
                [e.target.name]: e.target.value
            }
        });
    };
    handleButtonClick =() =>{
        this.props.addIngredients(this.state.Ingredients);
        this.setState({
            Ingredients: {
                amount: "",
                measurement: "",
                name: ""
            }
        })
        toast.success("Added");
        this.props.handleCloseModalIngredients();
    }

    render() {

        let {
            amount,
            measurement,
            name,
        } = this.state.Ingredients;

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
                visible={this.props.isModalActiveIngredients}
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
                                        <span>Add new Ingredients</span>
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
                                        className="ingredients-form"
                                        labelCol={{ xs: 24 }}
                                        wrapperCol={{ xs: 24 }}
                                        name="newIngredients"
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
                                                <Input name="amount" value={amount} onChange={this.handleChange} placeholder="amount"></Input>
                                            </div>
                                        </Form.Item>
                                        <Form.Item
                                            name="measurement"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <div>
                                            <Input name="measurement" value={measurement} onChange={this.handleChange} placeholder="measurement"></Input>
                                            </div>
                                        </Form.Item>
                                        <Form.Item
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <div>
                                            <Input name="name" value={name} onChange={this.handleChange} placeholder="name"></Input>
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

export default Ingredients

