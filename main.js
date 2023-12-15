song_1 ="";
song_2 ="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
rightWristScore = 0;
song1_status = "";
song2_status = "";

function preload(){
    song_1 = loadSound("song1.mp3");
    song_2 = loadSound("song2.mp3");
}
function setup() {
    canvas = createCanvas(550, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("poseNet model is loaded");
}
function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" +leftWristX+ "leftWristY ="+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" +rightWristX + "rightWristY =" + rightWristY);
    };
}
function draw(){
    image(video, 0, 0, 550, 420);
    fill("blue");
    stroke("pink");
    song1_status = song_1.isPlaying();
    song2_status = song_2.isPlaying();
    if (leftWristScore > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song_2.stop();

        if(song1_status == "false")
        {
            song_1.play()
            document.getElementById("songname").innerHTML = "Peter Pan Theme Song is playing";
        }
    }
    if (rightWristScore > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song_1.stop()

        if(song2_status == "false")
        {
            song2.play()
            document.getElementById("songname").innerHTML = "Harry Potter Theme Song is playing";
        }
    }
}

