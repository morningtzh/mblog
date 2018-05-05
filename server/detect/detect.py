import socket
import multiprocessing


class Detect(multiprocessing.Process):

    def __init__(self):
        multiprocessing.Process.__init__(self)
        self.socket = None
        self.socket_init()

    def socket_init(self):

        self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.socket.bind(('0.0.0.0', 7566))

    def run(self):

        while True:
            data, addr = self.socket.recvfrom(2048)
            print(data, addr)


