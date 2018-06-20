cmake_minimum_required(VERSION 3.9)
project(untitled)

set(CMAKE_CXX_STANDARD 11)

add_executable(untitled rand.c util.c checksum.c tmp2.c scanner.c main.c session.cpp)