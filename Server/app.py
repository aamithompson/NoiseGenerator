from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from NoiseGeneration import NoiseColors as nsc
from NoiseGeneration import Noise as ns
from Enums import NoiseType
from Enums import FilterType
import json
import re
import numpy as np


app = Flask(__name__)
CORS(app)

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["100 per day", "10 per minute"]
)

with open("../Shared/Constraints/AuditoryNoiseConstraints.json") as f:
    configAuditory = json.load(f)

with open("../Shared/Constraints/PerlinNoiseConstraints.json") as f:
    configPerlin = json.load(f)

settings = configAuditory["settings"] | configPerlin["settings"]

def validate(key, value):
    s = settings.get(key)
    if not s:
        raise KeyError(f"Unknown setting: {key}")

    if s["type"] in ("float", "int"):
        if not (s["min"] <= value <= s["max"]):
            raise ValueError(f"{key} must be between {s['min']} and {s['max']}")
        if s["type"] == "int" and not isinstance(value, int):
            raise TypeError(f"{key} must be an integer")

    if s["type"] == "string":
        if not (s["minLength"] <= len(value) <= s["maxLength"]):
            raise ValueError(f"{key} length must be {s['minLength']}–{s['maxLength']}")
        if "pattern" in s and not re.fullmatch(s["pattern"], value):
            raise TypeError(f"{key} does not match required pattern")

    if s["type"] == "enum" and value not in s["options"]:
        raise ValueError(f"{key} must be one of: {s['options']}")

    return True

@app.route('/api/noise', methods=['POST'])
@limiter.limit("10 per minute")
def generate_noise():
    data = request.get_json()
    sampling_rate = data['samplingRate']
    duration = data['duration']
    noise_type_raw = data['noiseType']

    validate("samplingRate", sampling_rate)
    validate("duration", duration)
    validate("noiseType", noise_type_raw)

    noise_type = NoiseType(noise_type_raw)
    
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
@limiter.limit("10 per minute")
def generate_perlin():
    data = request.get_json()
    width = data['width']
    height = data['height']
    octaves = data['octaves']
    lacunarity = data['lacunarity']
    persistence = data['persistence']
    filter_raw = data['filter']

    validate("width", width)
    validate("height", height)
    validate("octaves", octaves)
    validate("lacunarity", lacunarity)
    validate("persistence", persistence)
    validate("filter", filter_raw)

    filter = FilterType(filter_raw)
    filterProperties = data['filterProperties']

    perlin = np.array(0)
    match filter:
        case FilterType.NoFilter:
            perlin = ns.GenerateVNoisePerlin(width, height, octaves, lacunarity, persistence)
        case FilterType.Lines:
            perlin = ns.LineFilter(ns.GenerateVNoisePerlin(width, height, octaves, lacunarity, persistence), 4, 4)
        case FilterType.Rings:
            perlin = ns.RingFilter(ns.GenerateVNoisePerlin(width, height, octaves, lacunarity, persistence), 10, 0.125)
        case FilterType.FlowField:
            perlin = ns.GenerateFlowField(width, height, octaves, lacunarity, persistence)
        case FilterType.Wood:
            perlin = ns.GenerateWood(width, height, 1/4, octaves, lacunarity, persistence)
        case FilterType.Marble:
            perlin = ns.GenerateMarble(width, height, octaves, lacunarity, persistence, 8, 8, 5)
    
    return jsonify({
        'data': perlin.tolist(),
        'width' : width,
        'height' : height,
        'octaves' : octaves,
        'lacunarity' : lacunarity,
        'persistence' : persistence,
        'filter' : filter.value,
        'filterProperties' : filterProperties
    })


@app.route('/api/health', methods=['GET'])
@limiter.limit("20 per minute")
def server_health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True)