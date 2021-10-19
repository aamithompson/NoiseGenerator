#-------------------------------------------------------------------------------
# Filename: DateToGraph.py
# Author: Aaron Thompson
# Date Created: 3/31/2021
# Last Updated: 3/31/2021
#
# Description:
#-------------------------------------------------------------------------------
import matplotlib as plt
plt.use('Qt5Agg')

from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg, NavigationToolbar2QT
from matplotlib.figure import Figure

class PLTCanvas(FigureCanvasQTAgg):
    def __init__(self, width, height, dpi=100, parent=None):
        figure = Figure(figsize=(width, height), dpi=dpi)
        self.axes = figure.add_subplot(111)
        super(PLTCanvas, self).__init__(figure)
