const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../data/portfolioData.json');

// Initialize data file if it doesn't exist
const initDataFile = () => {
    if (!fs.existsSync(dataFile)) {
        const initialData = {
            projects: [],
            lastUpdated: new Date().toISOString()
        };
        fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2));
    }
};

const readData = () => {
    initDataFile();
    return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
};

const writeData = (data) => {
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// GET all portfolio data
exports.getPortfolioData = (req, res) => {
    try {
        const data = readData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch portfolio data' });
    }
};

// GET single project
exports.getProject = (req, res) => {
    try {
        const { id } = req.params;
        const data = readData();
        const project = data.projects.find(p => p.id === id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch project' });
    }
};

// POST new project
exports.createProject = (req, res) => {
    try {
        const { name, category, description, fullDescription, tech, image, links } = req.body;

        if (!name || !category || !description) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const data = readData();
        const newProject = {
            id: `project-${Date.now()}`,
            name,
            featured: false,
            category,
            description,
            fullDescription,
            tech: tech || [],
            image: image || '/images/default.png',
            links: links || { live: '', github: '', demo: '' }
        };

        data.projects.push(newProject);
        writeData(data);

        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create project' });
    }
};

// PUT update project
exports.updateProject = (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const data = readData();
        const projectIndex = data.projects.findIndex(p => p.id === id);

        if (projectIndex === -1) {
            return res.status(404).json({ error: 'Project not found' });
        }

        data.projects[projectIndex] = {...data.projects[projectIndex], ...updates };
        writeData(data);

        res.json(data.projects[projectIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update project' });
    }
};

// DELETE project
exports.deleteProject = (req, res) => {
    try {
        const { id } = req.params;

        const data = readData();
        const projectIndex = data.projects.findIndex(p => p.id === id);

        if (projectIndex === -1) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const deletedProject = data.projects.splice(projectIndex, 1);
        writeData(data);

        res.json({ message: 'Project deleted', project: deletedProject[0] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
};