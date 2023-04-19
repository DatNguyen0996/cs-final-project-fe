# Badminton Store

Badminton store is a website that allows the management of store branches and online sales of badminton related equipment or accessories.

For customer accounts, customers can view the store's list of available products, view inventory, view reviews and product information to choose the right product, Customers can also create their own account, add products to their cart.

For administrator accounts, administrators can not only view product information such as customers, but also view orders, confirm and fulfill orders for customers. Update information about the number of products in stock.

For manager accounts, the manager can create accounts for the administrators of the branches, update product information, create special events and discounts, view statistical information of products sold in each branch of the store.

---

## User Story

### Authentication

- [] As a user, I can register for a account with email, my name and password
- [] As a user, I can sign in with my email and password

### Customer

- [] As a customer, I can see many product layout on the website
- [] As a customer, I can see paginate through all productfrom the database
- [] As a customer, I can see the detail of one single product in a separate page, then add products to my cart
- [] As a customer, I can see filter UI and can filter product by genres
- [] As a customer, I can see search UI and can search product in the database by keyword
- [] As a customer, I can see the website is responsive for the minimum of Desktop, iPhone, and Tablet
- [] As a customer, I can see routes that allow user to revisit the same display when using such routes

### Administrator

- [] As a administrator, I can create a list of confirmed orders.
- [] As a administrator, I have a confirmation of the procedures performed (product preparation - product packaging - waiting for delivery - delivery - successful delivery).
- [] As a administrator, I can update the number of products in stock.

### Manager

- [] As a manager, I can create accounts for my administrators.
- [] As a manager, I can update product information (price, product name, product description....).
- [] As a manager, I can create special events for products (discount, buy 1 get 1 free, ...)
- [] As a manager, I can see the chart of the number of products sold at the branches

---

## End point

### Auth APIs

```Javascript
/**
 * @route Post /login
 * @description login with email and password
 * @body {email, password}
 * @access public
 * /

```

### Product

```Javascript
/**
 * @route Get /products?page=1&limit=10&name=<product name>
 * @description get all product
 * @access public
 * /

```

```Javascript
/**
 * @route Get /products/:productid
 * @description get gingle product by ID
 * @access Login require
 * /

```

```Javascript
/**
 * @route Post /products
 * @description create a new product
 * @body {...}
 * @access Login require
 * /

```

```Javascript
/**
 * @route Put /products:/productid
 * @description update a product
 * @body {...}
 * @access Login require
 * /

```

```Javascript
/**
 * @route Delete /products:/productid
 * @description delete a product
 * @access Login require
 * /

```

### User

```Javascript
/**
 * @route Get /users?page=1&limit=10&name=<username>
 * @description get all users
 * @access Login require
 * /
```

```Javascript
/**
 * @route Get /users/:userid
 * @description get gingle user by ID
 * @access Login require
 * /

```

```Javascript
/**
 * @route Get /users/cart
 * @description get cart of user
 * @access public
 * /

```

```Javascript
/**
 * @route Get /users/orders
 * @description get all order of user
 * @access Login require
 * /

```

```Javascript
/**
 * @route Post /users
 * @description register a new account for customer
 * @body {name, email, password}
 * @access Login require
 * /

```

```Javascript
/**
 * @route Put /users/cart/:userid
 * @description add a product to customer's cart
 * @body {productId,quantity}
 * @access Login require
 * /

```

```Javascript
/**
 * @route Delete /users/:userid
 * @description delete a user
 * @access Login require
 * /

```

### Stores

```Javascript
/**
 * @route Get /stores?page=1&limit=10&name=<storename>
 * @description get all stores
 * @access public
 * /

```

```Javascript
/**
 * @route Get /stores/:storeid
 * @description get gingle store by ID
 * @access Login require
 * /

```

```Javascript
/**
 * @route Get /stores/order/:storeid
 * @description get all order of store
 * @access Login require
 * /

```

```Javascript
/**
 * @route Post /stores
 * @description register a new store
 * @body {name, address}
 * @access Login require
 * /

```

```Javascript
/**
 * @route Put /stores/:storeid
 * @description update store
 * @body {...}
 * @access Login require
 * /

```

```Javascript
/**
 * @route Delete /stores/:storeid
 * @description delete a store
 * @access Login require
 * /

```

### Cart

```Javascript
/**
 * @route Get /carts?page=1&limit=10
 * @description get all carts
 * @access Login require
 * /
```

```Javascript
/**
 * @route Get /carts/:orderid
 * @description get gingle cart by ID
 * @access Login require
 * /

```

```Javascript
/**
 * @route Post /carts
 * @description create a new cart
 * @body {userID}
 * @access public
 * /

```

```Javascript
/**
 * @route Put /carts/:cartid
 * @description update cart
 * @body {productID, quantity}
 * @access Login require
 * /

```

```Javascript
/**
 * @route Delete /carts/:cartid
 * @description delete a cart
 * @access Login require
 * /

```

### order

```Javascript
/**
 * @route Get /orders?page=1&limit=10
 * @description get all orders
 * @access Login require
 * /
```

```Javascript
/**
 * @route Get /orders/:orderid
 * @description get gingle order by ID
 * @access Login require
 * /

```

```Javascript
/**
 * @route Post /orders
 * @description create a new order
 * @body {productID, storeID, userID}
 * @access Login require
 * /

```

```Javascript
/**
 * @route Put /orders/:orderid
 * @description update order
 * @body {...}
 * @access Login require
 * /

```

```Javascript
/**
 * @route Delete /orders/:orderid
 * @description delete a order
 * @access Login require
 * /

```

### comment

```Javascript
/**
 * @route Get /comments?page=1&limit=10
 * @description get all comments
 * @access Login require
 * /
```

```Javascript
/**
 * @route Get /comments/:commentid
 * @description get gingle comment by ID
 * @access Login require
 * /

```

```Javascript
/**
 * @route Post /comments
 * @description create a new comment
 * @body {productID, userID}
 * @access Login require
 * /

```

```Javascript
/**
 * @route Put /comments/:commentid
 * @description update comment
 * @body {...}
 * @access Login require
 * /

```

```Javascript
/**
 * @route Delete /comments/:commentid
 * @description delete a comment
 * @access Login require
 * /

```
