#-------------------------------------------------------------------------------
# Filename: BrownNoise.py
# Author: Aaron Thompson
# Date Created: 3/26/2021
# Last Updated: 3/26/2021
#
# Description:
#-------------------------------------------------------------------------------
import numpy as np

N = 10**3

def GenerateBrownNoise(length):
    noise = np.zeros(length)
    t = np.linspace(0, np.pi, length)

    #Coefficients
    an = np.random.uniform(0, 1, N+1)
    coeff = np.zeros(N);
    for i in range(N):
        coeff[i] = (an[i+1]/(i+1)) * np.sqrt(2/np.pi)

    #Noise
    for i in range(length):
        sum = an[0]/np.sqrt(np.pi)
        for j in range(N):
            sum += coeff[j] * np.sin(j * t[i])
        noise[i] = sum

    return noise

def GenerateWhiteNoise(length):
    noise = np.zeros(length)
    t = np.linspace(0, np.pi, length)

    #Coefficients
    an = np.random.uniform(0, 1, N+1)
    coeff = np.zeros(N);
    for i in range(N):
        coeff[i] = an[i+1] * np.sqrt(2/np.pi)

    #Noise
    for i in range(length):
        sum = an[0]/np.sqrt(np.pi)
        for j in range(N):
            sum += coeff[j] * np.cos(j * t[i])
        noise[i] = sum

    return noise