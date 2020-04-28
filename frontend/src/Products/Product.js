import React from 'react';
import { Card } from 'react-bootstrap';

export const Product = props => {

    return <Card id = "foodCard">
        
        <Card.Title id = "foodCard" className="card-header bg-light">Name: {props.product.foodName}</Card.Title>  
        <Card.Text id = "foodCard" className="list-group">
            <div className="list-group-item px-3 py-2">Serving Portion: {props.product.servingPortion}</div>  
            <div className="list-group-item px-3 py-2">Total Calories: {props.product.totalCalories}</div>  
            <div className="list-group-item px-3 py-2">Total Fat: {props.product.totalFat}</div>  
            <div className="list-group-item px-3 py-2">Trans Fat: {props.product.transFat}</div>  
            <div className="list-group-item px-3 py-2">Saturated Fat: {props.product.saturatedFat}</div>  
            <div className="list-group-item px-3 py-2">Cholesterol: {props.product.cholesterol}</div>  
            <div className="list-group-item px-3 py-2">Sodium: {props.product.sodium}</div>  
            <div className="list-group-item px-3 py-2">Total Carbohydrates: {props.product.totalCarbohydrate}</div>  
            <div className="list-group-item px-3 py-2">Sugars: {props.product.sugars}</div>  
            <div className="list-group-item px-3 py-2">Protein: {props.product.protein}</div>
        </Card.Text>
    </Card>

}

export default Product;