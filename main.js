song = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song1status = "";
song2status = "";
scoreRightWrist = 0;


function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO)
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initilized');
}

function draw() {
    image(video, 0,0, 600, 500);

    fill("blue")
    stroke("white")

    song1status = song.isPlaying()
    song2status = song2.isPlaying()

    if (scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY, 20)
        song2.stop();
        if (song1status == false){
            song.play()
            document.getElementById("song_name").innerHTML = "playing PeterPan"
        }
    }

    if (scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY, 20)
        song1.stop();
        if (song2status == false){
            song2.play()
            document.getElementById("song_name").innerHTML = "playing PeterPan"
        }
    }


}

function song_name()
{
    song.play();
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = "  + scoreRightWrist +"scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX +"leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = "+ rightWristY);
    }
}