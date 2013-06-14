

PFont font;
int fontSize = 48;
char name[] = { 'j', 'e', 's', 's', 'e', 's', '.', 'c', 'o', '.', 't', 't' };
string name = "jesses.co.tt";
int index[] = new int[12];
int iVar = 0;

void setup() {
  size(1200, 600, P2D);
  //size(window.innerWidth, window.innerHeight, P2D);
  //size($(window).width(), $(window).height());
  
  background(255);
  fill(0);
  noStroke();
  smooth();
  
  font = createFont("Helvetica", fontSize);
  textSize(fontSize);
  textFont(font);
  
  frameRate(30);
  
}

void draw() {
    
    background(255);
    fontSize = 96;
    
    translate(width * 0.10, height * 0.55);
    
    for(int i = 0; i < 75; i++) {
      fontSize ++;
      
      int r = abs(sin(i) * 25);
      int g = abs(cos(i) * 5);
      int b = abs(sin(i) * i);
 
      fill(r, g, b + i, i);
      
      textSize(fontSize); 
      text(name, 0 + i, 0); 
      
    }
    
    fill(0, 0, 255, 175);  
    textSize(171); 
    text(name, 75, 0); 
 
} //






