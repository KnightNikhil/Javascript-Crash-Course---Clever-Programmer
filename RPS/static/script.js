function rps(humanch){
    humanch=humanch.id
    compch = bot_choice()
    winner = who_won(humanch, compch)
    message = after_message(winner)
    console.log(winner)
    console.log(message)
    result_print_frontend(humanch, message, compch)
}

function bot_choice(){
    optndict = ["rock", "paper", "scissor"]
    return optndict[Math.floor(Math.random() * 3)]
}

function who_won(humanch, compch){
    poss = {
        "rock" : {"rock": 0.5, "paper":0, "scissor":1},
        "paper" : {"rock": 1, "paper":0.5, "scissor":0},
        "scissor" : {"rock": 0, "paper":1, "scissor":0.5}
    }
    humanpoint = poss[humanch][compch]
    comppoint = poss[compch][humanch]
    return [humanpoint, comppoint]
}

function after_message(winner){
    if (winner[0]===0){
        return {'message': "You Lost!!", 'color': "red"}
    }
    else if (winner[0]===0.5){
        return {'message': "You Tied!!", 'color': "yellow"}
    }
    if (winner[0]===1){
        return {'message': "You Won!!", 'color': "green"}
    }
}

function result_print_frontend(humanch, message, compch){
    img_src = {
        "rock":document.getElementById("rock").src,
        "paper": document.getElementById("paper").src,
        "scissor": document.getElementById("scissor").src
    }
    document.getElementById("rock").remove()
    document.getElementById("paper").remove()
    document.getElementById("scissor").remove()
    
    var humnandiv = document.createElement("div")
    var msgdiv = document.createElement("div")
    var compdiv = document.createElement("div")

    humnandiv.innerHTML = "<img src='" + img_src[humanch] + "' height=150px width=150px style= 'box-shadow: 0px 10px 50px rgb(0,0,255);'>" 
    msgdiv.innerHTML = "<h1 style='color:" + message['color'] + "; font-size: 60px; padding: 30px; '>" + message['message'] + "</h1>"
    compdiv.innerHTML = "<img src='" + img_src[compch] + "' height=150px width=150px style= 'box-shadow: 0px 10px 50px rgb(255,0,0);'>" 

    document.getElementById('flex-box-container').appendChild(humnandiv)
    document.getElementById('flex-box-container').appendChild(msgdiv)
    document.getElementById('flex-box-container').appendChild(compdiv)

}