import sys
sys.path.insert(0, 'apps/python/datiauto/DLLs')
import socket
import ac
import acsys
import threading
l_lapcount=0
lapcount=0
def conne(msg):
	s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	host = "192.168.1.102"
	port = 3333
	speed = msg
	spk = str.encode(speed)
	s.sendto(spk, (host, port))
pista = ac.getTrackName(0)
conne('sceso in pista ora {}'.format(pista))
def acMain(ac_version):
    global l_lapcount, tick
    tick = ticker()
    appWindow = ac.newApp("datiauto")
    ac.setSize(appWindow, 200, 200)
    ac.log("Welcome to DatiAuto")
    l_lapcount = ac.addLabel(appWindow, "ituoigirelli: 0");
    ac.setPosition(l_lapcount, 3, 30)
    return "datiauto"
def acUpdate(deltaT):
    global tick
    if tick.tack(deltaT):
        return
    msg = formatdati()
    conne(msg)
def prntime(ms): 
    s=ms/1000 
    m,s=divmod(s,60) 
    return m,s 
def formatdati():
    global l_lapcount, lapcount
    laps = ac.getCarState(0, acsys.CS.LapCount)
    if laps > lapcount:
        lapcount = laps                     
        ac.setText(l_lapcount, "Laps: {}".format(lapcount))
    gear = ac.getCarState(0, acsys.CS.Gear)
    gear = gear -1
    laptime = 'LT:{}'.format(prntime(ac.getCarState(0, acsys.CS.LapTime))) [:15]
    gear = "G:{}" .format(gear)
    speed = ac.getCarState(0, acsys.CS.SpeedKMH)
    speed = "S:{}" .format(speed) [:7]
    rpm = ac.getCarState(0, acsys.CS.RPM)
    rpm = "RPM:{}".format(rpm) [:8]
    msg = gear +' '+ speed + ' '+ laptime + rpm
    return msg
#-----------------------
# ticker
#--------------------
class ticker:
    def __init__(self):
        self.ticktimer = 0.0
        self.ticktime = 0.0
        self.tickrate = 0.10
   
    def tack(self,deltaT):
        self.ticktime += deltaT
        self.ticktimer += deltaT
        if self.ticktime >= self.tickrate:
            self.ticktime = self.ticktime % self.tickrate
            return False
        else:
            return True
   
    def debuginfo(self):
        return "ticktimer: %s ticktime: %s tickrate: %s" % (self.ticktimer, self.ticktime, self.tickrate)