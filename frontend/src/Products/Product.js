import React from 'react';
import { Card } from 'react-bootstrap';

export const Product = props => {

    return <Card id = "foodCard" className="border">
        
        <Card.Title id = "foodCard" className="card-header bg-light">
            Name: {props.product.foodName}
            <span className="badge float-right" id="foodCard">Food Group: {props.foodGroup}</span>
        </Card.Title>  
        <Card.Text id = "foodCard" className="list-group">
            <div id = "foodStat2" className="list-group-item px-3 py-2">Serving Portion: {props.product.servingPortion}</div>  
            <div id = "foodStat" className="list-group-item px-3 py-2">Total Calories: {props.product.totalCalories}</div>  
            <div id = "foodStat2" className="list-group-item px-3 py-2">Total Fat: {props.product.totalFat}</div>  
            <div id = "foodStat" className="list-group-item px-3 py-2">Trans Fat: {props.product.transFat}</div>  
            <div id = "foodStat2" className="list-group-item px-3 py-2">Saturated Fat: {props.product.saturatedFat}</div>  
            <div id = "foodStat" className="list-group-item px-3 py-2">Cholesterol: {props.product.cholesterol}</div>  
            <div id = "foodStat2" className="list-group-item px-3 py-2">Sodium: {props.product.sodium}</div>  
            <div id = "foodStat" className="list-group-item px-3 py-2">Total Carbohydrates: {props.product.totalCarbohydrate}</div>  
            <div id = "foodStat2" className="list-group-item px-3 py-2">Sugars: {props.product.sugars}</div>  
            <div id = "foodStat" className="list-group-item px-3 py-2">Protein: {props.product.protein}</div>
        </Card.Text>
    </Card>

}

export default Product;