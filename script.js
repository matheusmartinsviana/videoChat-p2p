var peer = new Peer(); // create a instance with peerJs+

let localStream; // local video
const inputLocalPeerId = document.getElementById("localPeerId");
const inputRemotePeerId = document.getElementById("remotePeerId");
const btnCall = document.getElementById("btn-call");

navigator.mediaDevices.getUserMedia({ video: true }) //ask if allow the user camera
    .then(stream => {
        localStream = stream; // take local video
        const videoElement = document.getElementById("localVideo"); // take local video and transform to your source
        videoElement.srcObject = localStream;
        videoElement.onloadedmetadata = () => videoElement.play(); // play the local video when metadata loaded
    });

peer.on("open", id => { // event when the connection with peer is open, and receive the id
    inputLocalPeerId.value = id; // id from localPeer in the localPeer value
});

btnCall.addEventListener("click", function () { // add a listener to call button
    const remotePeerId = inputRemotePeerId.value; //get id from remotePeer from input
    const call = peer.call(remotePeerId, localStream);
    call.on("stream", stream => {
        const remoteVideo = document.getElementById("remoteVideo");
        remoteVideo.srcObject = stream;
        remoteVideo.onloadedmetadata = () => remoteVideo.play(); // show the remoteVideo when metadata loaded
    });
});

peer.on("call", call => { // listener to when reiceive the call
    call.answer(localStream); // give the localStream us answer
    call.on("stream", stream => { // take the remoteVideo from another peerId
        const remoteVideo = document.getElementById("remoteVideo"); // define the stream us a sourceof video element and play
        remoteVideo.srcObject = stream;
        remoteVideo.onloadedmetadata = () => remoteVideo.play();
    });
});
