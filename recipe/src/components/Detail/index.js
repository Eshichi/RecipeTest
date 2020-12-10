
import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import {Row, Col ,Card ,Checkbox , Button , List, Typography, Divider} from 'antd';
import './Detail.css';
import sourceAPI from '../../api/sourceAPI';
import { PlusOutlined  } from '@ant-design/icons';
import DetailModal from './Modal/DetailModal';
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';

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
            const resSpecials = await sourceAPI.get(`/specials`);
            const recipeFilter = response.data.forEach(item => {
                if(item.uuid === this.props.match.params.uuid){
                    resSpecials.data.forEach(spItem => {
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

                        item.ingredients.forEach(ingredient => {
                            if(ingredient.uuid === spItem.ingredientId){
                                let existingData = this.state.ingredients.find((ingredient) => {
                                    return ingredient.uuid == spItem.ingredientId
                                })
                                existingData.title = spItem.title;
                                existingData.type = spItem.type;
                                existingData.text = spItem.text;

                                this.setState({
                                    ingredients : this.state.ingredients
                                })
                            }
                        })
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
                <Row>
                    <Col span={24}>
                    {ingredient.title ? <Fragment> <span> {ingredient.title} </span>  <StarOutlined /> </Fragment>  : null}
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <span>{ingredient.name}</span>  <Checkbox />
                    </Col>
                </Row>
            </div>
            return(
                <Col key={index} span={4}>
                    <div className={ingredient.type ? "special-ingredients-card" : "ingredients-card"}>
                        <Card title={cardTitle} bordered={true}>
                            {ingredient.text ?
                                <div className="special-ingredients-text">
                                    <span> {ingredient.text}</span> 
                                </div> : null
                                }
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
            <div>
                <Row>
                    <Col span={24}>
                        <div className="landing-title">
                            <span>Details</span>
                        </div>
                    </Col>
                    
                </Row>
            </div>
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
                                        {/* <Button onClick={this.handleOpenModal}><PlusOutlined /></Button> */}
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
