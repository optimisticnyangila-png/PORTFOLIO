const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// GET all portfolio data
router.get('/', portfolioController.getPortfolioData);

// GET single project
router.get('/projects/:id', portfolioController.getProject);

// POST new project (admin)
router.post('/projects', portfolioController.createProject);

// PUT update project (admin)
router.put('/projects/:id', portfolioController.updateProject);

// DELETE project (admin)
router.delete('/projects/:id', portfolioController.deleteProject);

module.exports = router;