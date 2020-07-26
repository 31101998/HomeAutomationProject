#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#define LED D3
#define ZERO_CROSSING D2
float passval;
int IRSensor = 2; // connect ir sensor to arduino pin 2

/* Set these to your desired credentials. */
const char *ssid = "Owl"; //Enter your WIFI ssid
const char *password = "Mahad3vP@rsekar"; //Enter your WIFI password
ESP8266WebServer server(80);
void handleRoot()   {
server.send(200, "text/html", "<form action=\"/LED_BUILTIN_on\" method=\"get\" id=\"form1\"></form><button type=\"submit\" form=\"form1\" value=\"On\">Bulb_On</button><form action=\"/LED_BUILTIN_off\" method=\"get\" id=\"form2\"></form><button type=\"submit\" form=\"form2\" value=\"Off\">Bulb_Off</button><form action=\"/LED_off\" method=\"get\" id=\"form3\"></form><button type=\"submit\" form=\"form3\" value=\"Off\">Fan_Off</button><form action=\"/LED_on_LOW\" method=\"get\" id=\"form4\"></form><button type=\"submit\" form=\"form4\" value=\"On\">Fan_Low</button><form action=\"/LED_on_MED\" method=\"get\" id=\"form5\"></form><button type=\"submit\" form=\"form5\" value=\"On\">Fan_Med</button><form action=\"/LED_on_HIGH\" method=\"get\" id=\"form6\"></form><button type=\"submit\" form=\"form6\" value=\"On\">Fan_High</button>");
}
void handleSave() {
 if (server.arg("pass") != "") {
   Serial.println(server.arg("pass"));
 }
}
void setupWifi(){
 Serial.println();
 Serial.print("Configuring access point...");
 WiFi.begin(ssid, password);
 while (WiFi.status() != WL_CONNECTED) {
   delay(500);
   Serial.print(".");
 }
 Serial.println("");
 Serial.println("WiFi connected to");
 Serial.print(ssid);
 Serial.println("IP address: ");
 Serial.println(WiFi.localIP());
 
}

void serverHandler(){
  server.on ( "/", handleRoot );
 server.on ("/save", handleSave);
 server.begin();
 Serial.println ( "HTTP server started" );
 server.on("/LED_BUILTIN_on", []() {
   digitalWrite(LED_BUILTIN, HIGH);
   Serial.println(server.args());
   server.sendHeader("Access-Control-Allow-Origin", "*");
   server.send(200, "text/plain", "Success");
 });
 server.on("/LED_BUILTIN_off", []() {
   digitalWrite(LED_BUILTIN, LOW);
   Serial.println("off");
   server.sendHeader("Access-Control-Allow-Origin", "*");
   server.send(200, "text/plain", "Success");
 });

 server.on("/ChangeSpeed", []() {
  passval =server.arg(0).toFloat();
   Serial.println(passval);
   server.send(200, "text/plain", "Success");
//   handleRoot();
 });
// server.on("/LED_on", []() {
//   digitalWrite(LED, HIGH);
//   Serial.println("on");
//   handleRoot();
// });
 server.on("/LED_off", []() {
   digitalWrite(LED, LOW);
   passval = 9.5;
   Serial.println("Fan off");
   handleRoot();
 });
  server.on("/LED_on_LOW", []() {
   passval = 6;
   Serial.println("passval = 5");
   handleRoot();
 });
 server.on("/LED_on_MED", []() {
   passval = 5;
   Serial.println("passval = 2.5");
   handleRoot();
 });
 server.on("/LED_on_HIGH", []() {
  //digitalWrite(LED, HIGH);
   passval = 0;
   Serial.println("passval = 0");
   handleRoot();
 });
  server.on("/Get_Data", []() {
    
    int data = analogRead(A0);
    float calculatedValue = ((3.3/1023) * data) - .15;
    String thisString = String(calculatedValue);
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(200, "text/plain", thisString);
  });
}
void setup() {
 pinMode(ZERO_CROSSING,INPUT);
 pinMode(LED,OUTPUT);
 pinMode(LED_BUILTIN, OUTPUT);
 delay(3000);
 Serial.begin(115200);
 setupWifi();
 serverHandler();
}

void loop() {
server.handleClient();
int senVal = digitalRead(ZERO_CROSSING);

if(passval == 0)
digitalWrite(LED,HIGH);

if(passval != 0)
{
if(senVal == HIGH)
{
//Serial.println(senVal);
digitalWrite(LED,LOW);
delay(passval);
digitalWrite(LED,HIGH);
delay(10-passval);
}
}
} 
