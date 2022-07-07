AFRAME.registerComponent('animation-manager', {
    schema: {
      // in seconds
      startTime: {default: 0},
    },
    init() {
      // bind the methods
      this.modelLoaded = this.modelLoaded.bind(this)
      this.setStartTime = this.setStartTime.bind(this)
      // this.getTime = this.getTime.bind(this)
      // this.initVideoID = this.initVideoID.bind(this)
      // this.sendHTTPRequest = this.sendHTTPRequest.bind(this)
      // wait until the model is ready
      this.el.addEventListener('model-loaded', this.modelLoaded)
      //this.numSearches = 0;
    },
  
    modelLoaded() {
      this.animationMixer = this.el.components['animation-mixer']
      // set the start time of the first play
      this.setStartTime();
      // set the start time on each loop
      this.el.addEventListener('animation-loop', this.setStartTime);
      // pause initially
      this.animationMixer.mixer.timeScale = 0
      // find the video by class name and assign it an ID
      //this.initVideoID();
    },
    
    /**
     * Set the frame/time that the model should begin animating at
     */
    setStartTime() {
      this.animationMixer.mixer.setTime(this.data.startTime)
    },
  
    /**
     * Remove event listeners from model
     */
    remove() {
      this.el.removeEventListener('model-loaded', this.modelLoaded)
      this.el.removeEventListener('animation-loop', this.setStartTime)
    },
  
    // /**
    //  * Locate the video element by class name then assign it an id for easier reference
    //  * Then begin getTime()
    //  */
    //  initVideoID() {
    //   const videoArr = document.getElementsByClassName('landing8-media-video')
    //   const arrLength = videoArr.length
    //   if(this.numSearches < 5) {
    //     if (arrLength === 0) {
    //       this.numSearches++
    //       setTimeout(this.initVideoID, 500)
    //       console.log('SEARCHING...')
    //     } else {
    //       videoArr[0].setAttribute('id', 'demo-video-element')  // Create ID for video
    //       console.log('DEMO VIDEO FOUND')
    //       this.getTime()
    //     }
    //   } else {
    //     console.log("DEMO VIDEO COULD NOT BE FOUND")
    //   }
    // },
  
    // /**
    //  * Retrieve the current timestamp of the video every 100ms (printed to console)
    //  * @return current video timestamp
    //  */
    // getTime() {
    //   const videoElement = document.getElementById('demo-video-element')
    //   let videoTime = videoElement.currentTime
    //   console.log(videoTime)
    //   setTimeout(this.getTime, 100);
    //   return videoTime
    // },

    // /**
    //  * Create an HTTP Request to post the current time to the server
    //  * @param {*} videoTime 
    //  */
    // sendHTTPRequest(videoTime) {
    //   const http = new XMLHttpRequest()
    //   const url = 'https://10.0.0.182/api/timestamps'
    //   const params = `time=${videoTime.toString()}`
    //   console.log(params)
    //   http.open('POST', url)
    //   http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  
    //   http.onreadystatechange = function () {
    //     if (http.readyState == 4 && http.status == 200) {
    //       console.log(http.responseText)
    //     }
    //   }
    //   http.send(params)
    // },
  })

