from NoiseGeneration import NoiseColors as nsc
from NoiseGeneration import Noise as ns
from Enums import NoiseType
from Enums import FilterType
import Validation as val
import numpy as np

def HandleAuditory(data):
    sampling_rate = data['samplingRate']
    duration = data['duration']
    noise_type_raw = data['noiseType']

    val.validate("samplingRate", sampling_rate)
    val.validate("duration", duration)
    val.validate("noiseType", noise_type_raw)

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
    return {
        'samples': samples.tolist(),
        'samplingRate': sampling_rate,
        'duration': duration,
        'noiseType': noise_type.value
    }

def HandlePerlin(data):
    width = data['width']
    height = data['height']
    octaves = data['octaves']
    lacunarity = data['lacunarity']
    persistence = data['persistence']
    filter_raw = data['filter']

    val.validate("width", width)
    val.validate("height", height)
    val.validate("octaves", octaves)
    val.validate("lacunarity", lacunarity)
    val.validate("persistence", persistence)
    val.validate("filter", filter_raw)

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
    
    return {
        'data': perlin.tolist(),
        'width' : width,
        'height' : height,
        'octaves' : octaves,
        'lacunarity' : lacunarity,
        'persistence' : persistence,
        'filter' : filter.value,
        'filterProperties' : filterProperties
    }

def HandleWorley(data):
    width = data['width']
    height = data['height']
    cellSize = data['cellSize']

    val.validate("width", width)
    val.validate("height", height)
    val.validate("cellSize", cellSize)

    worley = ns.GenerateVNoiseWorley(width, height, cellSize)
    
    return {
        'data': worley.tolist(),
        'width' : width,
        'height' : height,
        'cellSize' : cellSize
    }