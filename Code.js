const { OpenAI } = require('openai'); // Import the OpenAI library

// Replace <ENTER_YOUR_API_KEY> with your actual OpenAI API key
const openai = new OpenAI({
    apiKey: '<ENTER_YOUR_API KEY>'
});

/**
 * Generates images based on a text prompt using OpenAI's DALL·E model.
 *
 * @param {string} prompt - The text prompt describing the desired image.
 * @param {number} [numImages=1] - Number of images to generate. Default is 1.
 * @param {string} [size="1024x1024"] - Size of the generated image. Options are "256x256", "512x512", "1024x1024". Default is "1024x1024".
 * @param {string} [responseFormat="url"] - The format of the response. Options are "url" or "b64_json". Default is "url".
 * @returns {Promise<Array<string>>} - A list of URLs or base64-encoded JSON strings of the generated images.
 */
async function generateImage(prompt, numImages = 1, size = "1024x1024", responseFormat = "url") {
    try {
        // Call the OpenAI Image Generation API (DALL·E)
        const response = await openai.images.generate({
            prompt: prompt,          // The text prompt describing the desired image
            n: numImages,            // Number of images to generate
            size: size,              // Size of the generated image
            response_format: responseFormat // Format of the response: "url" or "b64_json"
        });

        // Extract and return the generated images in the specified format
        if (responseFormat === 'url') {
            // Return the URLs of the generated images
            return response.data.map(item => item.url);
        } else if (responseFormat === 'b64_json') {
            // Return the base64-encoded JSON strings of the generated images
            return response.data.map(item => item.b64_json);
        }
    } catch (error) {
        console.error('Error generating images:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

// Example usage
generateImage('A futuristic cityscape', 1)
    .then(images => console.log(images))
    .catch(error => console.error(error));
