
#pragma once

#ifndef __HEADER_H__
#define __HEADER_H__

struct ip {
#ifdef _IP_VHL
    u_char	ip_vhl;			/* version << 4 | header length >> 2 */
#else
#if BYTE_ORDER == LITTLE_ENDIAN
    u_int	ip_hl:4,		/* header length */
            ip_v:4;			/* version */
#endif
#if BYTE_ORDER == BIG_ENDIAN
    u_int	ip_v:4,			/* version */
            ip_hl:4;		/* header length */
#endif
#endif /* not _IP_VHL */
    u_char	ip_tos;			/* type of service */
    u_short	ip_len;			/* total length */
    u_short	ip_id;			/* identification */
    u_short	ip_off;			/* fragment offset field */
#define	IP_RF 0x8000			/* reserved fragment flag */
#define	IP_DF 0x4000			/* dont fragment flag */
#define	IP_MF 0x2000			/* more fragments flag */
#define	IP_OFFMASK 0x1fff		/* mask for fragmenting bits */
    u_char	ip_ttl;			/* time to live */
    u_char	ip_p;			/* protocol */
    u_short	ip_sum;			/* checksum */
    struct	in_addr ip_src,ip_dst;	/* source and dest address */
};

typedef	__uint32_t tcp_seq;

/*
 * TCP header.
 * Per RFC 793, September, 1981.
 */
struct tcphdr {
    unsigned short	th_sport;	/* source port */
    unsigned short	th_dport;	/* destination port */
    tcp_seq	th_seq;			/* sequence number */
    tcp_seq	th_ack;			/* acknowledgement number */
#if __BYTE_ORDER == __LITTLE_ENDIAN
    unsigned int	th_x2:4,	/* (unused) */
            th_off:4;	/* data offset */
#endif
#if __BYTE_ORDER == __BIG_ENDIAN
    unsigned int	th_off:4,	/* data offset */
            th_x2:4;	/* (unused) */
#endif
    unsigned char	th_flags;
#define	TH_FIN	0x01
#define	TH_SYN	0x02
#define	TH_RST	0x04
#define	TH_PUSH	0x08
#define	TH_ACK	0x10
#define	TH_URG	0x20
#define	TH_ECE	0x40
#define	TH_CWR	0x80
#define	TH_FLAGS	(TH_FIN|TH_SYN|TH_RST|TH_ACK|TH_URG|TH_ECE|TH_CWR)

    unsigned short	th_win;		/* window */
    unsigned short	th_sum;		/* checksum */
    unsigned short	th_urp;		/* urgent pointer */
};

#endif