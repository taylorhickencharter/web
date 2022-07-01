// Control model attaching to marker
export const namedImageTargetComponent = {
    schema: {
      name: {type: 'string'},
    },
    init() {
      const {object3D} = this.el
      const {name} = this.data
      const geometry = {}
      object3D.visible = false
  
      const checkGeometry = (newGeometry) => {
        let needsUpdate = false
  
        const fields = [
          'type',
          'height',
          'radiusTop',
          'radiusBottom',
          'arcLengthRadians',
          'arcStartRadians',
          'scaledWidth',
          'scaledHeight',
        ]
        fields.forEach((f) => {
          if (geometry[f] !== newGeometry[f]) {
            geometry[f] = newGeometry[f]
            needsUpdate = true
          }
        })
  
        if (needsUpdate) {
          this.el.emit('xrextrasimagegeometry', geometry, false)
        }
      }
  
      const imageScanning = ({detail}) => {
        detail.imageTargets.forEach((t) => {
          if (name !== t.name) {
            return
          }
          checkGeometry({type: t.type, ...t.geometry})
        })
      }
  
      // Reposition image to match image target
      const updateImage = ({detail}) => {
        if (name !== detail.name) {
          return
        }
        object3D.position.copy(detail.position)
        object3D.quaternion.copy(detail.rotation)
        //object3D.scale.set(detail.scale, detail.scale, detail.scale)
        object3D.visible = true
  
      }
  
      // Display image once image target is found
      const showImage = ({detail}) => {
        if (name !== detail.name) {
          return
        }
        checkGeometry(detail)
        updateImage({detail})
        
        // Start video
        // const videoElement = document.getElementById('demo-video-element')
        // videoElement.play()
        
        this.el.emit('xrextrasfound', {}, false)
      }
  
      // Hide image if image target is lost
      const hideImage = ({detail}) => {
        if (name !== detail.name) {
          return
        }
        this.el.emit('xrextraslost', {}, false)
        object3D.visible = false
      }
  
      this.el.sceneEl.addEventListener('xrimagescanning', imageScanning)
      this.el.sceneEl.addEventListener('xrimagefound', showImage)
      this.el.sceneEl.addEventListener('xrimageupdated', updateImage)
      //this.el.sceneEl.addEventListener('xrimagelost', hideImage)
    },
  }