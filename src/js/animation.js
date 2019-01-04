import TweenMax from 'gsap/TweenMax'
import Splitting from './splitting'

const dva = {
  main: '.dva',
  eyeWrapper: '.eyes',
  noseWrapper: '.nose-wrapper',
  mouthWrapper: '.mouth-wrapper',
  earWrapper: '.ears',
  head: '.head',
  face: '.face',
  mouth: '.mouth',
  nose: '.nose',
  ears: {
    l: '.ear--l',
    r: '.ear--r'
  },
  eyes: {
    l: '.eye--l',
    r: '.eye--r',
    lb: '.eye--l .brow',
    rb: '.eye--r .brow',
    lp: '.eye--l .pupil',
    rp: '.eye--r .pupil'
  },
  title: {
    nerfText: '.title .nerf',
    thisText: '.title .this',
    nerfChars: '.title .nerf .char',
    thisChars: '.title .this .char',
    lineTop: '.title .line__top',
    lineBottom: '.title .line__bottom'
  }
}

// master timeline
const master = new TimelineMax({
  delay: 0.5,
  repeat: -1,
  repeatDelay: 0.5,
  yoyo: true
})

TweenMax.set(dva.main, { autoAlpha: 0, scale: 0 })
TweenMax.set(dva.head, { xPercent: 0, transformOrigin: 'center' })
TweenMax.set(dva.face, { xPercent: 0, transformOrigin: 'top center' })
TweenMax.set(dva.earWrapper, { xPercent: 0, skewX: 0, scaleY: -0.25 })
TweenMax.set(dva.title.nerfText, { autoAlpha: 0, yPercent: -60 })
TweenMax.set(dva.title.thisText, { autoAlpha: 0, yPercent: 60 })
TweenMax.set([dva.title.nerfChars, dva.title.thisChars], { rotationX: 0, scale: 1 })
TweenMax.set([dva.title.lineTop, dva.title.lineBottom], { scaleX: 0, autoAlpha: 0 })

function InitialLoadIn() {
  const tl = new TimelineMax()
  tl.to(dva.main, 0.35, {
    autoAlpha: 1,
    scale: 1,
    ease: Back.easeOut
  })
  return tl
}

function EarsUp() {
  const tl = new TimelineMax()
  tl.to(dva.earWrapper, 0.35, {
    scaleY: 1,
    ease: Back.easeOut
  })
  return tl
}

function BlinkyEyes() {
  const tl = new TimelineMax()
  tl.to([ dva.eyes.lp, dva.eyes.rp ], 0.15, {
    scaleY: 0,
    repeat: 3,
    yoyo: true,
    transformOrigin: 'center',
    ease: Power4.easeInOut
  })
  return tl
}

function LookAround() {
  const tl = new TimelineMax()
  const ease = Back.easeInOut
  tl.add('look')

  tl.fromTo(dva.face, 0.5,
    { xPercent: 10, ease: ease },
    { xPercent: -10, ease: ease },
    'look'
  )

  tl.fromTo(dva.earWrapper, 0.5,
    { skewX: 10, xPercent: 8, ease: ease },
    { skewX: -10, xPercent: -8, ease: ease },
    'look'
  )

  tl.fromTo(dva.head, 0.5,
    { xPercent: 10, ease: ease },
    { xPercent: -10, ease: ease },
    'look'
  )

  return tl
}

function LookAroundReset() {
  const tl = new TimelineMax()
  const ease = Back.easeInOut
  tl.add('lookReset')

  tl.to(dva.face, 0.5,
    { xPercent: 0, ease: ease },
    'lookReset'
  )

  tl.to(dva.earWrapper, 0.5,
    { skewX: 0, xPercent: 0, ease: ease },
    'lookReset'
  )

  tl.to(dva.head, 0.5,
    { xPercent: 0, ease: ease },
    'lookReset'
  )

  return tl
}

function NerfThis() {
  const tl = new TimelineMax()
  const ease = Elastic.easeInOut
  
  tl.to( dva.title.nerfText, 0.8, {
    yPercent: 0,
    autoAlpha: 1,
    ease: ease
  }, 0.8)

  tl.to( dva.title.thisText, 0.8, {
    yPercent: 0,
    autoAlpha: 1,
    ease: ease
  }, 0.8)

  return tl
}

function Lines() {
  const tl = new TimelineMax()

  tl.to( [dva.title.lineTop, dva.title.lineBottom], 0.35, {
    scaleX: 1,
    autoAlpha: 1,
    ease: Back.easeInOut
  }, 0.8)

  return tl
}

function SpinningLetters() {
  const tl = new TimelineMax()
  const dur = 0.35
  const ease = Power0.easeInOut

  tl.staggerTo( dva.title.nerfChars, dur, {
    rotationX: 360,
    scale: 1.05,
    ease: ease
  }, 0.2)

  tl.staggerTo( dva.title.thisChars, dur, {
    rotationX: 360,
    scale: 1.05,
    ease: ease
  }, -0.2)

  return tl
}

function init() {
  master.add( InitialLoadIn() )
  master.add( BlinkyEyes() )
  master.add( EarsUp(), '-=0.35' )
  master.add( LookAround() )
  master.add( LookAroundReset() )
  master.add( BlinkyEyes() )
  master.add( NerfThis(), '-=0.5' )
  master.add( Lines(), '-=1' )
  master.add( SpinningLetters() )
}

// setup Splitting for "Nerf This!" text
Splitting()

// launch animation!
init()