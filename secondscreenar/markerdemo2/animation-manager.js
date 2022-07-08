AFRAME.registerComponent('animation-manager', {
    schema: {
      // in seconds
      startTime: {default: 0},
    },
    init() {
      // bind the methods
      this.modelLoaded = this.modelLoaded.bind(this)
      this.setStartTime = this.setStartTime.bind(this)
      // this.sendHTTPRequest = this.sendHTTPRequest.bind(this)
      // wait until the model is ready
      this.el.addEventListener('model-loaded', this.modelLoaded)
    },
  
    modelLoaded() {
      this.animationMixer = this.el.components['animation-mixer']
      // set the start time of the first play
      this.setStartTime();
      // set the start time on each loop
      this.el.addEventListener('animation-loop', this.setStartTime);
      // pause initially
      this.animationMixer.mixer.timeScale = 0
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

