function setup(){
    canvas=createCanvas(450,450);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);


}

function draw(){
    image(video,0,0,450,450);
    fill("blue");
    stroke("black");
    circle(rightwristx,rightwristy,20);
    if(scoreleftwrist>0.2){
    if(rightwristy>0 &&rightWristy<=100){
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
    else if(rightWristy>100 && rightWristy<=200 ){
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);
    } else if(rightWristy>200 && rightWristy<=300 ){
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    } else if(rightWristy>300 && rightWristy<=400 ){
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    } else if(rightWristy>400 && rightWristy<=500 ){
        document.getElementById("speed").innerHTML="speed=2.5x";
        song.rate(2.5);
    }
  
    circle(leftwristx,leftwristy,20);
    innumberleftwristy=Number(leftwristy);
    removedecimal=floor(innumberleftwristy);
    volume=removedecimal/500;
    document.getElementById("volume").innerHTML="volume="+volume;
    song.setVolume(volume);}



}


song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;
scorerightwrist=0;


function preload(){
    song=loadSound("music.mp3");

}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);


}

function modelLoaded(){
    console.log("posenet is started");

}

function gotPoses(results){
    if(results.lenght>0){
        console.log(results);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("leftwristx="+leftwristx+"leftwristy="+leftwristy);
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("rightwristx="+rightwristx+"rightwristy="+rightwristy);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;
        console.log("score left wrist="+scoreleftwrist);
        console.log("score right wrist="+scorerightwrist);

    }
    
    
}



