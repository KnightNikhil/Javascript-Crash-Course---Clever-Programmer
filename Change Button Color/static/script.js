var button_classes = document.getElementsByTagName("button")
var orignal_colors = []
for(let i=0; i<button_classes.length ; i++ ){
    orignal_colors.push(button_classes[i].classList[1])
}


function remove_colors(){
    for(let i=0; i<button_classes.length ; i++ ){
        button_classes[i].classList.remove(button_classes[i].classList[1])
    }
}

function blue_buttons(){
    remove_colors()
    for(let i=0; i<button_classes.length ; i++ ){
        button_classes[i].classList.add("btn-primary")
    }

}
function yellow_buttons(){
    remove_colors()
    for(let i=0; i<button_classes.length ; i++ ){
        button_classes[i].classList.add("btn-warning")
    }

}
function reset_buttons(){
    remove_colors()
    for(let i=0; i<button_classes.length ; i++ ){
        button_classes[i].classList.add(orignal_colors[i])
    }

}

function random_colors(){
    choice= [yellow_buttons(), blue_buttons()]
    choice[Math.floor(Math.random()*2)]
}


function change_button_color(chosen_color){
    color= chosen_color.value
    switch(color){
        case "blue": blue_buttons();
        break;
        case "yellow": yellow_buttons();
        break; 
        case "random": random_colors();
        break;        
        case "reset": reset_buttons();
        break;
        default:
            reset_buttons();
            break;
    }
}