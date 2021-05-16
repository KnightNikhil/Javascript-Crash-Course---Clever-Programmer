// SOUNDS
let hit_sound = new Audio("E:/Javascript/Black jack/static/sounds/card.wav")
let win_sound = new Audio("E:/Javascript/Black jack/static/sounds/win_sound.mp3")
let lose_sound = new Audio("E:/Javascript/Black jack/static/sounds/lose_sound.mp3")



// VARIABLES
card_images = ['2','3','4','5','6','7','8','9','10','J','Q', 'K', 'A']
card_values = {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10, 'K':10, 'A':[1,11] }

user = {
    'you':{'card_box': "#your_box", 'score_id': "#your_score", 'score':0},
    'bot': {'card_box': "#bot_box", 'score_id': '#bot_score', 'score':0}
}

game_score = {
    'wins':0,
    'losses' :0,
    'tied' : 0
}

button_mgmt= {
    'hit_btn': true,
    'stand_btn': false,
    'deal_btn': false

}

// BUTTON SPECIFICATIONS
document.querySelector('#hit_button').addEventListener('click', run_hit_button)
document.querySelector('#stand_button').addEventListener('click', run_stand_button)
document.querySelector('#deal_button').addEventListener('click', run_deal_button)



// MAIN FUNCTIONS
function run_hit_button(){
    if (button_mgmt['hit_btn']){
        if (user['you']['score'] <=21){

            card_chosen = choose_random_card()
            show_card('you', card_chosen)
            change_score('you',card_chosen)}

        button_mgmt['stand_btn'] = true
    }
    

}

async function run_stand_button(){

    if (button_mgmt['stand_btn']){
        while(user['bot']['score'] <16){

            card_chosen = choose_random_card()
            show_card('bot', card_chosen)
            change_score('bot', card_chosen)
            await sleep(1000)
        }
        who_won()
        update_game_score()
        
        
        button_mgmt['hit_btn'] = false
        button_mgmt['deal_btn'] = true
    }
    
}

function run_deal_button(){
    if (button_mgmt['deal_btn']){
        reset_score()
        button_mgmt['hit_btn'] = true
    }
    
}



// SUB FUNCTIONS

//hit button

function choose_random_card(){
    return card_images[Math.floor(Math.random() * card_images.length)]
}

function show_card(player, card){
    card_image= document.createElement('img')
    card_image.src= `static/images/${card}.png`
    document.querySelector(user[player]['card_box']).appendChild(card_image)
    hit_sound.play()
}

function change_score(player,card){
    current_score = user[player]['score']
    if (card==='A'){
        if (current_score+11 <= 21){
            current_score+=11
        }
        else {
            current_score+=1
        }
    }else{
        current_score+=card_values[card]
    }
    user[player]['score']=current_score
    if (current_score<=21){
        document.querySelector(user[player]['score_id']).textContent = current_score
    }
    else{
        document.querySelector(user[player]['score_id']).textContent = "BUSTED!!"
        document.querySelector(user[player]['score_id']).style.color = "red"
    }

}
    

// deal button

function reset_score(){
    user['you']['score'] =0
    user['bot']['score'] =0
    document.querySelector(user['you']['score_id']).style.color = "white"
    document.querySelector(user['bot']['score_id']).style.color = "white"
    document.querySelector(user['you']['score_id']).textContent = 0
    document.querySelector(user['bot']['score_id']).textContent = 0

    your_box_img = document.querySelector('#your_box').querySelectorAll("img")
    bot_box_img = document.querySelector('#bot_box').querySelectorAll("img")
    for (let i=0; i<your_box_img.length;i++){
        your_box_img[i].remove()
    }
    for (let i=0; i<bot_box_img.length;i++){
        bot_box_img[i].remove()
    }
    document.querySelector("#instruction").textContent= "Let's play!"
    document.querySelector("#instruction").style.color = "black"


}



// stand button

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

function who_won(){
    ur_sc = user['you']['score']
    bot_sc = user['bot']['score']
    if (ur_sc <22 && bot_sc<22){
        if (ur_sc > bot_sc){
            game_score['wins']+=1
            document.querySelector("#instruction").textContent= "YOU WON!!"
            document.querySelector("#instruction").style.color = "green"
            win_sound.play()

        }
        else if (ur_sc===bot_sc){
            game_score['tied']+=1
            document.querySelector("#instruction").textContent= "YOU DREW!!"
            document.querySelector("#instruction").style.color = "yellow"

        }
        else if (ur_sc<bot_sc){
            game_score['losses']+=1
            document.querySelector("#instruction").textContent= "YOU LOST!!"
            document.querySelector("#instruction").style.color = "red"
            lose_sound.play()

        }
    }
    else if (ur_sc>22 && bot_sc<22){
        game_score['losses']+=1
        document.querySelector("#instruction").textContent= "YOU LOST!!"
        document.querySelector("#instruction").style.color = "red"
        lose_sound.play()
    }
    else if (ur_sc<22 && bot_sc>22){
        game_score['wins']+=1
        document.querySelector("#instruction").textContent= "YOU WON!!"
        document.querySelector("#instruction").style.color = "green"
        win_sound.play()
    }

    else if (ur_sc<22 === bot_sc>22){
        game_score['tied']+=1
        document.querySelector("#instruction").textContent= "YOU DREW!!"
        document.querySelector("#instruction").style.color = "yellow"
    }
    
}

function update_game_score(){
    document.querySelector("#your_wins").textContent = game_score['wins']
    document.querySelector("#your_losses").textContent = game_score['losses']
    document.querySelector("#your_ties").textContent = game_score['tied']
}