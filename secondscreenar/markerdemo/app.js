delete AFRAME.components['xrextras-named-image-target']

import {namedImageTargetComponent} from './my-named-target'
AFRAME.registerComponent('xrextras-named-image-target', namedImageTargetComponent)

import {animationManagerComponent} from './animation-manager'
AFRAME.registerComponent('animation-manager', animationManagerComponent)