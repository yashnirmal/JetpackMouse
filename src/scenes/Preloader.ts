import Phaser from 'phaser'
import TextureKeys from '../consts/TextureKeys'
import AnimationKeys from '../consts/AnimationKeys'

export default class Preloader extends Phaser.Scene{
	constructor(){
		super('preloader')
	}

	preload(){
		// loading background
		this.load.image(TextureKeys.Background,'/Background/bg_repeat_340x640.png')

		// adding mouse atlas/sprite
		this.load.atlas(
			TextureKeys.RocketMouse,
			'character/rocket-mouse.png',
			'character/rocket-mouse.json'
			)

		// loading mouse hole
		this.load.image(TextureKeys.MouseHole,'/Objects/object_mousehole.png')

		// loading windows
		this.load.image(TextureKeys.Window1,'/Objects/object_window1.png')
		this.load.image(TextureKeys.Window2,'/Objects/object_window2.png')

		// loading bookcases
		this.load.image(TextureKeys.Bookcase1,'/Objects/object_bookcase1.png')
		this.load.image(TextureKeys.Bookcase2,'/Objects/object_bookcase2.png')
	}

	create(){

		//creating run animation
		this.anims.create({
			key:AnimationKeys.RocketMouseRun,
			frames:this.anims.generateFrameNames('rocket-mouse',{
				start:1,
				end:4,
				prefix:'rocketmouse_run',
				zeroPad:2,
				suffix:'.png'
			}),
			frameRate:10,
			repeat: -1 // -1 to never loop
		})

		// creating rocket flames animation
		this.anims.create({
			key:AnimationKeys.RocketFlamesOn,
			frames: this.anims.generateFrameNames(TextureKeys.RocketMouse,
				{start:1,end:2,prefix:'flame',suffix:'.png'}),
				frameRate:10,
				repeat:-1
			})

		// creating fall animation
		this.anims.create({
			key:AnimationKeys.RocketMouseFall,
			frames:[{
				key:TextureKeys.RocketMouse,
				frame:'rocketmouse_fall01.png'
				}]
			})

		// creating fly animation
		this.anims.create({
			key:AnimationKeys.RocketMouseFly,
			frames:[{
				key:TextureKeys.RocketMouse,
				frame:'rocketmouse_fly01.png'
				}]
			})


		//starting game scene
		this.scene.start('game')
	}
}