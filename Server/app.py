from flask import Flask, jsonify, request
from flask_cors import CORS
from NoiseGeneration import NoiseColors as nsc
from NoiseGeneration import Noise as ns
from Enums import NoiseType

app = Flask(__name__)
CORS(app)

@app.route('/api/noise', methods=['POST'])
def generate_noise():
    data = request.get_json()
    sampling_rate = data['samplingRate']
    duration = data['duration']
    noise_type = NoiseType(data['noiseType'])
    
    samples = []
    match noise_type:
        case NoiseType.White:
            samples = nsc.GenerateNoiseWhite(duration=duration, sRate=sampling_rate)
        case NoiseType.Pink:
            samples = nsc.GenerateNoisePink(duration=duration, sRate=sampling_rate)
        case NoiseType.Brown:
            samples = nsc.GenerateNoiseBrown(duration=duration, sRate=sampling_rate)
        case NoiseType.Blue:
            samples = nsc.GenerateNoiseBlue(duration=duration, sRate=sampling_rate)
    
    samples = (samples - 0.5) * 2
    return jsonify({
        'samples': samples.tolist(),
        'samplingRate': sampling_rate,
        'duration': duration,
        'noiseType': noise_type.value
    })

@app.route('/api/perlin', methods=['POST'])
def generate_perlin():
    data = request.get_json()
    width = data['width']
    height = data['height']
    octaves = data['octaves']
    lacunarity = data['lacunarity']
    persistence = data['persistence']
    filter = data['filter']
    filterProperties = data['filterProperties']

    perlin = ns.GenerateVNoisePerlin(width, height, octaves, lacunarity, persistence)
    return jsonify({
        'data': perlin.tolist(),
        'width' : width,
        'height' : height,
        'octaves' : octaves,
        'lacunarity' : lacunarity,
        'persistence' : persistence,
        'filter' : filter,
        'filterProperties' : filterProperties
    })

@app.route('/api/health', methods=['GET'])
def server_health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True)