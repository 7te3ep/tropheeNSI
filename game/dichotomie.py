def dichotomie(value,array):
    """effectu recherche dichotomique dans le tableau"""
    range = (len(array)-1) // 2
    focus = array[range]
    index = 0
    while focus != value:
        index += 1
        if focus > value:
            range = range // 2
        else :
            range += (((len(array)-1) - range ) +1 ) // 2
        focus = array[range]
    return [range,index]

result = dichotomie(7,[5,7,8,9,11,14,17,18])
print( "la valeur est a l'index : ",result[0])
print( "ca a pris : ",result[1], "essaies")
