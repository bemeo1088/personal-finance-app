# Name of Project

My solo project focuses on solving the budgeting problem that i currently have while planning my everyday finance. The web app enables users to add their monthly income, and create a budget for six categories: Rent, Groceries, Gas, Utilities, Restaurants, and Miscellaneous expenses. The information will be posted to the SQL database and concurrently listed as a Budgets List table below on the Budgets page. Users are able to remove the categories as desired. Underneath the table shows the remaining balance of their monthly income. There's a "show chart" button where users can click on to show their categories' pie chart.
On Transactions page, users are able to create, edit and remove their own transactions based on date, description, category and amount. The table will be displayed to list all of the transactions and users are able to sort across the columns, and also search for the desired content by using the Search bar.
On Dashboard, users can view their line chart of their budgets vs. their transaction amounts. If their transaction line is below their budget's, they should be in good shape financially.


## Built With

Node.js, Express, AngularJS, Postico SQL

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- List other prerequisites here


### Installing

Steps to get the development environment running.

```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null,
  "income" varchar(80) 
);

CREATE TABLE "categories" (
  "id" serial primary key,
  "user_id" integer foreign key,
  "amount" numeric,
  "category_name" text
);

CREATE TABLE "transactions" (
  "id" serial primary key,
  "user_id" integer foreign key,
  "category_id" integer foreign key,
  "amount" numeric not null,
  "date" date,
  "description" text,
  "category_name" text
)
```

## Screen Shot
  # BUDGET PAGE
  
Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [x] Login
- [x] Register
- [x] Create Budgets page
- [x] Create Transactions page
- [x] Create Dashboard page

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Progress bars on Dashboard to show amount of money left of each category
- [ ] Export to csv button for transactions
- [ ] Allow users to create their own budgets
- [ ] Amount input for total budgets cannot be greater than monthly income

## Deployment

Add additional notes about how to deploy this on a live system

## Authors
* Hanna Nguyen


## Acknowledgments

* Hat tip to anyone who's code was used
