const express = require('express');
const router = express.Router();

router.post('/diagnosis', async function(req, res, next) {
    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: 'sk-209adbe9dffb4780a5312b0c41151652'
    });
    const completion = await openai.chat.completions.create({
        messages: [{
            role: "system",
            content: "You are a professional AI doctor assistant, skilled at providing initial medical advice based on patients' symptoms.Please answer with a rigorous and scientific attitude, and always remind users that \"The final diagnosis should be based on the offline hospital examination."
        },{
            role: "user",
            content: req.body.description
        }],
        model: "deepseek-chat",
    });
    const result = completion.choices[0].message.content
    res.json({ code: 0, result })
});

module.exports = router;
