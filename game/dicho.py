def dichotomie(value,array):
    """effectu recherche dichotomique dans le tableau"""
    range = (len(array)-1) // 2
    focus = array[range]
    index = 0
    while focus != value:
        index += 1
        if focus > value:
            range -= (( range ) - 1 ) // 2
        else :
            range += (((len(array)-1) - range ) + 1 ) // 2
        focus = array[range]
    return [range,index]

def genArray(len):
    result = []
    value = 0
    while value < len:
        value += 2
        result.append(value)
    print(result)
    return result

longueurTableau = int(input("longueur tableau :"))
result = dichotomie(12,genArray(longueurTableau))
print( "la valeur est a l'index : ",result[0])
print( "ca a pris : ",result[1], "essaies")
