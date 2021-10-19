#-------------------------------------------------------------------------------
# Filename: Noise_Generator.py
# Author: Aaron Thompson
# Date Created: 3/26/2021
# Last Updated: 3/26/2021
#
# Description:
#-------------------------------------------------------------------------------
import sys
import PyQt5.QtWidgets as qt
from Menu import *

if __name__ == '__main__':
    qApplication = qt.QApplication(sys.argv)
    application = Application()
    sys.exit(qApplication.exec_())