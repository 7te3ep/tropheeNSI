import random
team1 = []
players = ["sim","evan","leo","erwa"]
for i in range(2):
    num = random.randint(0,len(players)-1)
    team1.append(players[num])
    players.pop(num)
print(team1)
