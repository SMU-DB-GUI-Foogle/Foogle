import React from 'react';

export const Product = props => {

    return <div className="container-fluid card">
        <div className="card-header">Name: {props.product.foodName}</div>  
        <div>Serving Portion: {props.product.servingPortion}</div>  
        <div>Total Calories: {props.product.totalCalories}</div>  
        <div>Total Fat: {props.product.totalFat}</div>  
        <div>Trans Fat: {props.product.transFat}</div>  
        <div>Saturated Fat: {props.product.saturatedFat}</div>  
        <div>Cholesterol: {props.product.cholesterol}</div>  
        <div>Sodium: {props.product.sodium}</div>  
        <div>Total Carbohydrates: {props.product.totalCarbohydrate}</div>  
        <div>Sugars: {props.product.sugars}</div>  
        <div>Protein: {props.product.protein}</div>  
    </div>

}

export default Product;