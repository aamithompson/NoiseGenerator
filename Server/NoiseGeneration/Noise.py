#===============================================================================
# Filename: Noise.py
# Author(s): Aaron Thompson
# Date Created: 1/12/2022
# Date Last Updated: 5/21/2026
# Description: If audio, generates noise into a 1-dimensional signal given a
# duration(seconds). For visual, generates noise into a n x m matrix.
# Audio Concepts
# https://en.wikipedia.org/wiki/Sampling_(signal_processing)
# https://www.socsci.ru.nl/wilberth/python/noise.html
#
# Visual Concepts
# https://en.wikipedia.org/wiki/Perlin_noise
# https://en.wikipedia.org/wiki/Simplex_noise
#===============================================================================
import numpy as np
#import cupy as cp
from PIL import Image as img
#from numpy.lib.function_base import _angle_dispatcher
from numpy.random import permutation

# CONSTANT(S)
#-------------------------------------------------------------------------------
# Sampling rates which are given in Hertz(Hz)
SRATE_TELEPHONE = 8000
SRATE_WIDEBAND = 16000
SRATE_AMRADIO = 22050
SRATE_FMRADIO = 32000
SRATE_CD = 44100
SRATE_HD1 = 96000
SRATE_HD2 = 192000

# Default arguments for audio
DEFAULT_DURATION = 1.0
DEFAULT_FPOWER = 1
DEFAULT_MINF = 20
DEFAULT_MAXF = 20000
DEFAULT_SRATE = SRATE_CD
DEFAULT_ATT = np.log10(2.0)*10
DEFAULT_COMP = 'CPU'

# Permutation Table
pSize = 2**9
pTableCPU = np.arange(pSize)
np.random.shuffle(pTableCPU)
pTableCPU = np.stack([pTableCPU, pTableCPU]).flatten()

#pTableCUDA = cp.arange(pSize)
#cp.random.shuffle(pTableCUDA)
#pTableCUDA = cp.stack([pTableCUDA, pTableCUDA]).flatten()

# Default arguments for visual
DEFAULT_GRIDSIZE = 48

# AUDIO FUNCTION(S)
#-------------------------------------------------------------------------------
def GenerateNoiseCPU(duration=DEFAULT_DURATION, fPower=DEFAULT_FPOWER, minF=DEFAULT_MINF, maxF=DEFAULT_MAXF, sRate=DEFAULT_SRATE, att=DEFAULT_ATT):
    samples = int(duration * sRate)
    f = np.fft.rfftfreq(samples, 1/sRate)

    spectrum = np.zeros_like(f, dtype='complex')
    spectrum[1:] = f[1:]**(-(0.5 * fPower * (att/10.0) / np.log10(2.0)))
    spectrum[np.logical_or(f < minF, f > maxF)] = 0

    phases = np.random.uniform(0, 2 * np.pi, len(f) - 1)
    spectrum[1:] *= np.exp(1j * phases)

    noise = np.fft.irfft(spectrum)
    noise = np.pad(noise, (0, samples - len(noise)))
    noise = (noise - np.min(noise)) / (np.max(noise) - np.min(noise))

    return noise

"""def GenerateNoiseCUDA(duration=DEFAULT_DURATION, fPower=DEFAULT_FPOWER, minF=DEFAULT_MINF, maxF=DEFAULT_MAXF, sRate=DEFAULT_SRATE, att=DEFAULT_ATT):
    samples = duration * sRate
    f = cp.fft.rfftfreq(samples, 1/sRate)

    spectrum = cp.zeros_like(f, dtype='complex')
    spectrum[1:] = f[1:]**(-(0.5 * fPower * (att/10.0) / np.log10(2.0)))
    spectrum[cp.logical_or(f < minF, f > maxF)] = 0

    phases = cp.random.uniform(0, 2 * np.pi, len(f) - 1)
    spectrum[1:] *= cp.exp(1j * phases)

    noise = cp.fft.irfft(spectrum)
    noise = cp.pad(noise, (0, samples - len(noise)))
    noise = (noise - cp.min(noise)) / (cp.max(noise) - cp.min(noise))

    return cp.asnumpy(noise)"""

def GenerateNoise(duration=DEFAULT_DURATION, fPower=DEFAULT_FPOWER, minF=DEFAULT_MINF, maxF=DEFAULT_MAXF, sRate=DEFAULT_SRATE, att=DEFAULT_ATT, comp=DEFAULT_COMP):
    if(comp.lower()=='cpu'):
        return GenerateNoiseCPU(duration, fPower, minF, maxF, sRate, att)
    #elif(comp.lower()=='cuda'):
        #return GenerateNoiseCUDA(duration, fPower, minF, maxF, sRate, att)

# VISUAL FUNCTION(S)
#-------------------------------------------------------------------------------
#White Noise
def GenerateVNoiseWhiteCPU(width, height):
    noise = np.random.rand(width, height)
    return noise

"""def GenerateVNoiseWhiteCUDA(width, height):
    noise = cp.random.rand(width, height)
    return cp.asnumpy(noise)"""

def GenerateVNoiseWhite(width, height, comp=DEFAULT_COMP):
    if(comp.lower()=='cpu'):
        return GenerateVNoiseWhiteCPU(width, height)
    #elif(comp.lower()=='cuda'):
        #return GenerateVNoiseWhiteCUDA(width, height)

#Perlin Noise
def GenerateVNoisePerlin(width, height, octaves=1, lacunarity=2.0, persistance=0.5, gridsize=DEFAULT_GRIDSIZE, comp=DEFAULT_COMP):
    if(comp.lower()=='cpu'):
        return GenerateVNoisePerlinCPU(width, height, octaves, lacunarity, persistance, gridsize)
    #elif(comp.lower()=='cuda'):
        #return GenerateVNoisePerlinCUDA(width, height, octaves, lacunarity, persistance, gridsize)

def GenerateVNoisePerlinCPU(width, height, octaves=1, lacunarity=2.0, persistance=0.5, gridsize=DEFAULT_GRIDSIZE):
    global pTableCPU
    pTableCPU = np.arange(pSize)
    np.random.shuffle(pTableCPU)
    pTableCPU = np.stack([pTableCPU, pTableCPU]).flatten()

    x = np.linspace(0, width/gridsize, width) + 1
    y = np.linspace(0, height/gridsize, height) + 1
    x, y = np.meshgrid(x, y)

    data = np.zeros((width, height))
    freq = 1
    amp = 1
    maxValue = 0
    for i in range(octaves):
        data += Perlin(x * freq, y * freq, "CPU") * amp

        maxValue += amp

        amp *= persistance
        freq *= lacunarity

    data /= maxValue
    data = (data - np.min(data)) / (np.max(data) - np.min(data))
    return data

"""def GenerateVNoisePerlinCUDA(width, height, octaves=1, lacunarity=2.0, persistance=0.5, gridsize=DEFAULT_GRIDSIZE):
    global pTableCUDA
    pTableCUDA = cp.arange(pSize)
    cp.random.shuffle(pTableCUDA)
    pTableCUDA = cp.stack([pTableCUDA, pTableCUDA]).flatten()
    
    x = cp.linspace(0, width/gridsize, width) + 1
    y = cp.linspace(0, height/gridsize, height) + 1
    x, y = cp.meshgrid(x, y)

    data = cp.zeros((width, height))
    freq = 1
    amp = 1
    maxValue = 0
    for i in range(octaves):
        data += Perlin(x * freq, y * freq, "CUDA") * amp

        maxValue += amp

        amp *= persistance
        freq *= lacunarity

    data /= maxValue
    data = (data - cp.min(data)) / (cp.max(data) - cp.min(data))
    return cp.asnumpy(data)"""

def Perlin(x, y, comp=DEFAULT_COMP):
    #Coordinates
    ix0 = x.astype(int)
    ix1 = ix0 + 1
    iy0 = y.astype(int)
    iy1 = iy0 + 1

    #Interpolation Weights
    sx = x - ix0
    sy = y - iy0

    #Interpolation Between Gradient Points
    n00 = Gradient(ix0, iy0, sx, sy, comp)
    n10 = Gradient(ix1, iy0, sx-1, sy, comp)
    x0 = Interpolate(n00, n10, sx, "fade")
    
    n01 = Gradient(ix0, iy1, sx, sy-1, comp)
    n11 = Gradient(ix1, iy1, sx-1, sy-1, comp)
    x1 = Interpolate(n01, n11, sx, "fade")

    return Interpolate(x0, x1, sy, "fade")

def Gradient(ix, iy, x, y, comp=DEFAULT_COMP):
    if(comp.lower() == "cpu"):
        return GradientCPU(ix, iy, x, y)
    #elif(comp.lower() == "cuda"):
        #return GradientCUDA(ix, iy, x, y)

def GradientCPU(ix, iy, x, y):
    v = np.array([[0, 1], [0, -1], [1, 0], [-1, 0]])
    p = pTableCPU[((pTableCPU[ix%pSize] + iy)%pSize)]
    gradient = v[p%4]

    return gradient[:, :, 0] * x + gradient[:, :, 1] * y

"""def GradientCUDA(ix, iy, x, y):
    v = cp.array([[0, 1], [0, -1], [1, 0], [-1, 0]])
    p = pTableCUDA[(pTableCUDA[ix%pSize] + iy)%pSize]
    gradient = v[p%4]

    return gradient[:, :, 0] * x + gradient[:, :, 1] * y"""

#Worley Noise
def GenerateVNoiseWorley(width, height, cellsize):
    x = np.linspace(0, width/cellsize, width)
    y = np.linspace(0, height/cellsize, height)
    x, y = np.meshgrid(x, y)

    data = Worley(x, y, cellsize)
    data = (data - np.min(data)) / (np.max(data) - np.min(data))
    return data

def Worley(x, y, cellsize):
    width = x.shape[0]
    height = y.shape[1]
    baseCellX = np.floor(x)
    baseCellY = np.floor(y)

    #Random Cell Positions
    randX = np.random.rand(int(width/cellsize) + 3, int(height/cellsize) + 3)
    randX = np.repeat(randX, cellsize, axis=0)
    randX = np.repeat(randX, cellsize, axis=1)
    randX = randX[:width + cellsize * 2, :height + cellsize * 2]
    randY = np.random.rand(int(width/cellsize) + 3, int(height/cellsize) + 3)
    randY = np.repeat(randY, cellsize, axis=0)
    randY = np.repeat(randY, cellsize, axis=1)
    randY = randY[:width + cellsize * 2, :height + cellsize * 2]

    #x += 0
    #y -= 0
    #i = 1
    #j = -1
    #ix = (i+1) * cellsize
    #iy = (j+1) * cellsize
    #cellX = baseCellX + i
    #cellY = baseCellY + j
    #cellPosX = cellX + randX[ix:width+ix, iy:height+iy]
    #cellPosY = cellY + randY[ix:width+ix, iy:height+iy]
    #distance = np.sqrt((cellPosX - x) ** 2 + (cellPosY - y) ** 2)
    #return distance

    #Distance
    minDistance = np.full((width, height), np.inf)
    for i in range(-1, 2):
        for j in range(-1, 2):
            ix = (j+1) * cellsize
            iy = (i+1) * cellsize

            cellX = baseCellX + i
            cellY = baseCellY + j
            cellPosX = cellX + randX[ix:width+ix, iy:height+iy]
            cellPosY = cellY + randY[ix:width+ix, iy:height+iy]
            distance = np.sqrt((cellPosX - x) ** 2 + (cellPosY - y) ** 2)
            minDistance = np.minimum(minDistance, distance)

    return minDistance

#Interpolation
def Interpolate(a, b, t, type="linear"):
    if(type.lower() == "linear"):
        return InterpolateLinear(a, b, t)
    if(type.lower() == "poly"):
        return InterpolatePolynomial(a, b, t)
    if(type.lower() == "fade" or type.lower() == "ease"):
        return InterpolateFade(a, b, t)

def InterpolateLinear(a, b, t):
    return ((b - a) * t) + a

def InterpolatePolynomial(a, b, t):
    #t = 3 * t**2 - 2 * t**3
    t = (3 - 2 * t) * t ** 2
    return InterpolateLinear(a, b, t)

def InterpolateFade(a, b, t):
    #t = 6 * t**5 - 15 * t**4 + 10 * t**3
    t = ((6 * t - 15) * t + 10) * (t**3)
    return InterpolateLinear(a, b, t)

#Simple Visual Functions
def GenerateLines(width, height, xPeriod=1, yPeriod=1):
    return LineFilter(np.ones((width, height)), xPeriod, yPeriod, 0)

def LineFilter(data, xPeriod=1, yPeriod=1, power=1):
    width = data.shape[0]
    height = data.shape[1]
    x = np.arange(width)
    y = np.arange(height)
    x, y = np.meshgrid(x, y)

    xValue = x * (xPeriod/width)
    yValue = y * (yPeriod/height)
    data = np.sin((xValue + yValue + (data * power)) * np.pi)
    data = (data - np.min(data)) / (np.max(data) - np.min(data))

    return data

def GenerateRings(width, height, period):
    return RingFilter(np.ones((width, height)), period, 0)

def RingFilter(data, period, power):
    width = data.shape[0]
    height = data.shape[1]
    x = np.arange(width)
    y = np.arange(height)
    x, y = np.meshgrid(x, y)

    xValue = (x - (width / 2)) / width
    yValue = (y - (height / 2)) / height
    distance = np.sqrt(xValue ** 2 + yValue ** 2)
    data = np.sin((2 * period * (distance + (data * power))) * np.pi)
    data = (data - np.min(data)) / (np.max(data) - np.min(data))

    return data

#Composite Visual Functions
def GenerateFlowField(width, height, scale=32, octaves=1, lacunarity=2.0, persistance=0.5, gridsize=DEFAULT_GRIDSIZE):
    columns = int(width/scale) + 1
    rows = int(height/scale) + 1
    gridsize = (int(gridsize/scale) + 1) * 2
    
    data = GenerateVNoisePerlin(columns, rows, octaves, lacunarity, persistance, gridsize)
    data = np.repeat(np.repeat(data, scale, axis=0), scale, axis=1)
    data = data[:width, :height]

    return data

def GenerateMarble(width, height, octaves=8, lacunarity=1.5, persistance=0.8, xPeriod=8, yPeriod=8, power=5, gridsize=DEFAULT_GRIDSIZE, comp=DEFAULT_COMP):
    return LineFilter(GenerateVNoisePerlin(width, height, 20, 1.5, 0.8, gridsize, comp), 10, 10, 5)

def GenerateWood(width, height, ratioWH=4/16, octaves=8, lacunarity=1.5, persistance=0.8, gridsize=DEFAULT_GRIDSIZE, comp=DEFAULT_COMP):
    LayerBase = []
    if(ratioWH < 1):
        LayerBase = GenerateVNoisePerlin(width, int(height/ratioWH), octaves, lacunarity, persistance, gridsize, comp)
    else:
        LayerBase = GenerateVNoisePerlin(width, int(height*ratioWH), octaves, lacunarity, persistance, gridsize, comp)
    LayerBase = np.array(img.fromarray(LayerBase).resize((width, height)))

    LayerLines = []
    if(ratioWH < 1):
        LayerLines = GenerateVNoisePerlin(width, int(height/ratioWH), 2, lacunarity, persistance, gridsize, comp)
    else:
        LayerLines = GenerateVNoisePerlin(width, int(height*ratioWH), 2, lacunarity, persistance, gridsize, comp)
    LayerLines = np.array(img.fromarray(LayerLines).resize((width, height)))
    LayerLines *= 2
    LayerLines -= np.floor(LayerLines)
    LayerLines = np.clip(LayerLines, 0, 0.25) - (1 - np.clip(LayerLines, 0.75, 1))

    LayerGrain = GenerateVNoiseWhite(int(width/4), int(height/4), comp)
    LayerGrain = np.array(img.fromarray(LayerGrain).resize((width, height)))
    LayerGrain = (LayerGrain - np.min(LayerGrain)) / (np.max(LayerGrain) - np.min(LayerGrain))
    LayerGrain = np.clip(LayerGrain, 0, 0.2)

    data = np.clip(LayerBase * (1) + LayerLines * (-0.85) + LayerGrain * (-0.2), 0, 1) * 0.6 + 0.2
    return data

#===============================================================================
#===============================================================================