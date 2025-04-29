import nltk
import numpy as np
from transformers import DistilBertTokenizer
from nltk.stem.porter import PorterStemmer

#nltk.download('punkt_tab')

stemmer = PorterStemmer()

tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')

"""Tokanize -> lower & steming -> remove ?,! .. -> bag of words"""

def tokenize(sentence):
    return nltk.word_tokenize(sentence)


# we don't need to stem if add pre-trained model
def stem(word):
    return stemmer.stem(word.lower())

def bag_of_words(tokanized_sentence, all_words):
    tokanized_sentence = [stem(w) for w in tokanized_sentence]

    bag = np.zeros(len(all_words), dtype=np.float32)
    for idx, w in enumerate(all_words):
        if w in tokanized_sentence:
            bag[idx] = 1.0
    return bag






























## testing tokanize

"""a = "I Need to place an order"
print(a)
a = tokenize(a)
print(a)"""

## testing stemming
"""
words = ["organize", "organizers","organizing"]
stemmed_words = [stem(w) for w in words]
print(stemmed_words)
"""

## test bag of words function
"""
sentence = ["hello", "how", "are", "you"]
words = ["hi", "hello", "I", "you", "bye", "thank", "cool"]
bag = bag_of_words(sentence, words)
print(bag)
"""

