class Point():
    def __init__(self, input_x, input_y):
        self.x = input_x
        self.y = input_y

p = Point(1, 5)

print("Point: ", p.x)



class Flight():
    def __init__(self, capacity):
        self.capacity = capacity
        self.passengers = []
    
    def add_passenger(self, name):
        # same of self.open_seats() == 0
        if not self.open_seats():
            return False
        
        self.passengers.append(name)
        return True

    def open_seats(self):
        return self.capacity - len(self.passengers)


flight = Flight(3)
state = flight.add_passenger("Pa")
print(state)
state = flight.add_passenger("Pb")
print(state)
state = flight.add_passenger("Pc")
print(state)
state = flight.add_passenger("Pd")
print(state)
state = flight.add_passenger("Pe")
print(state)

print("Passengers: ", flight.passengers)