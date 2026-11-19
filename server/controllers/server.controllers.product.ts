import { type Request, type Response } from "express";
import pool from "../database/database.js";

export const ProductsPlants = async (
  req: Request,
  res: Response
) => {
  const userId = (req as any).userId;

  console.log("User ID from session:", userId);

  if (!userId) {
    return res.status(401).json({
      message: "You must be logged in to create a plant listing.",
    });
  }

  const { name, types_of_plants, price, cogs, stock_quantity, description, care_level, light_requirement, water_frequency, mature_size, is_available, } = req.body;

  if (!name || !types_of_plants || !price || cogs !== undefined || !stock_quantity || !description || !care_level || !light_requirement || !water_frequency || !mature_size || is_available === undefined) {
    return res.status(400).json({
      message: "Please fill up all the fields.",
    });
  }

  type Limit = {
    types_of_plants: number,
    care_level: number,
    water_frequency: number,
    light_requirement: number
    mature_size: number
  }

  const Trucation: Limit = {
    types_of_plants: 100,
    care_level: 50,
    light_requirement: 50,
    water_frequency: 50,
    mature_size: 100
  }

  if (typeof types_of_plants === "string" && types_of_plants.length > Trucation.types_of_plants) {
    return res.status(400).json({ message: `characters must only just maximum ${Trucation.types_of_plants}` })
  }
  if (typeof care_level === 'string' && care_level.length > Trucation.care_level) {
    return res.status(400).json({ message: `characters must only just maximum ${Trucation.care_level}` })
  }

  if (typeof water_frequency === 'string' && water_frequency.length > Trucation.water_frequency) {
    return res.status(400).json({ message: `characters must only just maximum ${Trucation.water_frequency}` })
  }


  if (typeof light_requirement === 'string' && light_requirement.length > Trucation.light_requirement) {
    return res.status(400).json({ message: `characters must only just maximum ${Trucation.light_requirement}` })
  }

  if (typeof mature_size === 'string' && mature_size.length > Trucation.mature_size) {
    return res.status(400).json({ message: `characters must only just maximum ${Trucation.mature_size}` })
  }
  try {
    const queryText = `
      INSERT INTO public.product (
        user_id,
        name,
        types_of_plants,
        price,
        cogs,
        stock_quantity,
        description,
        care_level,
        light_requirement,
        water_frequency,
        mature_size,
        is_available
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12
      )
      RETURNING *;
    `;

    const values = [
      userId,
      name,
      types_of_plants,
      price,
      cogs,
      stock_quantity,
      description,
      care_level,
      light_requirement,
      water_frequency,
      mature_size,
      is_available,
    ];

    const result = await pool.query(queryText, values);
    return res.status(201).json({
      message: "Plant listing created successfully.",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating plant listing:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};



export const GetProductPlants = async (req: Request, res: Response) => {
  const userId = (req as any).userId;


  if (!userId) return res.status(400).json({ message: "please login or sessions is expired" });


  const ProductsPlants = await pool.query(
    "SELECT * FROM public.product WHERE user_id = $1", [userId]
  )

  if (ProductsPlants.rows.length === 0) return res.status(400).json({ message: "there no product added or you dont have a product" })

  const product = ProductsPlants.rows


  return res.status(200).json({ message: "your get your product successfully", product: product, success: true })
}


export const SaleAnalysisProduct = async (req: Request, res: Response) => {
  const userId = (req as any).userId;


  if (!userId) return res.status(400).json({ message: "please login or sessions is expired" });

  const Product = await pool.query(
    "SELECT * FROM public.product WHERE user_id = $1", [userId]
  )


  const product = await pool.query(
    `SELECT 
      p.id AS product_id,
      p.name,
      p.cogs,
      p.price AS selling_price,
      p.stock_quantity,
      s.quantity AS quantity_sold,
      s.total_income
   FROM public.sales s
   INNER JOIN public.product p ON s.product_id = p.id
   WHERE p.user_id = $1`,
    [userId]
  );

  interface SaleProductRow {
    product_id: number;
    name: string;
    cogs: string | number;
    selling_price: string | number;
    quantity_sold: string | number;
    total_income: number,
    stock_quantity: number
  }

  // then after loop or multiply or get the result of every cogs product 
  // add all the cogs that we get from every product
  const overAllCogsProduct: number = product.rows.reduce(
    (total: number, row: SaleProductRow) => {
      const specificCogs = Number(row.cogs) * Number(row.quantity_sold);
      return total + specificCogs;
    },
    0
  );

  // const totalCogs = product.rows.reduce((sum, item) => sum + Number(item.cogs), 0)
  const salesProductIncome: number = product.rows.reduce((sum: number, item: any) => {
    return sum + Number(item.total_income)
  }, 0
  );

  const productSold: number = product.rows.reduce((sum: number, item: SaleProductRow) => {
    return sum + Number(item.quantity_sold)
  }, 0
  );

  const totalProduct = product.rows.reduce((sum, item) => {
    return sum + Number(item.stock_quantity)
  }, 0
  )


  const totalIncome = salesProductIncome - overAllCogsProduct;
  const previoesIncome = 10000;
  const changeIncome = ((totalIncome - previoesIncome) / previoesIncome) * 100

  if (totalProduct === 0) {
    return res.status(400).json({ message: "there no product added yet" })
  }
  return res.status(200).json({ message: "get succesfully the data/product", totalIncome, totalProduct, productSold, changeIncome, overallIncome: totalIncome });
}


export const sales_income_summary = async (req: Request, res: Response) => {
  const user_id = (req as any).userId;

  if (!user_id) return res.status(400).json({ message: "please login or sessions is expired" });

  const incomeSummary = await pool.query("SELECT * FROM public.weekly_income_summary")
  if (!incomeSummary) return res.status(400).json({ message: "data in not found" })

  const results = incomeSummary.rows

  return res.status(200).json({ message: "data get succesfully", results })
}


export const salesProduct = async (req: Request, res: Response) => {
  const user_id = (req as any).userId;

  if (!user_id) {
    return res.status(401).json({ message: "Please login or session is expired" });
  }

  try {
    const value = [
      "gumamela",
      157,
      6
    ];

    const product = await pool.query(
      "INSERT INTO public.sales (name_plants, price, quantity) VALUES ($1, $2, $3) RETURNING *",
      value
    );

    return res.status(201).json({
      message: "Sale recorded successfully",
      sale: product.rows[0]
    });
  } catch (error) {
    console.error("Error inserting sale:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getSalesProductIncome = async (req: Request, res: Response) => {
  try {
    const email = (req as any).email;
    if (email !== "admin19@gmail.com") {
      return res.status(403).json({ message: "you are not allowed to get or see this data" });
    }

    const product = await pool.query(`
      SELECT 
        p.id AS product_id,
        p.stock_quantity,
        p.total_quantity_product,
        s.name_plants, 
        s.price, 
        s.quantity, 
        s.total_income 
      FROM public.product p 
      INNER JOIN public.sales s ON p.id = s.product_id
    `);

    return res.status(200).json({ data: email, product: product.rows });
  } catch (error) {
    console.error("Error fetching sales:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



type TopSellingProduct = {
  product_id: number;
  stock_quantity: number;
  total_quantity_product: number;
  name_plants: string;
  price: number;
  quantity: number;
  total_income: number;
  salesPercentage: number;
};

// MERGE SORT
function mergeSort(arr: TopSellingProduct[]): TopSellingProduct[] {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);

  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  return merge(sortedLeft, sortedRight);
}

function merge(
  left: TopSellingProduct[],
  right: TopSellingProduct[]
): TopSellingProduct[] {

  const result: TopSellingProduct[] = [];

  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {

    // Highest percentage first
    if (left[i].salesPercentage >= right[j].salesPercentage) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  while (i < left.length) {
    result.push(left[i]);
    i++;
  }

  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}


// CONTROLLER
export const getTopSellingProduct = async (req: Request, res: Response) => {
  const user_id = (req as any).userId;

  if (!user_id) {
    return res.status(401).json({
      message: "Please login or session is expired"
    });
  }

  try {
    const product = await pool.query(`
            SELECT
                p.id AS product_id,
                p.stock_quantity,
                p.total_quantity_product,
                s.name_plants,
                s.price,
                SUM(s.quantity) AS quantity,
                SUM(s.total_income) AS total_income
            FROM public.product p
            INNER JOIN public.sales s ON p.id = s.product_id
            WHERE p.user_id = $1
            GROUP BY
                p.id,
                p.stock_quantity,
                p.total_quantity_product,
                s.name_plants,
                s.price
        `, [user_id]);


    const salesProductPercentage: TopSellingProduct[] =
      product.rows.map((item: any) => {
        const percentage =
          Number(item.total_quantity_product) > 0
            ? (Number(item.quantity) /
              Number(item.total_quantity_product)) * 100
            : 0;

        return {
          ...item,
          salesPercentage: percentage
        };
      });

    // Sort highest to lowest
    const sortedProducts = mergeSort(salesProductPercentage);

    return res.status(200).json({
      products: sortedProducts
    });

  } catch (error) {
    console.error("Top selling product error:", error);

    return res.status(500).json({
      message: "Failed to retrieve top-selling products"
    });
  }
};

