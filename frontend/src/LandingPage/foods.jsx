import React, { Component } from 'react';
import './App.css';
import { Card, Pagination, Input, message, Row, Col } from 'antd';
import { EditOutlined, EllipsisOutlined, HeartOutlined, CloseOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { reqAddDislikeFood, reqAddLikeFood, reqAllFood, reqDeleteDislikeFood, reqDeleteLikeFood } from "../api/main";

const { Meta } = Card;
const { Search } = Input;

function convertParamsToObj(paramStr) {
    let params = paramStr.slice(1).split("&")
    let objs = {}
    for (let param of params) {
        const [k, v] = param.split("=")
        objs[k] = v
    }
    return objs
}

export class Foods extends Component {

    state = {
        foodsList: [{
            id: 1,
            foodsName: '1',
            foodsDescription: '好吃得很',
        }, {
            id: 2,
            foodsName: '2',
            foodsDescription: '好吃得很',
        }, {
            id: 3,
            foodsName: '3',
            foodsDescription: '好吃得很',
        }, {
            id: 4,
            foodsName: '4',
            foodsDescription: '好吃得很',
        }, {
            id: 5,
            foodsName: '5',
            foodsDescription: '好吃得很',
        }, {
            id: 6,
            foodsName: '6',
            foodsDescription: '好吃得很',
        }, {
            id: 7,
            foodsName: '7',
            foodsDescription: '好吃得很',
        }, {
            id: 8,
            foodsName: '8',
            foodsDescription: '好吃得很',
        }, {
            id: 9,
            foodsName: '9',
            foodsDescription: '好吃得很',
        }, {
            id: 10,
            foodsName: '9',
            foodsDescription: '好吃得很',
        }],
        filterFoodList: [],
        pagination: {},
    };

    constructor(props) {
        super(props)
        let params = convertParamsToObj(this.props.location.search)
        const {search = "" } = params
        this.setState({
            search
        })
        
    }

    
    getAllFoods = () => {
        console.log("hello world!")
        reqAllFood(this.state.search).then(res => {
            const { status, data } = res;
            console.log(res);
            if (status === 200) {
                this.setState({
                    foodsList: data,
                });
            }
            // else {
            //     message.error(message);
            // }
        });
    };
    
    getLikeFoods = (foods) => {
        message.success('!');
        reqAddLikeFood({
            foodsName: foods.foodsName,
            userId: foods.userId,
        }).then(res => {
            const { code, message } = res.data;

            if (code === 0) {
                message.success(message);
            } else {
                message.error(message);
            }
        });
    };
    
    deleteLikeFoods = (foods) => {
        message.success('!');
        reqDeleteLikeFood({
            foodsName: foods.foodsName,
            userId: foods.userId,
        }).then(res => {
            const { code, message } = res.data;

            if (code === 0) {
                message.success(message);
            } else {
                message.error(message);
            }
        });
    };
    
    getDislikeFoods = (foods) => {
        message.success('!');
        reqAddDislikeFood({
            foodsName: foods.foodsName,
            userId: foods.userId,
        }).then(res => {
            const { code, message } = res.data;

            if (code === 0) {
                message.success(message);
            } else {
                message.error(message);
            }
        });
    };
    
    deleteDislikeFoods = (foods) => {
        message.success('!')
        reqDeleteDislikeFood({
            foodsName: foods.foodsName,
            userId: foods.userId,
        }).then(res => {
            const { code, message } = res.data;

            if (code === 0) {
                message.success(message);
            } else {
                message.error(message);
            }
        });
    };
    
    searchFoods = (value) => {
        const { foodsList, filterFoodList } = this.state;
        if (filterFoodList.length > 0) {
            if (value) {
                this.setState({
                    foodsList: foodsList.filter(item => item.foodsName.includes(value))
                });
            } else {
                this.setState({
                    foodsList: this.state.filterFoodList
                });
            }
        } else {
            this.setState({
                filterFoodList: foodsList
            }, () => {
                if (value) {
                    this.setState({
                        foodsList: foodsList.filter(item => item.foodsName.includes(value))
                    });
                } else {
                    this.setState({
                        foodsList: this.state.filterFoodList
                    });
                }
            });
        }
    };

    componentDidMount() {
        this.getAllFoods();
        this.setState({
            pagination: {
                total: 50,
                current: 1,
                defaultPageSize: 10,
                pageSize: 10,
                defaultCurrent: 1,
                onChange(current, pageSize) {

                }
            }
        })
    }

    render() {
        const { foodsList } = this.state;

        return (
            <div id="foods">
               
                <div className="main-list">
                    <Row gutter={[16, 16]}>
                        {
                            foodsList.map(item => (
                                <Col span={6}>
                                    <Card
                                        key={item.foodId}
                                        style={{ width: 300 }}
                                        cover={
                                            <img
                                                alt="example"
                                                src={require('../public/images/food.jpg')}
                                            />
                                        }
                                        actions={[
                                            
                                            <EllipsisOutlined key="heart" onClick={() =>this.props.history.push('/product/'+item.foodName)} />,

                                        ]}
                                    >
                                        <Meta
                                            title={item.foodName}
                                            description={item.foodsDescription}
                                        />
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                    <div className="pagination-list">
                        <Pagination {...this.state.pagination} />
                    </div>
                </div>
            </div>
        );
    }
};

export default Foods;