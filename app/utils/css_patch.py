lines = open('../css/components/business-card.css').readlines();

def replace_rem(word):
  if 'rem' in word:
    num = word[0 : word.index('rem')]
    leftover = word[word.index('rem') : ].replace('rem', 'px')
    return str(float(num) * 10 ) + leftover
  return word

def wrap_rem(word):
  if 'px' in word:
    num = word[0 : word.index('px')]
    leftover = word[word.index('px') : ].replace('px', ')')
    return 'rem(' + num + leftover
  return word

def process(line):
  words = line.split(' ');
  pxed = map(replace_rem, words)
  wrapped = map(wrap_rem, pxed)
  return ' '.join(wrapped);
  
newlines = map(process, lines)
print ''.join(newlines)

