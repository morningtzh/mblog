import numpy as np

#from __future__ import print_function
from matplotlib import *
import matplotlib

from keras.models import Sequential, load_model
from keras.layers import Dense, LSTM, Dropout

#import matplotlib.pyplot as plt

# import seaborn as sns

# %matplotlib inline

dataset = np.cos(np.arange(1000) * (20 * np.pi / 1000))
#plt.plot(y=dataset, title='cos')


# convert an array of values into a dataset matrix
def create_dataset(dataset, look_back=1):
    dataX, dataY = [], []
    for i in range(len(dataset) - look_back):
        dataX.append(dataset[i:(i + look_back)])
        dataY.append(dataset[i + look_back])
    return np.array(dataX), np.array(dataY)


def train1():
    batch_size = 1

    model = Sequential()
    model.add(LSTM(32, input_shape=(20, 1)))
    model.add(Dropout(0.2))
    model.add(Dense(1))

    model.compile(loss='mse', optimizer='adam')
    model.fit(trainX, trainY, batch_size=batch_size, epochs=30, verbose=2)

    return model


def train2():
    # create and fit the LSTM network
    batch_size = 1
    model2 = Sequential()
    model2.add(LSTM(32, batch_input_shape=(batch_size, 20, 1), stateful=True))
    model2.add(Dropout(0.2))
    model2.add(Dense(1))
    model2.compile(loss='mse', optimizer='adam')
    for i in range(30):
        model2.fit(trainX, trainY, epochs=1, batch_size=batch_size,  shuffle=False)
        model2.reset_states()


def test1(model):
    x = np.vstack((trainX[-1][1:], (trainY[-1])))
    preds = []
    pred_num = 500
    for i in np.arange(pred_num):
        pred = model.predict(x.reshape((1, -1, 1)), batch_size=1)
        preds.append(pred.squeeze())
        x = np.vstack((x[1:], pred))

    # print(preds[:20])
    # print(np.array(preds).shape)
    plt.figure(figsize=(12, 5))
    plt.plot(np.arange(pred_num), np.array(preds), 'r', label='predctions')
    cos_y = (np.cos(np.arange(pred_num) * (20 * np.pi / 1000)) + 1) / 2.
    plt.plot(np.arange(pred_num), cos_y, label='origin')
    plt.legend()
    plt.show()


if __name__ == '__main__':
    x, y = create_dataset(dataset, look_back=3)
    print(x.shape)
    print(y.shape)
    print(x[:5])
    print(y[:5])

    look_back = 20

    # 归一化，y值域为(0,1)
    dataset = (dataset + 1) / 2.

    # split into train and test sets
    train_size = int(len(dataset) * 0.8)
    test_size = len(dataset) - train_size
    train, test = dataset[:train_size], dataset[train_size:]

    trainX, trainY = create_dataset(train, look_back)
    testX, testY = create_dataset(test, look_back)

    trainX = np.reshape(trainX, (trainX.shape[0], trainX.shape[1], 1))
    testX = np.reshape(testX, (testX.shape[0], testX.shape[1], 1))

    print('trainX.shape = ', trainX.shape)
    print('testX.shape = ', testX.shape)
    print('trainY.shape = ', trainY.shape)
    print('testY.shape = ', testY.shape)

    test1(train1())
