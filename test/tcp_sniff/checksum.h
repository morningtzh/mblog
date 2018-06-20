#pragma once

#include <stdint.h>
#include "header.h"

uint16_t checksum_generic(uint16_t *, uint32_t);
uint16_t checksum_tcpudp(struct ip *, void *, uint16_t, int);
