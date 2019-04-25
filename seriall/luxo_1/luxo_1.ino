/*************************************************** 
  This is an example for our Adafruit 16-channel PWM & Servo driver
  Servo test - this will drive 8 servos, one after the other on the
  first 8 pins of the PCA9685

  Pick one up today in the adafruit shop!
  ------> http://www.adafruit.com/products/815
  
  These drivers use I2C to communicate, 2 pins are required to  
  interface.

  Adafruit invests time and resources providing this open source code, 
  please support Adafruit and open-source hardware by purchasing 
  products from Adafruit!

  Written by Limor Fried/Ladyada for Adafruit Industries.  
  BSD license, all text above must be included in any redistribution
 ****************************************************/

#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

// called this way, it uses the default address 0x40
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();
// you can also call it with a different address you want
//Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(0x41);
// you can also call it with a different address and I2C interface
//Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(&Wire, 0x40);

// Depending on your servo make, the pulse width min and max may vary, you 
// want these to be as small/large as possible without hitting the hard stop
// for max range. You'll have to tweak them as necessary to match the servos you
// have!
#define L0  150 // this is the 'maximum' pulse length count (out of 4096)
#define L1  250 // this is the 'maximum' pulse length count (out of 4096)
#define L2  300 // this is the 'minimum' pulse length count (out of 4096)
#define L2NHALF  350
#define L3  400 // this is the 'maximum' pulse length count (out of 4096)
#define LMID 450
#define L4  500 // this is the 'minimum' pulse length count (out of 4096)
#define L4NHALF  550
#define L5  600 // this is the 'maximum' pulse length count (out of 4096)

// our servo # counter

String inputString = "";         // a String to hold incoming data
bool stringComplete = false;  // whether the string is complete

void setup() {
  Serial.begin(9600);
  Serial.println("8 channel Servo test!");

  // reserve 200 bytes for the inputString:
  inputString.reserve(200);

  pwm.begin();
  
  pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates

  delay(10);
}

// you can use this function if you'd like to set the pulse length in seconds
// e.g. setServoPulse(0, 0.001) is a ~1 millisecond pulse width. its not precise!
void setServoPulse(uint8_t n, double pulse) {
  double pulselength;
  
  pulselength = 1000000;   // 1,000,000 us per second
  pulselength /= 60;   // 60 Hz
  Serial.print(pulselength); Serial.println(" us per period"); 
  pulselength /= 4096;  // 12 bits of resolution
  Serial.print(pulselength); Serial.println(" us per bit"); 
  pulse *= 1000000;  // convert to us
  pulse /= pulselength;
  Serial.println(pulse);
  pwm.setPWM(n, 0, pulse);
}



void loop() {

  posture_still();

  if (stringComplete) {
    Serial.println(inputString);

    if (inputString == "a\n"){
      Serial.println("com a");
        head_nodding();
        head_nodding();
    }
    // clear the string:
    inputString = "";
    stringComplete = false;
  }

}


/*
  SerialEvent occurs whenever a new data comes in the hardware serial RX. This
  routine is run between each time loop() runs, so using delay inside loop can
  delay response. Multiple bytes of data may be available.
*/
void serialEvent() {
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read();
    // add it to the inputString:
    inputString += inChar;
    // if the incoming character is a newline, set a flag so the main loop can
    // do something about it:
    if (inChar == '\n') {
      stringComplete = true;
    }
  }
}

void beHappy(){
  posture_stand();
  head_nodding();
}

void beDancing(){
  while(true){
    body_face_left();
    delay(200);
    posture_still();
    delay(400);
    posture_stand();
    delay(400);
    body_face_right();
    delay(200);
    posture_still();
    delay(400);
    posture_stand();
    delay(400);
  }
}

void beDisappinted(){
  posture_still();
  delay(2000);
  pwm.setPWM(1, 0, L5);
  delay(1000);
  while(true){
    pwm.setPWM(0, 0, L2);
    delay(800);
    pwm.setPWM(0, 0, L4);
    delay(800);
  }
}


void posture_sit(){
  pwm.setPWM(0, 0, L3);
  pwm.setPWM(1, 0, L1);
  pwm.setPWM(2, 0, L0);
  pwm.setPWM(3, 0, L0);
  pwm.setPWM(4, 0, L0);
}

void posture_still(){
  pwm.setPWM(0, 0, LMID);
  pwm.setPWM(1, 0, L2);
  pwm.setPWM(2, 0, L2);
  pwm.setPWM(3, 0, L1);
  pwm.setPWM(4, 0, L1);
}

void posture_stand(){
  pwm.setPWM(0, 0, L3);
  pwm.setPWM(1, 0, L4);
  pwm.setPWM(2, 0, L5);
  pwm.setPWM(3, 0, L3);
  pwm.setPWM(4, 0, L3);
}

void head_nodding(){
  
  for (uint16_t pulselen = LMID; pulselen < L4NHALF; pulselen+=3) {
    pwm.setPWM(0, 0, pulselen);
    delay(10);
  }
  for (uint16_t pulselen = L4NHALF; pulselen > LMID; pulselen-=3) {
    pwm.setPWM(0, 0, pulselen);
    delay(10);
  }


  for (uint16_t pulselen = LMID; pulselen > L2NHALF; pulselen-=3) {
    pwm.setPWM(0, 0, pulselen);
    delay(10);
  }
  for (uint16_t pulselen = L2NHALF; pulselen < LMID; pulselen+=3) {
    pwm.setPWM(0, 0, pulselen);
    delay(10);
  }
  
}


void body_shake(){
  posture_still();
  for(int i=0; i<4; i++){
    body_face_right();
    delay(600);
    body_face_left();
    delay(600);
  }
}

void body_face_left(){
  pwm.setPWM(5, 0, L1);
}

void body_face_right(){
  pwm.setPWM(5, 0, L4);
}
