function main()
{
    var hello = 'Hello, World!'
    console.log(hello)

    var h = {
        name: 'Hello',
        say: function () {
            console.log(this.name)
        }
    }
    
    h.say()
}

//test comment

main()
