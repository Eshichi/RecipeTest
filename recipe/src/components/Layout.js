
import {Row, Col , Button} from 'antd';
import React, { Component} from 'react';
import './Layout.css';

class Layout extends Component{
    constructor(props){
        super(props);
    }
    render(){
        
        return(
            <div className="landing-container">
                
            <div>
                <Row>
                    <Col span={24}>
                        <div className="landing-title">
                            <span>Recipes</span>
                        </div>
                    </Col>
                    
                </Row>
            </div>
            <div>
                <Row>
                    <Col span={24}>
                            {this.props.children}
                    </Col>
                </Row>
            </div>
        </div>
        )
    }
}
export default Layout;
