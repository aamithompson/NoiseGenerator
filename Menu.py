
#===============================================================================
# Filename: Menu.py
# Author: Aaron Thompson
# Date Created: 3/29/2021
# Last Updated: 3/31/2021
#
# Description: 
#===============================================================================
import PyQt5.QtWidgets as qt
from Noise import *
from DataToImage import *
from DataToSound import *
from DataToGraph import *

WIDTH = 512
HEIGHT = 384

class Application(qt.QMainWindow):
    def __init__(self):
        super().__init__()

        #Tabs
        #-----------------------------------------------------------------------
        self.title = 'Noise Generator'
        self.left = 0
        self.top = 0
        self.width = WIDTH
        self.height = HEIGHT
        self.setWindowTitle(self.title)
        self.setGeometry(self.left, self.top, self.width, self.height)

        self.tableWidget = TableWidget(self)
        self.setCentralWidget(self.tableWidget)

        self.show()

class TableWidget(qt.QWidget):
    def __init__(self, parent):
        super(qt.QWidget, self).__init__(parent)
        self.layout = qt.QVBoxLayout(self)

        #Tabs
        #-----------------------------------------------------------------------
        self.tabs = qt.QTabWidget()
        self.tabInput = qt.QWidget()
        self.tabAudio = qt.QWidget()
        self.tabGraph = qt.QWidget()
        self.tabImage = qt.QWidget()
        self.tabs.resize(WIDTH, HEIGHT)

        self.tabs.addTab(self.tabInput, "Input")
        self.tabs.addTab(self.tabAudio, "Audio")
        self.tabs.addTab(self.tabGraph, "Graph")
        self.tabs.addTab(self.tabImage, "Image")

        #Graph Tab
        self.tabGraph.layout = qt.QVBoxLayout(self)
        
        data = GenerateNoiseFast(44100, 16)
        self.plot = PLTCanvas(100, 100, parent=self)
        self.plot.axes.plot(data)
        self.toolbar = NavigationToolbar2QT(self.plot, self)
        self.tabGraph.layout.addWidget(self.toolbar)
        self.tabGraph.layout.addWidget(self.plot)

        self.tabGraph.setLayout(self.tabGraph.layout)

        #Layout Application
        #-----------------------------------------------------------------------
        self.layout.addWidget(self.tabs)
        self.setLayout(self.layout)