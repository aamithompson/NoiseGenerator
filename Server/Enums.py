from enum import Enum

class NoiseType(Enum):
    White = 0
    Pink = 1
    Brown = 2
    Blue = 3

class FilterType(Enum):
    NoFilter = 0
    Lines = 1
    Rings = 2
    FlowField = 3
    Wood = 4
    Marble = 5