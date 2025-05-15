import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { getFileData, updateFileData } from "./utility/fileDataUtility.js";
import { updateLayoutUtility } from "./utility/updateLayoutUtility.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors({ origin: ['http://localhost:5174', 'http://localhost:5173', 'https://sentisum-test.vercel.app/'] }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Welcome to home.");
});

const getDashboardData = () => {
    const dashboardDataLocation = __dirname + "/data/dashboardData.json";
    return getFileData(dashboardDataLocation);  
};

const setDashboardData = (data) => {
    const dashboardDataLocation = __dirname + "/data/dashboardData.json";
    updateFileData(data, dashboardDataLocation);
};

const getConversationData = () => {
    const conversationDataLocation = __dirname + "/data/conversationData.json";
    return getFileData(conversationDataLocation);
}

app.get("/dashboard", (req, res) => {
    const dashboardData = getDashboardData();
    //TODO: Throw error to client in case of failure
    res.json(dashboardData);
});

app.post("/updateLayout", (req, res) => {
    const updatedLayouts = req.body.layout;
    // TODO: Sanitize and validate the updated layout
    try {
        const dashboardData = getDashboardData();
        const newDashboardData = updateLayoutUtility(updatedLayouts, dashboardData);
        setDashboardData(newDashboardData);
        res.send("Layout updated successfully!");
    } catch (error) {
        console.error("Error updating layout:", error);
        return res.status(500).json({ error: "Failed to update layout" });
    }
});

app.get("/conversations", (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: "startDate and endDate are required" });
    }

    try {
        const conversationData = getConversationData();

        // Filter conversations within the date range
        const filteredConversations = conversationData.filter((conversation) => {
            const timestamp = new Date(conversation.timestamp);
            return timestamp >= new Date(startDate) && timestamp <= new Date(endDate);
        });

        // Calculate total number of conversations
        const totalConversations = filteredConversations.length;

        // Calculate NSAT percentage
        const totalNSAT = filteredConversations.reduce((sum, conversation) => sum + conversation.nsat, 0);
        const nsatPercentage = totalConversations > 0 ? (totalNSAT / (totalConversations * 10)) * 100 : 0;

        // Select any random 5 conversations
        const randomConversations = filteredConversations
            .sort(() => 0.5 - Math.random()) // Shuffle the array
            .slice(0, 5) // Take the first 5 items
            .map(({ id, message, timestamp, source }) => ({ id, message, timestamp, source })); // Return only required fields

        // Send the response
        res.json({
            randomConversations,
            totalConversations,
            nsatPercentage: nsatPercentage.toFixed(2), // Round to 2 decimal places
        });
    } catch (error) {
        console.error("Error fetching conversations:", error);
        res.status(500).json({ error: "Failed to fetch conversations" });
    }
});


const PORT = 5001;

app.listen(PORT, () => {
    console.log(`running the server at ${PORT}`);
});

