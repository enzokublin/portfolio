(function() {
    Vue.component("picture-modal", {
        data: function() {
            return {
                heading: "Amazing pictures",
                pictureData: {
                    id: "",
                    url: "",
                    username: "",
                    title: "",
                    description: "",
                    created_at: ""
                },

                comments: [],
                commentPosted: {
                    comments: "",
                    user: ""
                }
            };
        },
        props: ["id"],
        template: "#zoomin",
        mounted: function() {
            console.log("component has mounted", this.id);
            var self = this;
            axios
                .get("/zoomin/" + this.id)
                .then(function(response) {
                    // location.hash = self.id;
                    // if (Object.keys(response.data.response[0]).length) {
                    self.pictureData = response.data;
                    // } else {
                    //     this.imageId = null;
                    // }
                })
                .catch(function(err) {
                    console.log("Deal with the error: ", err);
                    // self.$emit('close2')
                });
            axios
                .get("/comments/" + this.id)
                .then(function(response) {
                    self.comments = response.data;
                })
                .catch(function(err) {
                    console.log("Deal with the error: ", err);
                });
            // watch:{
            //     id: function(){
            //         if(id !='#'){
            //             this.zoomin()
            //         }
            //     }
            // }
        },
        methods: {
            commentIsPosted: function() {
                this.commentPosted.image_id = this.id;
                var pictureMe = this;
                console.log("happy comment posted: ", this.commentPosted);
                axios
                    .post("/comments/" + pictureMe.id, this.commentPosted)
                    .then(function(response) {
                        pictureMe.comments.unshift(response.data[0]);
                        pictureMe.commentPosted.comments = "";
                        pictureMe.commentPosted.user = "";
                    });
            },
            close: function() {
                this.$emit("close");
                location.hash = "";
            }
        }
    });

    new Vue({
        el: "#main",
        data: {
            imageId: location.hash.slice(1),
            heading: "My Image Board",
            images: [],
            title: "",
            pictureToUpload: {},
            username: "",
            desc: "",
            file: "",
            selectMore: true
        },
        mounted: function() {
            console.log("mounted");
            var self = this;
            axios
                .get("/images")
                .then(function(response) {
                    self.images = response.data;
                    console.log(self.images);
                })
                .catch(function(err) {
                    console.log("deal with err: ", err);
                });

            // addEventListener("hashchange", function() {
            //     self.imageId = location.hash.slice(1);
            // });
        },
        methods: {
            zoomInToThePicture: function(id) {
                this.imageId = id;
            },

            zoomOutOfThePicture: function(e) {
                this.imageId = null;
            },

            handleFileChange: function(e) {
                this.file = e.target.files[0];
            },
            getMore: function() {
                var instance = this;
                axios
                    .get(
                        "/images/more/" + this.images[this.images.length - 1].id
                    )
                    .then(function(response) {
                        if (!response.data.length) {
                            // instance.images[instance.images.length - 1].id ==
                            // response.data.lastImageId
                            instance.getMore = false;
                        }
                        instance.images = instance.images.concat(response.data);
                        // [].push.apply(instance.images, response.data);
                        // instance.getMore = false;
                    });
            },
            upload: function(e) {
                var formData = new FormData();
                console.log("Happy uploading:", formData);
                formData.append("file", this.file);
                formData.append("title", this.pictureToUpload.title);
                formData.append("desc", this.pictureToUpload.desc);
                formData.append("user", this.pictureToUpload.user);
                var picMe = this;
                axios.post("/upload", formData).then(function(response) {
                    console.log(response.data[0]);
                    picMe.images.unshift(response.data[0]);
                });
            },
            zoomIn: function(id) {
                console.log("happy click", id);
                this.imageId = id;
            }
        }
    });
})();

// getMore:function(){
//     var instance =this;
//     axios.get('/images/more/' + this.images[this.images.length -1].id, function(){
// if(!response.data.length){
//     //hide more button
//     // if the id of the last image you are showing is
// }
//
//         [].push.apply(instance.images, response.data)
//         if(instance.images[instance.images.length-1].id == response.data.lastImageId){
//             instance.hasMore = false;
//         }
//     })
// }

// <input v-model="imageToUplaod.title" name="title">
// <input v-model="imageToUplaod.desc" name="desc">
// pickPictureOut: function(e) {
//     e.target.style.backgroundColor = "#135da2";
//     e.target.style.fontcolor = "#eceff5";
// },
// softPedalPicture: function(e) {
//     e.target.style.backgroundColor = "#07357e";
// },
