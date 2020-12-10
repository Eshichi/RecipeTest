import React, { Component} from 'react';
import { Row, Col ,Card } from 'antd';
import { Link } from 'react-router-dom';
import './Landing.css';
import sourceAPI from "../../api/sourceAPI";

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
                    <Col span={8}>
                        <Link to={`/Detail/${data.uuid}`}>
                            <Card key={index}
                            hoverable
                            className="landing-card"
                            // cover={<img alt="example" src={`http://localhost:3001/${data.images.full}`} />}
                            >
                                <h2>{data.title}</h2>
                            </Card>
                        </Link>
                    </Col>
                )
        })

        return(
        <div>
            <Row>
                <Col span={24}>
                    <div>
                        <Row>
                            {recipeMap}
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
        )
    }
}
export default Landing;
