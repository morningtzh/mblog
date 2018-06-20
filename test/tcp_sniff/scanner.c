//
// Created by MorningTZH on 2018/2/11.
//

#include <sys/types.h>
//#include <iostream>
//#include <netinet/ip.h>
//#include <netinet/tcp.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <errno.h>
#include <sys/select.h>


#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <sys/select.h>
#include <sys/types.h>
#include <time.h>
#include <fcntl.h>
#include <signal.h>
#include <string.h>
#include <pthread.h>

#include "header.h"
#include "scanner.h"
#include "util.h"
#include "rand.h"
#include "checksum.h"

char scanner_rawpkt[sizeof(struct ip) + sizeof(struct tcphdr) + 5] = {0};
ipv4_t LOCAL_ADDR;

SCN_CONFIG g_stSCNConfig;

static ipv4_t get_random_ip(void)
{
    uint8_t o1, o2, o3, o4;
    uint32_t tmp;

    do
    {
        tmp = rand_next();

        o1 = (uint8_t) (tmp & 0xff);
        o2 = (uint8_t) ((tmp >> 8) & 0xff);
        o3 = (uint8_t) ((tmp >> 16) & 0xff);
        o4 = (uint8_t) ((tmp >> 24) & 0xff);
    }
    while (o1 == 127 ||                             // 127.0.0.0/8      - Loopback
           (o1 == 0) ||                              // 0.0.0.0/8        - Invalid address space
           (o1 == 3) ||                              // 3.0.0.0/8        - General Electric Company
           (o1 == 15 || o1 == 16) ||                 // 15.0.0.0/7       - Hewlett-Packard Company
           (o1 == 56) ||                             // 56.0.0.0/8       - US Postal Service
           (o1 == 10) ||                             // 10.0.0.0/8       - Internal network
           (o1 == 192 && o2 == 168) ||               // 192.168.0.0/16   - Internal network
           (o1 == 172 && o2 >= 16 && o2 < 32) ||     // 172.16.0.0/14    - Internal network
           (o1 == 100 && o2 >= 64 && o2 < 127) ||    // 100.64.0.0/10    - IANA NAT reserved
           (o1 == 169 && o2 > 254) ||                // 169.254.0.0/16   - IANA NAT reserved
           (o1 == 198 && o2 >= 18 && o2 < 20) ||     // 198.18.0.0/15    - IANA Special use
           (o1 >= 224) ||                            // 224.*.*.*+       - Multicast
           (o1 == 6 || o1 == 7 || o1 == 11 || o1 == 21 || o1 == 22 || o1 == 26 || o1 == 28 || o1 == 29 || o1 == 30 || o1 == 33 || o1 == 55 || o1 == 214 || o1 == 215) // Department of Defense
            );

    return INET_ADDR(o1,o2,o3,o4);
}

int SCN_DstPortInList(int port) {

    int dportIndex;
    int tmpPort = ntohs(port);

    for (dportIndex = 0; dportIndex < g_stSCNConfig.uiDstPortCount; dportIndex++) {
        if (g_stSCNConfig.auiDstPorts[dportIndex] == tmpPort) {
            return 1;
        }
    }

    return 0;
}

void SCN_SetupHeader(char *pcRawPacketModal) {

    struct ip *pstIpHeader;
    struct tcphdr *pstTcpHeader;

    do {
        g_stSCNConfig.uiScannerSrcPort = rand_next() & 0xffff;
    } while (ntohs(g_stSCNConfig.uiScannerSrcPort) < 1024);

    pstIpHeader = (struct ip *) pcRawPacketModal;
    pstTcpHeader = (struct tcphdr *) (pstIpHeader + 1);

    // Set up IPv4 header
    pstIpHeader->ip_hl = sizeof(struct ip) / 4;
    pstIpHeader->ip_v = 4;
    pstIpHeader->ip_tos = 0;
    pstIpHeader->ip_len = htons(sizeof(struct ip) + sizeof(struct tcphdr));
    pstIpHeader->ip_dst.s_addr = rand_next();
    pstIpHeader->ip_ttl = 64;
    pstIpHeader->ip_p = IPPROTO_TCP;
    //pstIpHeader->ip_id = 0;

    // Set up TCP header
    pstTcpHeader->th_dport = htons(23);
    pstTcpHeader->th_sport = g_stSCNConfig.uiScannerSrcPort;
    pstTcpHeader->th_off = sizeof(struct tcphdr) / 4;
    pstTcpHeader->th_win = 4096; //rand_next() & 0xffff;
    pstTcpHeader->th_flags = TH_SYN;
}

int SentPacket = 0;
int RecvPacket = 0;
int usefulPacket = 0;

void SCN_SentPerPacket(char *pcRawPacketModal) {

    int dportIndex = 0;
    struct sockaddr_in stSocketAddress = {0};
    struct ip *pstIpHeader = (struct ip *) scanner_rawpkt;
    struct tcphdr *pstTcpHeader = (struct tcphdr *) (pstIpHeader + 1);

    pstIpHeader->ip_id = rand_next();
    pstIpHeader->ip_src.s_addr = LOCAL_ADDR;
    pstIpHeader->ip_dst.s_addr = get_random_ip();
    pstIpHeader->ip_sum = 0;
    pstIpHeader->ip_sum = checksum_generic((uint16_t *) pstIpHeader, sizeof(struct ip));

    for (dportIndex = 0; dportIndex < g_stSCNConfig.uiDstPortCount; dportIndex++) {
        pstTcpHeader->th_dport = htons(g_stSCNConfig.auiDstPorts[dportIndex]);

        pstTcpHeader->th_seq = pstIpHeader->ip_dst.s_addr;
        pstTcpHeader->th_sum = 0;
        pstTcpHeader->th_sum = checksum_tcpudp(pstIpHeader, pstTcpHeader, htons(sizeof(struct tcphdr)),
                                               sizeof(struct tcphdr));

        stSocketAddress.sin_family = AF_INET;
        stSocketAddress.sin_addr.s_addr = pstIpHeader->ip_dst.s_addr;
        stSocketAddress.sin_port = pstTcpHeader->th_dport;
        bzero(stSocketAddress.sin_zero, 8);

        ssize_t size = sendto(g_stSCNConfig.iRawSocket, scanner_rawpkt, (sizeof(struct ip) + sizeof(struct tcphdr)),
#if (defined(__APPLE__) && defined(__MACH__))
                              0,//SO_NOSIGPIPE,
#else
                MSG_NOSIGNAL,
#endif
                              (struct sockaddr *) &stSocketAddress, sizeof(stSocketAddress));
    }

    SentPacket += 1;
//    printf("[scanner] Sent from sk %d IP %d.%d.%d.%d:%d\n", g_stSCNConfig.iRawSocket,
//           (LOCAL_ADDR) & 0xff,
//           (LOCAL_ADDR >> 8) & 0xff,
//           (LOCAL_ADDR >> 16) & 0xff,
//           (LOCAL_ADDR >> 24) & 0xff,
//           ntohs(pstTcpHeader->th_sport)
//    );
//
//    printf("[scanner] Sent to IP %d.%d.%d.%d detect %5d   %d %d\n",
//           (pstIpHeader->ip_dst.s_addr) & 0xff,
//           (pstIpHeader->ip_dst.s_addr >> 8) & 0xff,
//           (pstIpHeader->ip_dst.s_addr >> 16) & 0xff,
//           (pstIpHeader->ip_dst.s_addr >> 24) & 0xff,
//           ntohs(pstTcpHeader->th_dport), size, errno
//    );

}

int SCN_RecvPerPacket() {

    // Read packets from raw socket to get SYN+ACKs
    int n;
    char dgram[1514];
    struct ip *pstIpHeader = (struct ip *) dgram;
    struct tcphdr *pstTcpHeader = (struct tcphdr *) (pstIpHeader + 1);

    char acResult[50];

    errno = 0;
    n = (int) recvfrom(g_stSCNConfig.iRawSocket, dgram, sizeof(dgram),
#if (defined(__APPLE__) && defined(__MACH__))
                       SO_NOSIGPIPE,
#else
            MSG_NOSIGNAL,
#endif
                       NULL, NULL);

    RecvPacket += 1;
    if (n <= 0 || errno == EAGAIN || errno == EWOULDBLOCK) {
        printf("[scanner] Recv packet Error ret = %d , errno = %d\n", n, errno);
        return -1;
    }

    if (n < sizeof(struct ip) + sizeof(struct tcphdr))
    {
        return 4;
    }
    if (pstIpHeader->ip_dst.s_addr != LOCAL_ADDR)
    {
        printf("[scanner] Recv error dIP %d.%d.%d.%d\n",
               (pstIpHeader->ip_src.s_addr) & 0xff,
               (pstIpHeader->ip_src.s_addr >> 8) & 0xff,
               (pstIpHeader->ip_src.s_addr >> 16) & 0xff,
               (pstIpHeader->ip_src.s_addr >> 24) & 0xff
        );
        return 4;
    }
    if (pstIpHeader->ip_p != IPPROTO_TCP)
    {
        printf("[scanner] Recv error protocol %d\n",pstIpHeader->ip_p);
        return 4;
    }
    if (0 == SCN_DstPortInList(pstTcpHeader->th_sport)) {
//        printf("[scanner] Recv error dport %d.%d.%d.%d:%d\n",
//               (pstIpHeader->ip_src.s_addr) & 0xff,
//               (pstIpHeader->ip_src.s_addr >> 8) & 0xff,
//               (pstIpHeader->ip_src.s_addr >> 16) & 0xff,
//               (pstIpHeader->ip_src.s_addr >> 24) & 0xff,
//               ntohs(pstTcpHeader->th_sport)
//        );
        return 4;
    }
    if (pstTcpHeader->th_dport != g_stSCNConfig.uiScannerSrcPort)
    {
        printf("Recv dport is %d\n", ntohs(pstTcpHeader->th_dport));
        return 4;
    }
    if (TH_SYN != (pstTcpHeader->th_flags & TH_SYN) )
    {
        //printf("Recv dont have syn, %u\n", pstTcpHeader->th_flags);
        return 4;
    }
    if (TH_ACK != (pstTcpHeader->th_flags & TH_ACK) )
    {
        //printf("Recv dont have ack, %u\n", pstTcpHeader->th_flags);
        return 4;
    }
    if (TH_RST == (pstTcpHeader->th_flags & TH_RST) )
    {
        printf("Recv have rst, %u\n", pstTcpHeader->th_flags);
        return 4;
    }
    if (TH_FIN == (pstTcpHeader->th_flags & TH_FIN) )
    {
        printf("Recv have fin, %u\n", pstTcpHeader->th_flags);
        return 4;
    }
    if (htonl(ntohl(pstTcpHeader->th_ack) - 1) != pstIpHeader->ip_src.s_addr)
    {
        printf("Recv seq %u %u %u\n", pstTcpHeader->th_ack, ntohl(pstTcpHeader->th_ack), ntohl(pstIpHeader->ip_src.s_addr));
        return 4;
    }
//
//    printf("[scanner] Recv from IP %d.%d.%d.%d:%d\n",
//           (pstIpHeader->ip_src.s_addr) & 0xff,
//           (pstIpHeader->ip_src.s_addr >> 8) & 0xff,
//           (pstIpHeader->ip_src.s_addr >> 16) & 0xff,
//           (pstIpHeader->ip_src.s_addr >> 24) & 0xff,
//           ntohs(pstTcpHeader->th_sport)
//    );

    sprintf(acResult,"%d.%d.%d.%d:%d\n",
            (pstIpHeader->ip_src.s_addr) & 0xff,
            (pstIpHeader->ip_src.s_addr >> 8) & 0xff,
            (pstIpHeader->ip_src.s_addr >> 16) & 0xff,
            (pstIpHeader->ip_src.s_addr >> 24) & 0xff,
            ntohs(pstTcpHeader->th_sport));

    strcat(g_stSCNConfig.pcDataArray, acResult);

    usefulPacket += 1;

    if (usefulPacket % 100 == 0)
    {
        printf("[scanner] Sent %d packet, Received %d packet, %d userful", SentPacket, RecvPacket, usefulPacket);
    }

    return 0;
}

void *SCN_RecvPacket(void *ignore) {

    while (g_stSCNConfig.uiIfSent) {
        SCN_RecvPerPacket();
    }

    return NULL;
}

void *SCN_SentPacket(void *ignore) {

    while (g_stSCNConfig.uiIfSent) {
        SCN_SentPerPacket(scanner_rawpkt);
        usleep(g_stSCNConfig.uiSentInterval);
    }

    return NULL;
}

void SCN_Process(void) {
    int i;

    rand_init();
    LOCAL_ADDR = util_local_addr();

    // Set up raw socket scanning and payload
    if ((g_stSCNConfig.iRawSocket = socket(AF_INET, SOCK_RAW, IPPROTO_TCP)) == -1) {
        printf("[scanner] Failed to initialize raw socket, cannot scan errno= %d\n", errno);
        exit(0);
    }



    //fcntl(g_stSCNConfig.iRawSocket, F_SETFL, O_NONBLOCK | fcntl(g_stSCNConfig.iRawSocket, F_GETFL, 0));

    i = 1;
    if (setsockopt(g_stSCNConfig.iRawSocket, IPPROTO_IP, IP_HDRINCL, &i, sizeof(i)) != 0) {
        printf("[scanner] Failed to set IP_HDRINCL, cannot scan\n");
        close(g_stSCNConfig.iRawSocket);
        exit(0);
    }

    SCN_SetupHeader(scanner_rawpkt);

    pthread_t thdSentPacket;
    pthread_create(&thdSentPacket, NULL, (&SCN_SentPacket), NULL);

    //sleep(10);
    pthread_t thdRecvPacket;
    pthread_create(&thdRecvPacket, NULL, &SCN_RecvPacket, NULL);
}

int SCN_InitScanner(unsigned int uiSentInterval, unsigned int uiDstPortCount, unsigned int *pauiDstPorts) {
    int iLoop;

    if ((uiDstPortCount > 10) || (NULL == pauiDstPorts)) {
        printf("SCN_InitScanner param error, uiDstPortCount = %u, pauiDstPorts = %u", uiDstPortCount, pauiDstPorts);
        return -1;
    }

    g_stSCNConfig.uiIfSent = 0;
    g_stSCNConfig.uiDstPortCount = uiDstPortCount;
    g_stSCNConfig.uiSentInterval = uiSentInterval;
    g_stSCNConfig.iRawSocket = 0;
    g_stSCNConfig.uiScannerSrcPort = 0;

    for (iLoop = 0; iLoop < uiDstPortCount; iLoop++) {
        g_stSCNConfig.auiDstPorts[iLoop] = pauiDstPorts[iLoop];
    }

    g_stSCNConfig.pcDataArray = (char *)malloc(1000000);
    memset(g_stSCNConfig.pcDataArray, 0, 1000000);

    g_stSCNConfig.uiDataLength = 0;

    return 0;
}

void SCN_StartScanner() {

    memset(g_stSCNConfig.pcDataArray, 0, 1000000);


    g_stSCNConfig.uiIfSent = 1;
    SCN_Process();
}

char *SCN_StopScanner(void) {

    g_stSCNConfig.uiIfSent = 0;

    printf("[scanner] Sent End Sent %d packet, Received %d packet, %d userful\n", SentPacket, RecvPacket, usefulPacket);

    close(g_stSCNConfig.iRawSocket);

    return g_stSCNConfig.pcDataArray;
}