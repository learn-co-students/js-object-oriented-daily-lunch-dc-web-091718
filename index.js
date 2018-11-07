// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let mealIdConst = 0
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealIdConst

    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id
      }.bind(this))
  }

  customers() {
    //returns all customers who have had this meal delivered
    let customers = this.deliveries().map( delivery => delivery.customer())
    return [...new Set(customers)]
  }

  static byPrice() {
    return store.meals.sort((mealA, mealB) => {
        return mealB.price - mealA.price
    })
  }
}

let neighborhoodIdConst = 0
class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodIdConst

    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.neighborhoodId === this.id;
    }.bind(this))
  } 

  customers() {
    let customers = this.deliveries().map(delivery => delivery.customer());
    return [...new Set(customers)]
  }

  meals() {
    let meals = this.deliveries().map(delivery => delivery.meal())
    return [...new Set(meals)]
  }
}

let customerIdConst = 0
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerIdConst

    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.customerId === this.id;
    }.bind(this))
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  totalSpent() {
    let total = 0

    for(const meal of this.meals()) {
      total += meal.price
    }
    return total
  }
}

let deliveryIdConst = 0
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryIdConst

    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId
      }.bind(this))
  }

  customer() {
    return store.customers.find(
      function(customer) {
        return customer.id === this.customerId
      }.bind(this))
  }

  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood.id === this.neighborhoodId
      }.bind(this))
  }
}