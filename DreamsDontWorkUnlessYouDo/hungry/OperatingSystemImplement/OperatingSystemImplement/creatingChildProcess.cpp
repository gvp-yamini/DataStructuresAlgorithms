#include <iostream>
using namespace std;

extern "C" void sleep();
extern "C" int fork();
extern "C" int getpid();
extern "C" void wait();
extern "C" void exit();


void ChildProcess();

int main(){
	int pid,cid;
	pid = getpid();
	cout << "parent pid = " << pid << "\n";
	if(!fork()){
		cid = getpid();
		cout << "child created cid "<<cid<<"\n";
		ChildProcess();
		exit(0);
	}else{
		cout << "child not created";
	}
	cout << "parent waiting\n";
	wait();
	cout << "child finished\n";
	return 0;
}

void ChildProcess()

{ int i;

for (i = 0; i < 10; i++)
   {
   cout << i << "..\n";
   sleep();
   }
}