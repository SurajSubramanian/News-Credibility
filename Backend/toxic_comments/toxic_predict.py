# Trained in
# https://colab.research.google.com/drive/1wCTKdfJGofYhDJCGQcwfdeDv7jKYP0Kq?usp=sharing

import numpy as np 
import pandas as pd
import pickle
from tensorflow import keras
from keras.preprocessing import sequence
max_features = 20000
maxlen = 100 
list_classes = ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]
tokenizer = pickle.load(open('toxic_comments/tokernizer.pickle', 'rb')) 
model = keras.models.load_model('toxic_comments/model') 

def predict(comment):
#    comment = "=Tony Sidaway is obviously a fistfuckee. He loves an arm up his ass."
    data = pd.DataFrame({'comment' : comment}, index = [0])
    data = data["comment"].fillna("CVxTz").values
    tokenized = tokenizer.texts_to_sequences(data)
    X = sequence.pad_sequences(tokenized, maxlen=maxlen)
    y = model.predict(X).reshape(-1)
    classes = [list_classes[i] for i,y_elem in enumerate(list(y)) if y_elem > 0.3]

    return '|'.join(classes)
