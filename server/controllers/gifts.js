import { pool } from '../config/database.js'

const createGift = async (req, res) => {
  try {
      const { name, pricepoint, audience, image, description, submittedby, submittedon } = req.body
      const results = await pool.query(`
          INSERT INTO gifts (name, pricepoint, audience, image, description, submittedby, submittedon)
          VALUES($1, $2, $3, $4, $5, $6, $7)
          RETURNING *`,
          [name, pricepoint, audience, image, description, submittedby, submittedon]
      )

      res.status(201).json(results.rows[0])
  } catch (error) {
      res.status(409).json( { error: error.message } )
  }
}

const updateGift = async (req, res) => {
  try {
      const id = parseInt(req.params.id)
      const { name, pricepoint, audience, image, description, submittedby, submittedon } = req.body
      const results = await pool.query(`
          UPDATE gifts SET name = $1, pricepoint = $2, audience = $3, image = $4, description = $5, submittedby = $6, submittedon= $7 WHERE id = $8`,
          [name, pricepoint, audience, image, description, submittedby, submittedon, id]
      )
      res.status(200).json(results.rows[0])
  } catch (error) {
      res.status(409).json( { error: error.message } )
  }
}

const deleteGift = async (req, res) => {
  try {
      const id = parseInt(req.params.id)
      const results = await pool.query('DELETE FROM gifts WHERE id = $1', [id])
      res.status(200).json(results.rows[0])
  } catch (error) {
      res.status(409).json( { error: error.message } )
  }
}

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
  getGiftById,
  createGift,
  updateGift,
  deleteGift 
}