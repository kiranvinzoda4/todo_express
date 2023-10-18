
const fs = require('fs');
const path = require('path');

const uploadImage = (dataUri) => {
    try {
        const matches = dataUri.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches.length !== 3) {
            res.json({ error: true, message: "Invalid Data URI format", data: [] });
        }
        const mimeType = matches[1];
        const extension = mimeType.split('/').pop();
        const base64Data = matches[2];

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let fileName = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            fileName += characters.charAt(randomIndex);
        }

        const imageData = Buffer.from(base64Data, 'base64');
        const uploadFolderPath = path.join(__dirname, '../uploads');
        const filePath = path.join(uploadFolderPath, fileName + '.' + extension);
        fs.writeFileSync(filePath, imageData, 'binary');
        pathToStore = fileName + '.' + extension;
    } catch (e) {
        console.log(e);
        return null;
    }
    return pathToStore;
}

function imageToDataUri(imageName) {
    const FolderPath = path.join(__dirname, '../uploads');
    imagePath = FolderPath + "/" + imageName;
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = `image/${imagePath.split('.').pop()}`;
    const dataUri = `data:${mimeType};base64,${base64Image}`;

    return dataUri;
}



module.exports = { uploadImage, imageToDataUri };

