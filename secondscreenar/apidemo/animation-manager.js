export const animationManagerComponent = {
    schema: {
      // in seconds
      startTime: {default: 0},
    },
    init() {
      // bind the methods
      this.modelLoaded = this.modelLoaded.bind(this)
      this.setStartTime = this.setStartTime.bind(this)
      this.getTime = this.getTime.bind(this)
      this.initVideoID = this.initVideoID.bind(this)
      this.sendHTTPRequest = this.sendHTTPRequest.bind(this)
  
      // wait until the model is ready
      this.el.addEventListener('model-loaded', this.modelLoaded)
  
      // Create button functionality
      const play = () => {
        console.log('play()', this.el.id)
        this.animationMixer.mixer.timeScale = 1
      }
      const pause = () => {
        console.log('pause()', this.el.id)
        this.animationMixer.mixer.timeScale = 0
      }
  
      this.numSearches = 0;
    },
  
    modelLoaded() {
      console.log(this.el.id, 'loaded')
      this.animationMixer = this.el.components['animation-mixer']
      // set the start time of the first play
      this.setStartTime()
      // set the start time on each loop
      this.el.addEventListener('animation-loop', this.setStartTime)
      // pause initially
      this.animationMixer.mixer.timeScale = 0
  
      this.initVideoID()
    },
  
    // Set the frame at which the model begins animating
    setStartTime() {
      this.animationMixer.mixer.setTime(this.data.startTime)
    },
  
    remove() {
      this.el.removeEventListener('model-loaded', this.modelLoaded)
      this.el.removeEventListener('animation-loop', this.setStartTime)
    },
  
    // Find the video by class name then assign it an ID
    initVideoID() {
      const videoArr = document.getElementsByClassName('landing8-media-video')
      const arrLength = videoArr.length
      if(this.numSearches < 5) {
        if (arrLength === 0) {
          this.numSearches++
          setTimeout(this.initVideoID, 500)
          console.log('SEARCHING...')
        } else {
          videoArr[0].setAttribute('id', 'demo-element')  // Create ID for video
          console.log('DEMO VIDEO FOUND')
          this.getTime()
        }
      }
    },
  
    // Retrieve the video timestamp every 100ms
    getTime() {
      const element = document.getElementById('demo-element')
      const videoTime = element.currentTime
      setTimeout(this.getTime, 100)
      console.log(videoTime)
    },
  
    sendHTTPRequest(videoTime) {
      const http = new XMLHttpRequest()
      const url = 'http://localhost:8080/api/timestamps/1'
      const params = `time=${videoTime.toString()}`
      console.log(params)
      http.open('PUT', url)
      http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  
      http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
          console.log(http.responseText)
        }
      }
      http.send(params)
    },
  }