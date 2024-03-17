var peer = new Peer();

let localStream;
const inputLocalPeerId = document.getElementById("localPeerId");
const inputRemotePeerId = document.getElementById("remotePeerId");
const btnCall = document.getElementById("btn-call");

navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
    localStream = stream;
    const videoElement = document.getElementById("localVideo");
    videoElement.srcObject = localStream;
    videoElement.onloadedmetadata = () => videoElement.play();
});

peer.on("open", id => {
    inputLocalPeerId.value = id; // Atribui o ID do peer local ao campo de input
});

btnCall.addEventListener("click", function() {
    const remotePeerId = inputRemotePeerId.value;
    const call = peer.call(remotePeerId, localStream);
    call.on("stream", stream => {
        const remoteVideo = document.getElementById("remoteVideo");
        remoteVideo.srcObject = stream;
        remoteVideo.onloadedmetadata = () => remoteVideo.play();
    });
});

peer.on("call", call => {
    call.answer(localStream);
    call.on("stream", stream => {
        const remoteVideo = document.getElementById("remoteVideo");
        remoteVideo.srcObject = stream;
        remoteVideo.onloadedmetadata = () => remoteVideo.play();
    });
});
