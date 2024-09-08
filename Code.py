import openai

# Replace <ENTER_YOUR_API_KEY> with your actual OpenAI API key
openai.api_key = "<ENTER_YOUR_API_KEY>"


def generate_image(prompt, num_images=1, size="1024x1024", response_format="url"):
    """
    Generates images based on a text prompt using OpenAI's DALL·E model.

    Parameters:
    - prompt (str): The text prompt describing the desired image.
    - num_images (int): Number of images to generate. Default is 1.
    - size (str): Size of the generated image. Options are "256x256", "512x512", "1024x1024". Default is "1024x1024".
    - response_format (str): The format of the response. Options are "url" or "b64_json". Default is "url".
    - user (str, optional): A unique identifier representing the end-user. This can be used for monitoring and abuse prevention.

    Returns:
    - list: A list of URLs or base64-encoded JSON strings of the generated images.
    """

    # Call the OpenAI Image Generation API (DALL·E)
    response = openai.Image.create(
        prompt=prompt,  # The text prompt describing the desired image
        n=num_images,  # Number of images to generate
        size=size,  # Size of the generated image
        response_format=response_format,  # Format of the response: "url" or "b64_json"
    )

    # Extract and return the generated images in the specified format
    if response_format == "url":
        # Return the URLs of the generated images
        return [data['url'] for data in response['data']]
    elif response_format == "b64_json":
        # Return the base64-encoded JSON strings of the generated images
        return [data['b64_json'] for data in response['data']]
