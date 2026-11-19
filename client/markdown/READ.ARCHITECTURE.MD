# fORMAT ON SHOP PRODUCT ARCHITECTURE
    -   in our page product shop since we already have a database that containt our product we can just fetch that data on that page ui 
    -   we can add a button where user can click that product and add to cart that product.
    -   create a button where user can click the cart icon and go to the page cart product where user can see their product item that they add to cart;
    -   and all of the item they add to cart they can buy or click the buy at the same time and see the total of product they buy
    


# FORMAT HOW USER CAN SEE THE SALE PRODUCTION FLOW OR SALES ANALYSIS.   
-   <br> -> every time user login and go to dashbaord they can see emediatly the overview page where each user can see the production of thier market
    ## CREATE A ANOTHER COLUMN FOR OUR OVERVIEW SALE ANALYSIS
        -   total-income:  we can only calculate the total of all income that we earn from our product meaning we have to get all the product that we earn and calculate the total of it and subract to all expenses we use here ------> total-earn - total-expenses = total-income.
            note: --> 
                i think we can do that but if we do income meaning we have to get to the user or onwser shop how much they expense for this product in that way we can calculate in our system the income?

                -> 
                    Yes, you are exactly right. If you decide to include income, your system cannot calculate it automatically without a user input field. so we must provide a form where the shop owner can type in how much they spent to make or buy that product.

                -> 
                    in that way we have to add another column in our database product that hold a value for the COST OF GOOD SOLD (COGS) that mean hold a data that amount of product that they expensor cost to make that product;

                -> 
                    total -income route

                -> 
                    total-product from the routes of all product -> get the product from database get the length of it so we can pass in to the new database analysis table


            -> basically we still dont haave that system where user can buy our product and calculcate that so we have to focus on that. but for now 0 since the income only comes when user buy our product and calculate there profit;
    
        -   tota-product: we can get the total product by just getting the existing product on our shop
        -   units-sold: we can get the total-product units sold from our product || shop
        -   income -change: we can calculate our income by: current-income - previoes-income / previoes-income * 100 = income-change%




    we need a table for handling the data of owner grow shop that carry the totalincome for every 7 days or every weeks
        -> there a table name weekly_income_summary that hold a 
                                    -> column for weeklyStart and weeklyEnd and totalIncome
        -> THE LOGIC BEHIND THIS
            -  lest say we past the 5 weeks of sale income lest say the sales income for now week is 155
            -   since in graph analysis we have a y-axis for measuring the total income for every week 
                -   we can get the value of that y axis base on the highet income we get from every week of our sales income
                -   the formula for that will be: -> interval = 10[log10(maxIncome)-1]
                -   solution: 
                        10 = log10(log10(155) - 1)
                        10 = log10(155) - 1
                        10 = log10(155) =  2.1903 - 1
                        10 = floor(2.1903) = 2 - 1
                        10 = 2 - 1
                        10 = raise to 1 is 10
                        final answer  = 10
                        

