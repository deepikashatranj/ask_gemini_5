require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {GoogleGenerativeAI} = require('@google/generative-ai');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const port = process.env.PORT || 5000;
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/ask-gemini', async (req, res) => {
    try {
        const clientPrompt = req.body.prompt; // Suitcase se user ka input text nikalna 

        // Guard validation check
        if (!clientPrompt || clientPrompt.trim() === "") {
            return res.status(400).json({ success: false, error: "Prompt is empty!" });
        }
    
        const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" }); 
        
        //  Galti se chhoote hue 'userQuestion' ko badalkar 'clientPrompt' bitha diya
        const result = await model.generateContent(clientPrompt); 
        
        // Jawab lekar frontend ko deliver kar diya
        res.json({ success: true, answer: result.response.text() }); 

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });  
    }
});

app.listen(port, () => {
    console.log(`🚀 Master AI Server is successfully active at http://localhost:${port}`);
});
    




