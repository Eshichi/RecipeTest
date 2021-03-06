import React, { Component} from 'react';
import { Row, Col, Form, Modal, Input, Button, Select} from 'antd';
import { Link } from 'react-router-dom';
import './NewItem.css';
import { v4 as uuidv4 } from 'uuid';
import sourceAPI from "../../api/sourceAPI";
import Ingredients from './Ingredients/Ingredients';
import Direction from './Direction/Direction';
import { toast } from 'react-toastify';

class NewItem extends Component{
    constructor(props){
        super(props);
        this.state = {
        newItem : {
            uuid: uuidv4(),
            title :'',
            description: '',
            images: { 
                full: "",
                medium: "",
                small: ""
            },
            servings : "",
            prepTime: "",
            cookTime: "",
            ingredients: [],
            directions: [],
            isIngredients: false,
            isDirection: false,
        },
        firstRender: true,
        isModalActiveIngredients: false,
        isModalActiveDirection: false
        }
    }

    componentDidMount= async() =>{
        if(this.props.match.params.uuid){
            const response = await sourceAPI.get(`/recipes`);
            const idChecker = response.data.forEach(element => {
                   if(element.uuid === this.props.match.params.uuid){
                       this.setState({
                            newItem:{
                                ...this.state.newItem,
                                title :element.title,
                                description:element.description,
                                servings : element.servings,
                                prepTime:element.prepTime,
                                cookTime: element.cookTime,
                                ingredients: element.ingredients,
                                directions: element.directions,
                            }
                       })
                   }
            });
            
            this.setState({
                newItem: {
                    ...this.state.newItem,
                    editDate: new Date().toLocaleString(),
                }
            })
        }else{
            this.setState({
                newItem: {
                    ...this.state.newItem,
                    postDate: new Date().toLocaleString(),
                    editDate: "",
                }
            })
        }
    }
    addIngredients = (ingredients) =>{
        this.setState({
            isIngredients: true,
            newItem: {
                ...this.state.newItem,
                ingredients : [...this.state.newItem.ingredients , ingredients]
            }
        });
    }
    addDirection = (directions) =>{
        this.setState({
            isDirection: true,
            newItem: {
                ...this.state.newItem,
                directions : [...this.state.newItem.directions , directions]
            }
        });
    }
    
    handleChange = (e) => {
        this.setState({
            newItem: {
                ...this.state.newItem,
                [e.target.name]: e.target.value
            }
        });
    };
    handleButtonClick = async() =>{
        if(this.props.match.params.uuid){
            const response = await sourceAPI.patch(`/recipes/${this.props.match.params.uuid}`, this.state.newItem);
            alert("success");
        }else{
            if(this.state.isDirection && this.state.isIngredients){
                const response = await sourceAPI.post(`/recipes`, this.state.newItem);
                this.setState(
                    {
                        newItem:{
                            ...this.state.newItem,
                            title: "",
                            description: "",
                            servings: "",
                            prepTime: "",
                            cookTime: "",
                            ingredients: [],
                            directions: [],
                        }
                    }
                )
            alert("success");
            }else{
                alert("add direction/ingredients");
            }
        }
    }

    handleOpenModalIngredients =() =>{
        this.setState({
            isModalActiveIngredients : true
        });
    }

    handleCloseModalIngredients =() =>{
        this.setState({
            isModalActiveIngredients : false
        });
    }
    handleOpenModalDirection =() =>{
        this.setState({
            isModalActiveDirection : true
        });
    }

    handleCloseModalDirection =() =>{
        this.setState({
            isModalActiveDirection : false
        });
    }

    render(){
        const validateMessages = {
            required: "Required field!",
            types: {
                number: "is not a validate number!",
            },
            number: {
                range: "must be between ${min} and ${max}",
            },
        };

        let {
            title,
            description,
            servings,
            prepTime,
            cookTime,
        } = this.state.newItem
        
        let listIngredients,listDirections;

        if(this.state.newItem.ingredients){
            listIngredients = this.state.newItem.ingredients.map((ingredients, index) => {
                return(
                <li key={index}>{ingredients.name}</li>
                )
            })
        }
        if(this.state.newItem.directions){
            listDirections = this.state.newItem.directions.map((direction, index) => {
                return(
                <li key={index}>{direction.instructions}</li>
                )
            })
        }
        

        return(
        <div>
            <div>
                <Row>
                    <Col span={24}>
                        <div className="landing-title">
                            {
                                this.props.match.params.uuid ? <span>Update Item</span> : <span>New Item</span>
                            }
                            
                        </div>
                    </Col>
                    
                </Row>
            </div>
            <Row>
                <Col span={24}>
                        <Row>
                            <Col span={24}>
                                <div className="newitem-content">
                                    <Form
                                        className="newitem-content-form"
                                        labelCol={{ xs: 24 }}
                                        wrapperCol={{ xs: 24 }}
                                        name="newItem"
                                        scrollToFirstError
                                        validateMessages={validateMessages}
                                        onFinish={this.handleButtonClick}
                                    >
                                        <Form.Item
                                            name="title"
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                            ]}
                                        >
                                            <div>
                                                <Input name="title" value={title} onChange={this.handleChange} placeholder="title"></Input>
                                            </div>
                                        </Form.Item>
                                        <Form.Item
                                            name="description"
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                            ]}
                                        >
                                            <div>
                                                <Input name="description" value={description} onChange={this.handleChange} placeholder="description"></Input>
                                            </div>
                                        </Form.Item>
                                        <Form.Item
                                            name="servings"
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                            ]}
                                        >
                                            <div>
                                                <Input name="servings" value={servings} onChange={this.handleChange} placeholder="servings"></Input>
                                            </div>
                                        </Form.Item>
                                        <Form.Item
                                            name="prepTime"
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                            ]}
                                        >
                                            <div>
                                                <Input name="prepTime" value={prepTime} onChange={this.handleChange} placeholder="prepTime"></Input>
                                            </div>
                                        </Form.Item>
                                        <Form.Item
                                            name="cookTime"
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                            ]}
                                        >
                                            <div>
                                                <Input name="cookTime" value={cookTime} onChange={this.handleChange} placeholder="cookTime"></Input>
                                            </div>
                                        </Form.Item>
                                        <Form.Item
                                            name="ingredients"
                                        >
                                            <div>
                                                
                                                <ul>
                                                    {listIngredients}
                                                </ul>
                                                <Button onClick={this.handleOpenModalIngredients}>Add ingredients</Button>
                                            </div>
                                        </Form.Item>
                                        <Form.Item
                                            name="directions"
                                        >
                                            <div>
                                            <ul>
                                                    {listDirections}
                                                </ul>
                                                <Button  onClick={this.handleOpenModalDirection}>Add directions</Button>
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <div>
                                            <Button
                                                                            type="primary"
                                                                            htmlType="submit"
                                                                        >
                                                                            Submit
                                                                    </Button>
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div className="detail-back">
                                    <Link to="/"><Button>Back to recipe list</Button></Link>
                                </div>
                            </Col>
                        </Row>
                </Col>
            </Row>

            <Ingredients isModalActiveIngredients={this.state.isModalActiveIngredients} handleCloseModalIngredients={this.handleCloseModalIngredients} addIngredients={this.addIngredients}/>
            <Direction isModalActiveDirection={this.state.isModalActiveDirection} handleCloseModalDirection={this.handleCloseModalDirection} addDirection={this.addDirection} />
        </div>
        )
    }
}
export default NewItem;
