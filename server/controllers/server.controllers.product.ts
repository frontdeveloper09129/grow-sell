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

  const { name, types_of_plants, price, cogs ,stock_quantity, description, care_level, light_requirement, water_frequency, mature_size, is_available, } = req.body;

  if (!name || !types_of_plants || !price || cogs !== undefined || !stock_quantity || !description || !care_level || !light_requirement || !water_frequency || !mature_size ||  is_available === undefined) {
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



  if (typeof types_of_plants === "string" &&  types_of_plants.length > Trucation.types_of_plants) {
    return res.status(400).json({ message: `characters must only just maximum ${Trucation.types_of_plants}` })
  }
  if (typeof care_level === 'string' &&  care_level.length > Trucation.care_level) {
    return res.status(400).json({ message: `characters must only just maximum ${Trucation.care_level}` })
  }

  if (typeof water_frequency === 'string' && water_frequency.length > Trucation.water_frequency) {
    return res.status(400).json({ message: `characters must only just maximum ${Trucation.water_frequency}` })
  }


  if (typeof light_requirement === 'string' && light_requirement.length > Trucation.light_requirement) {
    return res.status(400).json({ message: `characters must only just maximum ${Trucation.light_requirement}` })
  }

  if (typeof mature_size === 'string' &&  mature_size.length > Trucation.mature_size) {
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
