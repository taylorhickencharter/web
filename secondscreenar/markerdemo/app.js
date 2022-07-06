delete AFRAME.components['xrextras-named-image-target']

import {namedImageTargetComponent} from './my-named-target.js'
AFRAME.registerComponent('xrextras-named-image-target', namedImageTargetComponent)

import {animationManagerComponent} from './animation-manager.js'
AFRAME.registerComponent('animation-manager', animationManagerComponent)