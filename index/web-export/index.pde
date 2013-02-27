

PFont font;
int fontSize = 48;
boolean up = true;
char name[] = { 'j', 'e', 's', 's', 'e', 's', '.', 'c', 'o', '.', 't', 't' };
int index[] = new int[12];
int iVar = 0;

void setup() {
  size(1200, 200);
  // size(window.innerWidth, window.innerHeight);
  // size($(window).width(),$(window).height());
  background(0);
  stroke(255);
  fill(255);
  smooth();
  font = createFont("Arial", fontSize);
  textSize(fontSize);
  textFont(font);
  frameRate(30);
  
}

void draw() {
 
    if(frameCount % 4 == 0) {    
      if(up == true) {
        fontSize += 2;
        iVar++;
        if(fontSize >= 96) {
          up = false;
        }
      }
      if(up == false) {
        fontSize -= 2;
        iVar--;
        if(fontSize <= 24) {
          up = true;
        } 
      }
      if(iVar <= 0) {
        iVar = 0; 
      }
      else if(iVar >= 12) {
        iVar = 12;
      }
    }
    
    textSize(fontSize);
    background(0);
    
    for(int i = 0; i < name.length; i++) {
      textSize(fontSize);
      if(i == iVar) {
        textSize(fontSize + (iVar*4)); 
      }
      text(name[i], width/4 + (textWidth(i) * 5), height/2); 
      //text(name[i], width/4 + (50 * i), height/2);      
      println(i + "\t" + textWidth(i));
    }
 
} //






