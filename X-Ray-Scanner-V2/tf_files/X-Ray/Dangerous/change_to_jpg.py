from PIL import Image
import os, sys

count = 0

for filename in os.listdir("."): 
  if(filename[-3:] == "png"):
    count += 1
    im = Image.open(filename)
    rgb_im = im.convert('RGB')
    new_file = filename[:-3]
    new_file += 'jpg'
    rgb_im.save(new_file)
    os.remove(filename)
    print ('The total count is :' + str(count))  

