import React, { Component} from 'react';
import { Row, Col ,Card ,Button } from 'antd';
import { Link } from 'react-router-dom';
import './NewItem.css';
import sourceAPI from "../../api/sourceAPI";

class NewItem extends Component{
    constructor(props){
        super(props);
        this.state = {
        recipeData : [],
        firstRender: true,
        }
    }



    render(){

        return(
        <div>
            <Row>
                <Col span={24}>
                    <div className="landing-content">
                    NewItem
                    </div>
                </Col>
            </Row>
        </div>
        )
    }
}
export default NewItem;
