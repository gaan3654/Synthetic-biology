# -*- coding: utf-8 -*-
"""
Created on Sun Dec  1 10:02:07 2019

@author: ganuz
"""

import numpy as np
import matplotlib.pyplot as plt

loop_count = 5 # how many runs

t_init = 0
t_end = 2
N = 1000 # Partitioning
dt = float(t_end - t_init) / N
y_init = 0

sigma = 1.
const_mu = 10
tau = 0.05

def mu(y):
    #Quite static results
    #return tau * (const_mu - y)
    return (const_mu - y)

def dW(delta_t):
    return np.random.normal(scale = np.sqrt(delta_t))


#sigma_bis = 0.06
# Very noisy results
sigma_bis = sigma * np.sqrt(2. / tau)

ts    = np.arange(t_init, t_end, dt)
ys    = np.zeros(N)

ys[0] = y_init


for _ in range(loop_count):
    for i in range(1, ts.size):
        t = (i-1) * dt
        y = ys[i-1]
        ys[i] = y + mu(y) * dt + sigma_bis * dW(dt)
    plt.plot(ts, ys)

plt.show()










