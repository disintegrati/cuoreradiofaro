#!/usr/bin/ python
import RPi.GPIO as GPIO
import time
import subprocess
import thread
import os
LedPin = 12
GPIO.setmode(GPIO.BOARD)       # Numbers pins by physical location
GPIO.setup(LedPin, GPIO.OUT)   # Set pin mode as output
GPIO.output(LedPin, GPIO.LOW)  # Set pin to low(0V)
 
p = GPIO.PWM(LedPin, 1000)     # set Frequece to 1KHz
p.start(0)                     # Start PWM output, Duty Cycle = 0
 

def pulsa():
	while True:
		for dc in range(0, 101, 50):   # Increase duty cycle: 0~100
                        p.ChangeDutyCycle(dc)     # Change duty cycle
                        time.sleep(0.05)
                time.sleep(0.05)
                for dc in range(100, -1, -50): # Decrease duty cycle: 100~0
                        p.ChangeDutyCycle(dc)
                        time.sleep(0.05)
                time.sleep(0.10)
		for dc in range(0, 101, 50):
			p.ChangeDutyCycle(dc)
			time.sleep(0.05)
		time.sleep(0.5)
		for dc in range(100, -1, -10):
			p.ChangeDutyCycle(dc)
			time.sleep(0.05)
#		time.sleep(1)
		os._exit(0)
try:
	thread.start_new_thread(pulsa, () )

except KeyboardInterrupt:
        p.stop()
        GPIO.output(LedPin, GPIO.HIGH)    # turn off all leds
        GPIO.cleanup()

while 1:
	pass
