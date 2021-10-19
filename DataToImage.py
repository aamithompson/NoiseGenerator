#-------------------------------------------------------------------------------
# Filename: DataToImage.py
# Author: Aaron Thompson
# Date Created: 3/26/2021
# Last Updated: 3/26/2021
#
# Description:
#-------------------------------------------------------------------------------
import PIL.Image as img
import numpy as np

def DataToImage(data):
    matrix = VectorToSquareMatrix(data) * 128 + 128
    matrix = matrix.astype(int)
    image = img.new("L", matrix.shape)

    print(matrix)
    for i in range(matrix.shape[0]):
        for j in range(matrix.shape[1]):
            image.putpixel((i, j), matrix[i, j].item())

    return image

def VectorToSquareMatrix(data):
    length = np.floor(np.sqrt(data.size)).astype(int)
    vector = data[:length**2]
    
    return np.reshape(vector, (length, length))
    