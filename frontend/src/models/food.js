export class Food {
    constructor(product) {
        this.foodName = product.foodName;
        this.servingPortion = product.servingPortion;
        this.foodGroupId = product.foodGroupId;
        this.totalCalories = product.totalCalories;
        this.totalFat = product.totalFat;
        this.transFat = product.transFat;
        this.saturatedFat = product.saturatedFat;
        this.cholesterol = product.cholesterol;
        this.sodium = product.sodium;
        this.totalCarbohydrate = product.totalCarbohydrate;
        this.sugars = product.sugars;
        this.protein = product.protein;
    }
}

export default Food;