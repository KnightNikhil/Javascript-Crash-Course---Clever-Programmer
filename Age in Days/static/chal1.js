function convt_age2days(){
    if (document.getElementById("ageindays")){
        document.getElementById("ageindays").remove() }

    var birthyear = prompt("What's your birthyear brother?")
    var age2days = (2021 - birthyear) *365
    var h1 = document.createElement('h1')
    var textans = document.createTextNode("You are "+ age2days+ " days old!!")
    h1.setAttribute('id', 'ageindays')
    h1.appendChild(textans)
    document.getElementById('flex-box-result').appendChild(h1)
    
}

function reset(){
    document.getElementById("ageindays").remove()
}