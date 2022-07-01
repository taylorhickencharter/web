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
      this.getVideoID = this.getVideoID.bind(this)
  
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
    },
  
    modelLoaded() {
      this.animationMixer = this.el.components['animation-mixer']
      // set the start time of the first play
      this.setStartTime()
      // set the start time on each loop
      this.el.addEventListener('animation-loop', this.setStartTime)
      // pause initially
      this.animationMixer.mixer.timeScale = 0
  
      this.getVideoID()
    },
  
    setStartTime() {
      this.animationMixer.mixer.setTime(this.data.startTime)
    },
  
    remove() {
      this.el.removeEventListener('model-loaded', this.modelLoaded)
      this.el.removeEventListener('animation-loop', this.setStartTime)
    },
  
    getVideoID() {
      const videoArr = document.getElementsByClassName('landing8-media-video')
      let arrLength = videoArr.length
      if (arrLength === 0) {
        setTimeout(this.getVideoID, 500)
        console.log('SEARCHING...')
      } else {
        videoArr[0].setAttribute('id', 'demo-video-element')  // Create ID for video
        console.log('DEMO VIDEO FOUND')
        this.getTime()
      }
    },
  
    getTime() {
      const videoElement = document.getElementById('demo-video-element')
      let videoTime = videoElement.currentTime
      console.log(videoTime)
      if (videoTime > 5 && videoTime < 10) {
        this.play()
      }
      setTimeout(this.getTime, 100)
      return videoTime
    },
  }