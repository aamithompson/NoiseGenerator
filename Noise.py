#===============================================================================
# Filename: Noise.py
# Author: Aaron Thompson
# Date Created: 3/26/2021
# Last Updated: 3/29/2021
#
# Description: 
#===============================================================================
import numpy as np
import cupy as cp
import math
from numba import vectorize
from numba import jit
#-------------------------------------------------------------------------------
#PARAMETERS
N = 10**6

#CONSTANTS
SQRT_PI = math.sqrt(math.pi)
SQRT_2DIVPI = math.sqrt(2/math.pi)

#COMPUTATION
t0 = 0
a0 = 0
n = np.arange(1, N+1)
coeff = 0
sin = 0

#General Functions
#-------------------------------------------------------------------------------
def GenerateNoise(length, type="white"):
    type = type.lower()
    if(type == "white"):
        return GenerateWhiteNoise(length)
    elif(type == "brown"):
        return GenerateBrownNoise(length)
    elif(type == "pink"):
        return GeneratePinkNoise(length)
    else:
        return None

def GenerateNoiseFast(length, nSamples=4, sampleLength=8820, type="white"):
    noise = GenerateNoise(nSamples * sampleLength, type)
    samples = np.split(noise, nSamples)
    
    n = math.ceil(length/sampleLength)
    indices = np.random.randint(0, nSamples, n)
    noise = np.copy(samples[indices[0]])
    print(indices)
    for i in range(1,n):
        np.append(noise, samples[indices[i]])

    return np.resize(noise, length)

#Brown Noise
#-------------------------------------------------------------------------------
def GenerateBrownNoise(length):
    t = np.linspace(0, math.pi, length)
    an = np.random.normal(0, 1, N+1)

    sums = np.empty(length)
    for i in range(length):
        sequence = BrownSequence(an[1:], n, t[i])
        sums[i] = np.sum(sequence)

    return (an[0]/SQRT_PI) * t + sums

@vectorize(['float64(float64, int32, float64)'], target='cuda')
def BrownSequence(a, n, t):
    return (a/n) * SQRT_2DIVPI * math.sin(n * t)

#White Noise
#-------------------------------------------------------------------------------

def GenerateWhiteNoise(length):
    t = np.linspace(0, math.pi, length)
    an = np.random.normal(0, 1, N+1)

    sums = np.empty(length)
    for i in range(length):
        sequence = WhiteSequence(an[1:], n, t[i])
        sums[i] = np.sum(sequence)

    return ((an[0]/SQRT_PI) + sums)/(N *(10**-3))

@vectorize(['float64(float64, int32, float64)'], target='cuda')
def WhiteSequence(a, n, t):
    return a * SQRT_2DIVPI * math.cos(n * t)

#Pink Noise
#-------------------------------------------------------------------------------
def GeneratePinkNoise(length, frequency=44100, alpha=1.1):
    noise = GenerateWhiteNoise(length)
    return PinkFilter(noise, frequency, alpha)

@vectorize(['float64(float64, int32, float64)'])
def PinkFilter(noise, frequency, alpha):
    return noise / (frequency**(alpha/2))