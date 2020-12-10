import React, { Component} from 'react';
import { Row, Col ,Card ,Button } from 'antd';
import { Link } from 'react-router-dom';
import './Landing.css';
import sourceAPI from "../../api/sourceAPI";
import { PlusOutlined  } from '@ant-design/icons';

class Landing extends Component{
    constructor(props){
        super(props);
        this.state = {
        recipeData : [],
        firstRender: true,
        }
    }

    componentDidMount = async() =>{
        if(this.state.firstRender){
            const response = await sourceAPI.get(`/recipes`);
            this.setState({
                recipeData: response.data,
                firstRender: false
            })
        }
    }


    render(){
        let recipeMap = this.state.recipeData.map((data, index)=>{
                return(
                    <Col span={8} key={index}>
                        <Link to={`/Detail/${data.uuid}`}>
                            <Card key={index}
                            hoverable
                            className="landing-card"
                            cover={<img alt="example" src={`http://localhost:3001/${data.images.medium}`} />}
                            >
                                <h2>{data.title}</h2>
                                <Link to={`/NewItem/${data.uuid}`}>Edit</Link>
                            </Card>
                        </Link>
                    </Col>
                )
        })

        return(
        <div>
            <div>
                <Row>
                    <Col span={24}>
                        <div className="landing-title">
                            <span>Recipes</span>
                        </div>
                    </Col>
                    
                </Row>
            </div>
            <Row>
                <Col span={24}>
                    <div className="landing-content">
                        <Row>
                            {recipeMap}
                            <Link to="/NewItem"><Button><PlusOutlined /></Button></Link>
                        </Row>
                    </div>
                    
                </Col>
            </Row>
        </div>
        )
    }
}
export default Landing;
