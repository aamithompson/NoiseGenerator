#===============================================================================
# Filename: NoiseColors.py
# Author(s): Aaron Thompson
# Date Created: 1/12/2022
# Date Last Updated: 1/15/2022
# Description: Takes the base noise generation from Noise.py and projects them
# into a discrete set of 'colors' by providing functions for each 'color'.
# https://en.wikipedia.org/wiki/Colors_of_noise
#===============================================================================
import sys
sys.path.insert(1, '.')

from . import Noise as ns

# CONSTANT(S)
#-------------------------------------------------------------------------------
FPOWER_WHITE = 0.0
FPOWER_PINK = 1.0
FPOWER_BROWN = 2.0
FPOWER_BLUE = -1.0
FPOWER_PURPLE = -2.0

# FUNCTION(S)
#-------------------------------------------------------------------------------
def GenerateNoiseWhite(duration=ns.DEFAULT_DURATION, minF=ns.DEFAULT_MINF, maxF=ns.DEFAULT_MAXF, sRate=ns.DEFAULT_SRATE, att=ns.DEFAULT_ATT, comp=ns.DEFAULT_COMP):
    return ns.GenerateNoise(duration, FPOWER_WHITE, minF, maxF, sRate, att, comp)

def GenerateNoisePink(duration=ns.DEFAULT_DURATION, minF=ns.DEFAULT_MINF, maxF=ns.DEFAULT_MAXF, sRate=ns.DEFAULT_SRATE, att=ns.DEFAULT_ATT, comp=ns.DEFAULT_COMP):
    return ns.GenerateNoise(duration, FPOWER_PINK, minF, maxF, sRate, att, comp)

def GenerateNoiseBrown(duration=ns.DEFAULT_DURATION, minF=ns.DEFAULT_MINF, maxF=ns.DEFAULT_MAXF, sRate=ns.DEFAULT_SRATE, att=ns.DEFAULT_ATT, comp=ns.DEFAULT_COMP):
    return ns.GenerateNoise(duration, FPOWER_BROWN, minF, maxF, sRate, att, comp)

def GenerateNoiseBlue(duration=ns.DEFAULT_DURATION, minF=ns.DEFAULT_MINF, maxF=ns.DEFAULT_MAXF, sRate=ns.DEFAULT_SRATE, att=ns.DEFAULT_ATT, comp=ns.DEFAULT_COMP):
    return ns.GenerateNoise(duration, FPOWER_BLUE, minF, maxF, sRate, att, comp)

def GenerateNoisePurple(duration=ns.DEFAULT_DURATION, minF=ns.DEFAULT_MINF, maxF=ns.DEFAULT_MAXF, sRate=ns.DEFAULT_SRATE, att=ns.DEFAULT_ATT, comp=ns.DEFAULT_COMP):
    return ns.GenerateNoise(duration, FPOWER_PURPLE, minF, maxF, sRate, att, comp)
#===============================================================================
#===============================================================================
