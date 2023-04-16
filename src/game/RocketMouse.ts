import Phaser from 'phaser';
import AnimationKeys from '../consts/AnimationKeys';
import TextureKeys from '../consts/TextureKeys';

export default class RocketMouse extends Phaser.GameObjects.Container{

	private flames: Phaser.GameObjects.Sprite
	private mouse: Phaser.GameObjects.Sprite
	private cursors:Phaser.Types.Input.Keyboard.CursorKeys | undefined

	constructor(scene:Phaser.Scene, x:number, y:number){
		super(scene,x,y)

		// create rocket mouser sprite
		this.mouse = scene.add.sprite(0,0,TextureKeys.RocketMouse)
		.setOrigin(0.5,1)
		.play(AnimationKeys.RocketMouseRun)

		this.flames = scene.add.sprite(-63,-15,TextureKeys.RocketMouse)
		.play(AnimationKeys.RocketFlamesOn)
		this.enableJetPack(false)

		// add as child in COntainer
		this.add(this.flames)
		this.add(this.mouse)

		// adding physics
		scene.physics.add.existing(this)

		// adjusting physics bodysize and offset
		const body = this.body as Phaser.Physics.Arcade.Body
		body.setSize(this.mouse.width,this.mouse.height)
		body.setOffset(this.mouse.width*-0.5,-this.mouse.height)


		// getting cursors
		this.cursors = scene?.input?.keyboard?.createCursorKeys()
	}


	preUpdate(){
		const body = this.body as Phaser.Physics.Arcade.Body

		// spacebar press
		if(this.cursors?.space?.isDown){
			body.setAccelerationY(-600)
			this.enableJetPack(true)
			this.mouse.play(AnimationKeys.RocketMouseFly,true)
		}
		else{
			body.setAccelerationY(0)
			this.enableJetPack(false)
		}

		// mouse toching the ground
		if(body.blocked.down){
			this.mouse.play(AnimationKeys.RocketMouseRun,true)
		}
		else if(body.velocity.y>0){
			this.mouse.play(AnimationKeys.RocketMouseFall,true)
		}

	}

	enableJetPack(enabled:boolean){
		this.flames.setVisible(enabled)
	}
}
