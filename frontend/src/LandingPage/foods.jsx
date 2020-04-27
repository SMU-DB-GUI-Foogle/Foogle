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
            foodsName: '食物1',
            foodsDescription: '好吃得很',
        }, {
            id: 2,
            foodsName: '食物2',
            foodsDescription: '好吃得很',
        }, {
            id: 3,
            foodsName: '食物3',
            foodsDescription: '好吃得很',
        }, {
            id: 4,
            foodsName: '食物4',
            foodsDescription: '好吃得很',
        }, {
            id: 5,
            foodsName: '食物5',
            foodsDescription: '好吃得很',
        }, {
            id: 6,
            foodsName: '食物6',
            foodsDescription: '好吃得很',
        }, {
            id: 7,
            foodsName: '食物7',
            foodsDescription: '好吃得很',
        }, {
            id: 8,
            foodsName: '食物8',
            foodsDescription: '好吃得很',
        }, {
            id: 9,
            foodsName: '食物9',
            foodsDescription: '好吃得很',
        }, {
            id: 10,
            foodsName: '食物9',
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

    /**
     * 请求方法区域  
     */
    // 请求所有食物列表
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
    // 加入喜欢列表请求
    getLikeFoods = (foods) => {
        message.success('添加喜欢食物成功!');
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
    // 删除喜欢食物请求
    deleteLikeFoods = (foods) => {
        message.success('删除喜欢食物成功!');
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
    // 加入不喜欢列表请求
    getDislikeFoods = (foods) => {
        message.success('加入不喜欢列表成功!');
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
    // 删除不喜欢列表请求
    deleteDislikeFoods = (foods) => {
        message.success('删除不喜欢列表成功!')
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
    /**
     * 通用方法区域
     * @param value
     */
    // 模糊搜索食物
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
                                            
                                            <HeartOutlined key="heart" onClick={() =>this.props.history.push('/product/'+item.foodName)} />,

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