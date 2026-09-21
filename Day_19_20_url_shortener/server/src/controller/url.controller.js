import UrlModel from "../model/url.model.js";
import generateCode from '../utils/generateCode.js';
import config from '../config/config.js';

export const createUrlController = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "Please enter a URL"
            })
        }

        if (url.startsWith('http://') == false && url.startsWith('https://') == false) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid URL starting with http:// or https://"
            })
        }

        if (url.length > 2048) {
            return res.status(400).json({
                success: false,
                message: "URL is too long"
            })
        }

        const code = generateCode();

        const newUrl = await UrlModel.create({
            originalUrl: url,
            shortCode: code
        })

        res.status(201).json({
            success: true,
            message: "URL shortened successfully",
            data: {
                id: newUrl._id,
                originalUrl: newUrl.originalUrl,
                shortCode: newUrl.shortCode,
                shortUrl: `${config.BASE_URL + newUrl.shortCode}`
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
}

export const getAllUrlController = async (req, res) => {
    try {
        const urls = await UrlModel.find();

        res.status(200).json({
            success: true,
            message: "URLs fetched successfully",
            count: urls.length,
            data: {
                urls
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
}

export const redirectToOriginalUrlController = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await UrlModel.findOne({
            shortCode
        })

        if (!url) {
            return res.status(404).json({
                success: false,
                message: "URL not found"
            })
        }

        res.redirect(302, url.originalUrl);

        await UrlModel.findOneAndUpdate({
            shortCode: code
        }, {
            $inc: { clicks: 1 }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
}

export const deleteUrlController = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await UrlModel.findOneAndDelete({ shortCode });

        if (!url) {
            return res.status(404).json({
                success: false,
                message: "URL trying to delete not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "URL deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
}