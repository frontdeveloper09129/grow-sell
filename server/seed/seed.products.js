
// import { products } from "../data/server.data.products.ts";
// import pool from "../database/database.js";
// async function seed() {
//   try {

//     const result = await pool.query(
//       'SELECT id FROM public.users WHERE '
//     )



//     for (const item of products) {
//       const product = await pool.query(
//         `INSERT INTO public.product (
//           name,
//           types_of_plants,
//           price,
//           description,
//           stock_quantity,
//           image_url,
//           care_level,
//           light_requirement,
//           water_frequency,
//           mature_size,
//           is_available
//         )
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
//         RETURNING *`,
//         [
//           item.name,
//           item.types_of_plants,
//           item.price,
//           item.description,
//           item.stock_quantity,
//           item.image_url,
//           item.care_level,
//           item.light_requirement,
//           item.water_frequency,
//           item.mature_size,
//           item.is_available,
//         ]
//       );

//       console.log("Inserted product:", product.rows[0].name);
//     }
//   } catch (error) {
//     console.error("Error inserting products:", error);
//   } finally {
//     await pool.end();
//   }
// }

// seed()