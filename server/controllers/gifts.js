import { pool } from '../config/database.js'

const getGifts = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM gifts ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}


const getGiftById = async (req, res) => {
    try {
      // SQL query to select gift details by ID
      const selectQuery = `
        SELECT name, pricePoint, audience, image, description, submittedBy, submittedOn
        FROM gifts
        WHERE id=$1
      `;
      
      // Extract giftId from request parameters
      const giftId = req.params.giftId;
  
      // Query the database to get the gift by ID
      const results = await pool.query(selectQuery, [giftId]);
  
      // If gift exists, send the first result row
      if (results.rows.length > 0) {
        res.status(200).json(results.rows[0]);
      } else {
        res.status(404).json({ error: "Gift not found" });
      }
    } catch (error) {
      // Handle any errors during the request
      res.status(409).json({ error: error.message });
    }
  };

export default {
  getGifts,
  getGiftById
}