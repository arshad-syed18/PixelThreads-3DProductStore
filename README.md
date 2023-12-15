# PixelThreads - A 3D Product Store

Welcome to PixelThreads, a 3D Product Store that offers a unique e-commerce experience, allowing users to customize and visualize clothes in 3D. 
This platform enables users to pick shirt colors, upload logos and textures, and even generate designs using Stable Diffusion AI for different clothing items.
This platform was developed using React, Threejs, framer motion and tailwindcss. 
Below, is a brief overview of the project and its dependencies.<br />
Try it out at https://pixelthreads-emgv.onrender.com/

## Features
- **3D T-Shirt Visualization**: See your T-Shirt designs come to life in a lifelike 3D model.
- **Diverse Wardrobe Selection**: Explore and select from an extensive range of wardrobe options.
- **Color Picker**: Explore a diverse palette to personalize your shirt. Mix and match colors for various components such as button accents.
- **Texture Customization**: Upload your own textures to create unique designs.
- **AI-Driven Design Creation**: Employ Stable Diffusion AI for effortless logo and texture generation based on your creative prompts.

## Getting Started
1. Clone the repository.
2. Set up the server dependencies using npm install in the server directory.
3. Set up the client dependencies using npm install in the client directory.
4. Start the server and client applications.
    - server start command : npm start
    - client start command : npm run dev
5. Explore and customize Clothes in 3D!

Note: Easily add other clothing items by referencing the `Tshirt.jsx` file and incorporating additional 3D models. 
Quickly generate geometry and mesh for your model using the command `npx gltfjsx model.glb`.

## Screenshots
### Landing Page
![Landing Page](/images/1.JPG)

### Color Picker
![Color Picker](/images/2.JPG)

### Setting Texture & Logo
![Setting Texture](/images/3.JPG)

### Setting AI Texture 
![Setting AI Texture ](/images/4.JPG)

### Switching Product
![Changing The Model](/images/5.JPG)

## Contributing
Contributions from the community are welcome. If you'd like to enhance the project or fix issues, please fork the repository and create a pull request.
