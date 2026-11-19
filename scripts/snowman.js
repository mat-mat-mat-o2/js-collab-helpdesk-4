export function initSnowman(){
    let img = document.getElementById("Snowman");

    function lightSnowman() 
    {
        if (img.src.includes("images/Snowman.png")) 
            {
                const snowmanSound=new Audio('./sounds/lighting.mp3');
                snowmanSound.play();
            img.src = "images/Snowman_light.png";

        } else {
            const snowmanSound=new Audio('./sounds/no_lighting.mp3');
                snowmanSound.play();
            img.src = "images/Snowman.png";
        }
    }

    img.addEventListener("click", function(event) {
        lightSnowman();
    });
}