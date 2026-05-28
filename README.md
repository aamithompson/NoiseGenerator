> ⚠️ README in progress
# Noise Generator (Python, Flask, JavaScript, React) | [Live Demo](https://aamithompson.github.io/NoiseGenerator/)
## 1. Overview
A web application built with **JavaScript**, **React**, **Python**, and **Flask** which allows users to create visual and auditory noise based on parameters chosen by the user. The current available noises are Brownian, white, pink and blue for auditory, and Perlin noise for visual.

The front-end is implemented with JavaScript and React then built with **Vite**. For the back-end, it is implemented with Python and utilizes Flask for the REST API implementation. Other libraries for the back-end include **NumPy**, **CuPy**, and **Pillow**.

The noise generation functions are built with modularity and choice between CPU and GPU processing in mind. For the auditory noise, it also processes the data with fast Fourier transformations to significantly speed up computation compared to the naive implementation.

## 2. Features

### Auditory Noise

- **Types** - Users can choose between one of the following noise types:
  - White Noise
  - Brown Noise
  - Pink Noise
  - Blue Noise

- **Parameters** - Users can also tune the parameters to control aspects of the audio with the following options:
  - Volume
  - Sampling Rate (Hertz)
  - Duration (seconds)

- **Playback Controls** - These controls allow for users to start, pause, or stop audio from playing once it is generated. There is also the slider itself which shows how far along the audio is in its playback and allows for users to drag it to set its current time.

- **Waveform Graph** - A display of the waveforms produced by the current audio. This graph is a measurement of amplitude in relation to time.
  
- **Spectrogram** - A display of the magnitude of frequencies at given times from current audio.

### Perlin Noise

- **Filters** - Various filters which apply mathematical modifications and/or layering of Perlin noise being generated. The following are options available to the users:
  - Lines
  - Rings
  - Flow Fields (particle tracing)
  - Wood
  - Marble

- **Parameters** - Users can also tune the parameters to control aspects of the Perlin noise with the following options:
  - Octaves: The number of generations of Perlin noise summed together.
  - Persistence: The multiplicative factor for the amplitude of the noise each generation.
  - Lacunarity: The multiplicative factor for the frequency of the noise each generation.
  - Width: Image width.
  - Height: Image height.


## 3. Screenshots

### Auditory Noise
*The auditory noise page. The left side displays the playback canvas with controls, waveform graph, and spectrogram. The right side contains the noise parameters. On the right are the controls for the noise.*

![Auditory Noise](Screenshots/AuditoryNoise.jpg)

### Perlin Noise
*The Perlin noise page. This page has the image generation on the right. On the left are the controls both for the noise and the image.*

![Perlin Noise](Screenshots/PerlinNoise.jpg)

### Perlin Noise with Filters
*These are examples of the filters being applied to the noise. The first is a flow field, where particles trace paths along directions derived from the noise gradient. The second is a wood texture which has grain and lines.*

![Perlin Flow Field](Screenshots/PerlinFlowField.jpg)
![Perlin Wood](Screenshots/PerlinWood.jpg)

## 4. Installation & Usage (Local)

### Prerequisites
  - [Python 3.14](https://www.python.org/downloads/)
  - [Node.js](https://nodejs.org/en/download/)

### Setup
  1. Clone the repository.

### Running the Server & Client
  2.  With PowerShell opened in the server directory, run the virtual environment:
  ```bash
  venv\Scripts\activate
  ```

  3. Install the dependencies:
  ```bash
  pip install -r requirements.txt
  ```

  4. Then run the server application:
  ```bash
  python app.py
  ```

  5. With another instance of PowerShell opened in the client directory, retrieve the dependencies for the client:
  ```bash
  npm install
  ```

  6. With the instance of PowerShell opened in the client directory, run the development build of the client:
  ```bash
  npm run dev 
  ```

  7. Go to the link given in PowerShell to your browser. It should look something similar to:
  ```bash
  Local:   http://localhost:5173/NoiseGenerator/
  ```

## 5. Architecture

### Web Interface (Client)

### Back-end Endpoints & Computation (Server)

### Deployment

## 6. Algorithms

### Brownian Noise (Naive Implementation)

### White Noise (Fast Fourier Transformations)

### Noise Colors

### Auditory Noise

### Perlin Noise

## 7. Security

### Verifying Parameters Server Side

### Limiter

## 8. Future Work / Optimization Considerations 

### Voronoi/Worley Noise

### Simplex Noise

### Value Noise

### Benchmarking

### Error Handling

## 9. License
This project is licensed under the GPL-3.0 License - see the `LICENSE` file for details.
