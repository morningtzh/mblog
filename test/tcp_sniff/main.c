#include <iostream>
#include "scanner.h"
#include <unistd.h>

int main() {

    unsigned int auiDstPorts[3] = {21,22,27017};
    unsigned int *puiDstPorts = auiDstPorts;

    SCN_InitScanner(5000,3, puiDstPorts);

    SCN_StartScanner();

    sleep(10);
    SCN_StopScanner();

}