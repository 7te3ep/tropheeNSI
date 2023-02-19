import math
from PIL import Image, ImageDraw
  
w, h = 100, 100
shape = [(00, 00), (w , h)]
# creating new Image object
img = Image.new("RGBA", (100, 100))
  
# create rectangle image
img2 = ImageDraw.Draw(img)
img2.rectangle(shape, fill ="grey")

img3 = ImageDraw.Draw(img)
img3.rectangle([(40, 0), (60 , 20)], fill ="rgba(0,0,0,0)")
img3.rectangle([(20, 40), (40 , 60)], fill ="rgb(0,0,0)")
img3.rectangle([(60, 40), (80 , 60)], fill ="rgb(0,0,0)")
img3.rectangle([(41, 61), (59 , 79)], fill ="pink")

img = img.save("geeks.jpg")