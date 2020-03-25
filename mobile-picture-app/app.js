new Vue({
    el: "#vue-app",
    data() {
        return {
            position: {
                latitude: null,
                longitude: null
            }
        };
    },
    mounted() {
        var vm = this;
        if (!("mediaDevices" in navigator)) {
            navigator.mediaDevices = {};
        }
        if (!("getUserMedia" in navigator.mediaDevices)) {
            navigator.mediaDevices.getUserMedia = function(constraints) {
                var getUserMedia =
                    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                if (!getUserMedia) {
                    return Promise.reject(
                        new Error("getUserMedia is not working!")
                    );
                }
                return new Promise(function(resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            };
        }
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(function(stream) {
                vm.$refs.camera.srcObject = stream;
                vm.$refs.canvasElement.style.display = "none";
            })
            .catch(function(err) {
                vm.$refs.pictureTakenHere.style.display = "block";
                console.log(err);
            });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(vm.sharePosition);
        }
    },
   
    methods: {
        sharePosition(position) {
            try{
                var vm = this;
                vm.position.latitude = position.coords.latitude;
                vm.position.longitude = position.coords.longitude;
            } catch(err){
                console.log(err);
            }
        },
        takeAPicture() {
            var vm = this;
            vm.$refs.canvasElement.style.display = "block";
            vm.$refs.camera.style.display = "none";
            const canvas = document.getElementById("canvas");
            var context = vm.$refs.canvasElement.getContext("2d");

            context.drawImage(
                vm.$refs.camera,
                0,
                0,
                canvas.width,
                vm.$refs.camera.videoHeight /
                    (vm.$refs.camera.videoWidth / canvas.height)
            );
            var imgSrc = canvas.toDataURL("image/png");
            console.log("happy img:", imgSrc);
            vm.$refs.camera.srcObject.getVideoTracks().forEach(function(track) {
                track.stop();
            });

            if(localStorage){
                const currentDate = new Date();
                const image = {
                    date: currentDate.toISOString(),
                    img: imgSrc, 
                    position:vm.position
                };

                var imageList;
                if(localStorage.imageList){
                    imageList = JSON.parse(localStorage.imageList);
                } else {
                    imageList = [];
                }
                console.log(localStorage.imageList);
                imageList.push(JSON.stringify(image));
                localStorage.setItem('imageList', imageList);
            }
        }
    }});
