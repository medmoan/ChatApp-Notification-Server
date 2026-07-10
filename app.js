const express = require('express');
const { db, messaging } = require("./config/firebase")


const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    
    res.set('Content-Type', 'text/html');

    res.status(200).send("<h1>Hello</h1>");
});
app.post("/send-notification", async (req, res) => {
    try {

        const { uid, title, body } = req.body

        const userDoc = await db
            .collection("users")
            .doc(uid)
            .get()

        if (!userDoc.exists) {
            return res.status(404).json({
                error: "User not found"
            })
        }

        const token = userDoc.data().fcmToken
        if (!token) {
            return res.status(400).json({
                error: "User has no FCM token"
            })
        }
        if (!uid || !title || !body) {
            return res.status(400).json({
                error: "Missing required fields"
            })
        };

        const messageId = await messaging.send({
            token,
            notification: {
                title,
                body
            }
        })

        res.json({
            success: true,
            messageId
        })

    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
});


app.listen(PORT, "0.0.0.0", (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);

