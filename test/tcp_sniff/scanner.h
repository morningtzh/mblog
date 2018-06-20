
void SCN_StartScanner();

char *SCN_StopScanner(void);

int SCN_InitScanner(unsigned int uiSentInterval, unsigned int uiDstPortCount, unsigned int *pauiDstPorts);

typedef struct tagSCN_Config {

    char *pcDataArray;
    unsigned int uiDataLength;
    unsigned int uiSentInterval;
    unsigned int uiIfSent;
    unsigned int uiDstPortCount;
    unsigned int auiDstPorts[10];
    int iRawSocket;
    unsigned int uiScannerSrcPort;


}SCN_CONFIG;