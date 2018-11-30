#!/usr/bin/python

import sys

def trans_size(chunk, old, new, transfn):
  if old in chunk:
    boundary = chunk.index(old)
    num = chunk[0 : boundary]
    if not num[-1].isdigit():
      return chunk
    leftover = chunk[boundary : ].replace(old, new)
    return transfn(num) + leftover
  return chunk

def replace_rem(word):
  return trans_size(word, 'rem', 'px', lambda x: str(float(x)*10))

def replace_px(word):
  return trans_size(word, 'px', 'rem', lambda x: str(float(x)/10.0))

def denominate(line, by):
  words = line.split(' ')
  words = map(replace_px, words)
  processed = map(lambda word: trans_size(word, 'rem', 'rem', lambda x: str(float(x)*by)), words)
  return ' '.join(processed)

def wrap_rem(word):
  if 'px' in word:
    num = word[0 : word.index('px')]
    leftover = word[word.index('px') : ].replace('px', ')')
    return 'rem(' + num + leftover
  return word

def process(line):
  words = line.split(' ')
  pxed = map(replace_rem, words)
  wrapped = map(wrap_rem, pxed)
  return ' '.join(wrapped)
  
def denominate_rem(fname):
  lines = open(fname).readlines();
  if 'processed-version: 1.0' in lines[0]:
    return ''.join(lines)
  return '/* processed-version: 1.0 */\n' +  ''.join(map(lambda line: denominate(line, 0.1), lines))

def get_files(directory):
  f = []
  for (dirpath, dirnames, filenames) in walk(directory):
    f.extend([ dirpath + fname for fname in filenames if '.css' in fname])
  return f

def write(fname, text):
  f = open(fname, 'w')
  f.write(text)
  f.close()

if __name__ == '__main__':
  from os import walk
  # fname = '../css/components/main-page.css'
  if len(sys.argv) < 2:
    exit(0)
  directory = sys.argv[1]
  print directory
  files = get_files(directory)
  for f in files:
    print f
    result = denominate_rem(f)
    write(f, result)

