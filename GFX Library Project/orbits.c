// Lucas Carrit Delgado Pinheiro
// Fundamentals of Computing - Lab 11
//
// The goal of this project is to simulate some interesting orbits.

#define _BSD_SOURCE
#include<stdio.h>
#include<math.h>
#include<unistd.h>
#include<time.h>

#include"gfx.h"

// Mathematical and physical constants are allowed to be globally defined
#define G 39.48 // Universal Gravitational Constant in AU^3 * Solar Masses^-1 * year ^-2

typedef struct{
	float period;
	float radius;
	float angle;
	float vx; // x-axis velocity
	float vy; // y-axis velocity
	int px; // x-axis position
	int py; // y-axis position
	float ax; // x-axis acceleration
	float ay; // y-axis acceleration
	int radPixels;
} orbitData;


int menuChoice();
void solarSystem(int, int);
void crazyOrbit(int, int);
void simulatorSEM(int, int);
float accelerationCalc(float, float);

int main(){

	// Height and width for the windows
	int height = 750;
	int width = 750;

	// Ask for user input to select a simulation
	int option;

	while(option != 4){

		option = menuChoice();

		switch(option){

			case 1:
				solarSystem(height, width);
				break;
			case 2:
				simulatorSEM(height, width);
				break;
			case 3:
				crazyOrbit(height, width);
				break;
			case 4:
				printf("Bye!\n");
				break;
			default:
				printf("This is not a valid option.\n");
				break;
		}
	}

	return 0;
}

int menuChoice(){

	int option;

	printf("Select an option:\n");
	printf("1 - Solar Sistem Simulator\n");
	printf("2 - Sun-Earth-Moon\n");
	printf("3 - Very Crazy Orbit\n");
	printf("4 - Quit\n");
	printf("Enter your choice: ");
	scanf("%d", &option);

	return option;
}

void solarSystem(int height, int width){

	// This simulation represents the Solar System on scale
	// The angular velocities are also proportional to the real values

	// First, create an array of orbital data;
	orbitData solarOrbits[8];

	// Update the data for each planet
	// The periods are in years, and the radii are in astronomical units (AU)
	// Mercury
	solarOrbits[0].period = 0.241;
	solarOrbits[0].radius = 0.387;

	// Venus
	solarOrbits[1].period = 0.615;
	solarOrbits[1].radius = 0.723;
	
	// Earth
	solarOrbits[2].period = 1.000;
	solarOrbits[2].radius = 1.000;

	// Mars
	solarOrbits[3].period = 1.881;
	solarOrbits[3].radius = 1.524;

	// Jupiter
	solarOrbits[4].period = 11.863;
	solarOrbits[4].radius = 5.203;

	// Saturn
	solarOrbits[5].period = 29.447;
	solarOrbits[5].radius = 9.537;

	// Uranus
	solarOrbits[6].period = 84.017;
	solarOrbits[6].radius = 19.191;
 
	// Neptune
	solarOrbits[7].period = 163.723;
	solarOrbits[7].radius = 30.069;

	// Set all angles initially to zero
	
	for (int i = 0; i < 8; i++)
		solarOrbits[i].angle = 0;

	// Define the intial position of each planet based on the largest radius
	for (int i = 0; i < 8; i++){
		solarOrbits[i].radPixels = (width/2 - 20)/solarOrbits[7].radius*solarOrbits[i].radius;
		solarOrbits[i].px = width/2 + solarOrbits[i].radPixels;
		solarOrbits[i].py = height/2;
	}

	// Open the board with the initial configuration.
	gfx_open(width, height, "Solar System");
	int planetSize = 3;

	for (int i = 0; i < 8; i++){
		gfx_color(125, 3, 41);
		gfx_circle(width/2, height/2, solarOrbits[i].radPixels);
		gfx_color(12, 211, 98);
		gfx_circle(solarOrbits[i].px, solarOrbits[i].py, planetSize);
	}

	gfx_flush();

	// Now, animate the planets while the user doesn't quit
	
	while (1){

		usleep(10000);
		int user = gfx_event_waiting();

		if (user == 0){

			gfx_clear();
			for (int i = 0; i < 8; i++){

				solarOrbits[i].angle = solarOrbits[i].angle - 0.05/solarOrbits[i].period; // The multiplying factor makes the animation smoother
				solarOrbits[i].px = width/2 + solarOrbits[i].radPixels*cos(solarOrbits[i].angle);
				solarOrbits[i].py = height/2 + solarOrbits[i].radPixels*sin(solarOrbits[i].angle);
	
				gfx_color(125, 3, 41);
				gfx_circle(width/2, height/2, solarOrbits[i].radPixels);
				gfx_color(12, 211, 98);
				gfx_circle(solarOrbits[i].px, solarOrbits[i].py, planetSize);	
			}
			gfx_flush();
		}

		else if (user == 1){
			char c = gfx_wait();
			if (c == 'q') break;
		}
	}
}

void simulatorSEM(int height, int width){

	// First, declare an array of struct struct for the Earth and the Moon
	// Earth is 0 and Moon is 1

	orbitData dataSEM[2];

	// Earth
	dataSEM[0].radius = 1.00;
	dataSEM[0].period = 1.00;
	dataSEM[0].angle = 0;

	// Moon
	dataSEM[1].radius = 0.002569;
	dataSEM[1].period = 0.08068;
	dataSEM[1].angle = 0;

	// Scale the radii
	// It would be impossible to draw the radius of the Moon to scale because if would correspond to less than a pixel
	// That's why an additional factor (20) was included
	// Therefore, the periods are still proportional, but the radii are not

	dataSEM[0].radPixels = width/2 - 50;
	dataSEM[1].radPixels = dataSEM[1].radius/dataSEM[0].radius*dataSEM[0].radPixels*20;

	// Print the initial configuration
	gfx_open(width, height, "Sun-Earth-Moon");
	gfx_color(255,255,0);
	int radSun = 20;
	gfx_circle(width/2, height/2, radSun);
	gfx_color(20, 90, 10);
	gfx_circle(width/2, height/2, dataSEM[0].radPixels);
	gfx_color(0,0,255);
	int radEarth = 6;
	gfx_circle(width/2 + dataSEM[0].radPixels, height/2, radEarth);
	gfx_color(100, 150, 15);
	gfx_circle(width/2 + dataSEM[0].radPixels, height/2, dataSEM[1].radPixels);
	int radMoon = 2;
	gfx_color(255,255,255);
	gfx_circle(width/2 + dataSEM[0].radPixels + dataSEM[1].radPixels, height/2, radMoon);
	gfx_flush();


	// Now, animate the orbits while the user doesn't quit
	
	while (1){

		usleep(10000);
		int user = gfx_event_waiting();

		if (user == 0){
			gfx_clear();
			for (int i = 0; i < 2; i++){
				dataSEM[i].angle = dataSEM[i].angle - 0.005/dataSEM[i].period;
				// In this case, px and py are relative to the center of the orbit, not absolute
				dataSEM[i].px = dataSEM[i].radPixels*cos(dataSEM[i].angle); 
				dataSEM[i].py = dataSEM[i].radPixels*sin(dataSEM[i].angle);
			}

			gfx_color(255,255,0);
			gfx_circle(width/2, height/2, radSun);
			gfx_color(20, 90, 10);
			gfx_circle(width/2, height/2, dataSEM[0].radPixels);
			gfx_color(0,0,255);
			gfx_circle(width/2 + dataSEM[0].px, height/2 + dataSEM[0].py, radEarth);
			gfx_color(100, 150, 15);
			gfx_circle(width/2 + dataSEM[0].px, height/2 + dataSEM[0].py, dataSEM[1].radPixels);
			gfx_color(255,255,255);
			gfx_circle(width/2 + dataSEM[0].px + dataSEM[1].px, height/2 + dataSEM[0].py + dataSEM[1].py, radMoon);
			gfx_flush();
		}

		else if (user == 1){
			char c = gfx_wait();
			if (c == 'q') break;
		}
	}
}

void crazyOrbit(int height, int width){

	// This function simulates a very unusual hypothetical orbit
	// This is an orbit with a planet and two stars
	// The regular orbital mechanics laws for a single star don't apply in this case
	// It is extremely hard to manually calculate the parameters for the orbit in this case
	// But it is possible to use a computer simulation to visualize it
	// This simulation also assumes that the stars are stationary with respect to each other
	// This wouldn't be the case in reality, but this assumption is useful to simplify the simulation
	// The parameters for the orbit were purposefully chosen to demonstrate a slingshot effect
	
	// Declare the mass of each star (in Solar masses)
	float M1 = 1.5;
	float M2 = 0.7;

	// Declare the position of each star (in pixels)
	int px1 = width/2 + 100;
	int px2 = width/2 - 100;
	int py1 = height/2;
	int py2 = height/2;

	// Create a struct for the planet and define the initial parameters

	orbitData planetOrbit;
	
	planetOrbit.px = width/2 + 250;
	planetOrbit.py = height/2;
	planetOrbit.vx = 0;
	planetOrbit.vy = 25;

	// Print the initial configuration
	gfx_open(width, height, "Very Crazy Orbit");
	int radStar = 7;
	gfx_color(2, 41, 139);
	gfx_circle(px1, py1, radStar);
	gfx_circle(px2, py2, radStar);
	int radPlanet = 3;
	gfx_color(200, 5, 98);
	gfx_circle(planetOrbit.px, planetOrbit.py, radPlanet);
	gfx_flush();

	// Update the orbit until the user quits
	// Before the loop, define a small time interval for the discretized function
	float dt = 0.1;

	while (1){

		usleep(10000);
		int user = gfx_event_waiting();

		if (user == 0){

			gfx_clear();

			// Star 1

			// Distance 1

			float d1 = sqrt(pow(planetOrbit.px - px1, 2) + pow(planetOrbit.py - py1, 2));

			// Acceleration 1

			float a1 = accelerationCalc (M1, d1);

			// Angle 1

			float angle1 = atan2((planetOrbit.py - py1), (planetOrbit.px - px1));

			// Acceleration components 1

			float a1x = a1*cos(angle1);
			float a1y = a1*sin(angle1);

			// Check the direction of the acceleration

			if (planetOrbit.px > px1)
				a1x = -a1x;

			if (planetOrbit.py > py1)
				a1y = -a1y;
		
			// Star 2

			// Distance 2

			float d2 = sqrt(pow(planetOrbit.px - px2, 2) + pow(planetOrbit.py - py2, 2));

			// Acceleration 2

			float a2 = accelerationCalc (M2, d2);

			// Angle 2

			float angle2 = atan2((planetOrbit.py - py2), (planetOrbit.px - px2));

			// Acceleration components 2

			float a2x = a2*cos(angle2);	
			float a2y = a2*sin(angle2);

			// Check the direction of the acceleration

			if (planetOrbit.px > px2)
				a2x = -a2x;

			if (planetOrbit.py > py1)
				a2y = -a2y;

			// Calculate the total acceleration

			planetOrbit.ax = a1x + a2x;
			planetOrbit.ay = a1y + a2y;
	
			// Update the planet's position	

			planetOrbit.px = planetOrbit.px + planetOrbit.vx*dt;
			planetOrbit.py = planetOrbit.py + planetOrbit.vy*dt;

			// Update the planet's velocity

			planetOrbit.vx = planetOrbit.vx + planetOrbit.ax*dt;
			planetOrbit.vy = planetOrbit.vy + planetOrbit.ay*dt;

			// Print the new configuration

			gfx_color(2, 41, 139);
			gfx_circle(px1, py1, radStar);
			gfx_circle(px2, py2, radStar);
			gfx_color(200, 5, 98);
			gfx_circle(planetOrbit.px, planetOrbit.py, radPlanet);
			gfx_flush();
		}

		else if (user == 1){
			char c = gfx_wait();
			if (c == 'q') break;
		}

		// Reset the orbit whenever the planet goes out of bounds
		if (planetOrbit.px < 0 || planetOrbit.py > width || planetOrbit.py < 0 || planetOrbit.py > width){

			planetOrbit.px = width/2 + 250;
			planetOrbit.py = height/2;
			planetOrbit.vx = 0;
			planetOrbit.vy = 25;

			// Print the initial configuration
			gfx_clear();
			gfx_color(2, 41, 139);
			gfx_circle(px1, py1, radStar);
			gfx_circle(px2, py2, radStar);
			gfx_color(200, 5, 98);
			gfx_circle(planetOrbit.px, planetOrbit.py, radPlanet);
			gfx_flush();
		}

	}
}

float accelerationCalc (float mass, float distance){

	float acceleration = 1000*G*mass/pow(distance, 2); // Since d is in pixels, 1000 is just a conversion factor

	return acceleration;
}
