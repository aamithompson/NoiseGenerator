#-------------------------------------------------------------------------------
# Filename: DateToSound.py
# Author: Aaron Thompson
# Date Created: 3/26/2021
# Last Updated: 3/26/2021
#
# Description:
#-------------------------------------------------------------------------------
import sounddevice as sd
import soundfile as sf
import time
from Noise import *

start = time.time()
data = GenerateNoiseFast(44100 * 10, 16, 8820)
print(time.time() - start)
sd.play(data, 44100)
sf.write("audioFast.wav", data, 44100)

#start = time.time()
#data = GenerateNoise(44100)
#print(time.time() - start)
#sd.play(data, 44100)
#sf.write("audioSlow.wav", data, 44100)