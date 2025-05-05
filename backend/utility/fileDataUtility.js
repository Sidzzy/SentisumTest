import { readFileSync, writeFileSync } from "fs";

export const getFileData = (fileLocation) => {
    let data;
    try {
        const fileContent = readFileSync(fileLocation, "utf-8");
        data = JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading or parsing file data:", error);
        data = {};
    }
    return data;
}

export const updateFileData = (newData, fileLocation) => {
    try {
        writeFileSync(fileLocation, JSON.stringify(newData, null, 2), "utf-8");
        console.log("File data updated successfully.");
    } catch (error) {
        console.error("Error updating file data:", error);
    }
};