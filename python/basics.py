# Print
h = 'textindemiddle'
print(f"Hello is a {h} text")


### ### ###     List     ### ### ###       = []
# could append() or sort() 
mylist = ["Element", "Another", "Next", "Alba"]

mylist.append("Final one")
mylist.sort()

print("Print list: ", len(mylist), mylist)



### ### ###      Set     ### ### ###        
# no element appears more than once

myset = set()

myset.add("element1")
myset.add("element2")
myset.add("element3")
myset.add("element2")

print("Print set : ", len(myset), myset)


### ### ###     Tuple     ### ### ###


### ### ###      Dict     ### ### ###       = {}
mydict = {"Key1": "Content", "Key2": "Content", "Key3": "Content"}

mydict["Key3"] = "Zee"
mydict["Key99"] = "Another"

print("Print dict: ", len(mydict), mydict)


print("____  ____")
print(" ")

### ### ###      Decorators     ### ### ###
def announce(f):
    def wrapper():
        print("--- Before something happen...")
        f()
        print("--- After!")
    return wrapper

@announce
def hello():
    print("- the function hello")


hello()