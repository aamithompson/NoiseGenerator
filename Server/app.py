from flask import Flask, jsonify, request
from flask_cors import CORS
from NoiseGeneration import NoiseColors as nsc
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

if __name__ == '__main__':
    app.run(debug=True)