def main():
	f = open('hello.txt', 'r')
	for line in f:
		print(line.rstrip())

main()