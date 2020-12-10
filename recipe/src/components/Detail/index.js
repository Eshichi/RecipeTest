
import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import {Row, Col ,Card ,Checkbox , Button , List, Typography, Divider} from 'antd';
import './Detail.css';
import sourceAPI from '../../api/sourceAPI'
import { PlusOutlined  } from '@ant-design/icons';
import DetailModal from './Modal/DetailModal'

class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            cookTime : 0,
            description : '',
            direction: [],
            editDate : '',
            images : [],
            ingredients: [],
            postDate:  '',
            prepTime: '',
            servings: '',
            title: '',
            firstRender: true,
            isModalActive: false
        }
    }

    componentDidMount = async() =>{
        if(this.state.firstRender){
            const response = await sourceAPI.get(`/recipes`);
            const recipeFilter = response.data.forEach(item => {
                if(item.uuid === this.props.match.params.uuid){
                    this.setState({
                        cookTime : item.cookTime,
                        description : item.description,
                        direction: item.directions,
                        editDate : item.editDate,
                        images : item.images,
                        ingredients: item.ingredients,
                        postDate:  item.postDate,
                        prepTime: item.prepTime,
                        servings: item.servings,
                        title: item.title,
                        firstRender: false,     
                    })
                }
            });
        }
    }

    
    handleOpenModal =() =>{
        this.setState({
            isModalActive : true
        })
    }

    handleCloseModal =() =>{
        this.setState({
            isModalActive : false
        })
    }
    render(){
        console.log(this.state.ingredients)

        const ingredientsList = this.state.ingredients.map((ingredient , index) => {
            const cardTitle = <div>
                <span>{ingredient.name}</span>  <Checkbox />
            </div>
            return(
                <Col key={index} span={4}>
                    <div className="ingredients-card">
                        <Card title={cardTitle} bordered={true}>
                            <div className="ingredients-details">
                                <span>amount : {ingredient.amount}</span>
                                <span>measurement: {ingredient.measurement ? ingredient.measurement : "not indicated"}</span>
                            </div>
                        </Card>
                    </div>
                </Col>
            )
        })

        return(
        <div>
            <Row>
                <Col span={24}>
                    <div>
                        <Row>
                            <Col span={12}>
                                <div className="detail-image">
                                    { this.state.images.full ? <img alt="example" src={`http://localhost:3001/${this.state.images.full}`} /> : null}
                                    
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="detail-description">
                                    <span>{this.state.title}</span>
                                    <span>{this.state.description}</span>
                                    <span>Prep time  : {this.state.prepTime} minutes</span>
                                    <span>Cook time : {this.state.cookTime} minutes</span>
                                    <span>Number of servings : {this.state.servings}</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div className="detail-ingredients">
                                    <Row>
                                        {ingredientsList}
                                        <Button onClick={this.handleOpenModal}><PlusOutlined /></Button>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div className="detail-direction">
                                <List
                                    header={<div className="direction-title">Directions: </div>}
                                    footer={null}
                                    bordered
                                    dataSource={this.state.direction}
                                    renderItem={(direction , index)=> (
                                        <List.Item>
                                        <Typography.Text mark>Step  {index + 1}:</Typography.Text> <span>{`[${direction.optional ?  "Optional" : "Not optional"}] : ${direction.instructions} `} </span>
                                        </List.Item>
                                    )}
                                    />
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
                    </div>
                </Col>
            </Row>

            <DetailModal isModalActive={this.state.isModalActive} handleCloseModal={this.handleCloseModal}/>
        </div>
        )
    }
}
export default Detail;
