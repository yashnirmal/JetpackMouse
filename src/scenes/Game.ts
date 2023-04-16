import Phaser from 'phaser'
import AnimationKeys from '../consts/AnimationKeys'
import TextureKeys from '../consts/TextureKeys'
import RocketMouse from '../game/RocketMouse'

export default class Game extends Phaser.Scene{

	private background! : Phaser.GameObjects.TileSprite
	private mouseHole! : Phaser.GameObjects.Image
	private window1! : Phaser.GameObjects.Image
	private window2! : Phaser.GameObjects.Image
	private bookcase1! : Phaser.GameObjects.Image
	private bookcase2! : Phaser.GameObjects.Image
	private bookcases: Phaser.GameObjects.Image []
	private windows: Phaser.GameObjects.Image []

	constructor(){
		super()
	}

	preload(){
	}

	create(){

		//  game screen width and height
		const width = this.scale.width
		const height = this.scale.height

		//adding bg
		this.background = this.add.tileSprite(0,0,width,height,'background')
		.setOrigin(0)
		.setScrollFactor(0,0)

		//adding mouse hole
		this.mouseHole = this.add.image(
			Phaser.Math.Between(900,1500),
			501,
			TextureKeys.MouseHole)

		// adding windows
		this.window1 = this.add.image(
			Phaser.Math.Between(900,1300),
			200,
			TextureKeys.Window1
			)

		this.window2 = this.add.image(
			Phaser.Math.Between(1600,2000),
			200,
			TextureKeys.Window2
			)

		this.windows = [this.window1,this.window2]

		// adding bookcases
		this.bookcase1 = this.add.image(
			Phaser.Math.Between(2200,2700),
			580,
			TextureKeys.Bookcase1
			)
		.setOrigin(0.5,1)

		this.bookcase2 = this.add.image(
			Phaser.Math.Between(2900,3400),
			580,
			TextureKeys.Bookcase2
			)
		.setOrigin(0.5,1)

		this.bookcases = [this.bookcase1, this.bookcase2]

		// new rocket mouse
		const mouse = new RocketMouse(this,width*0.5,height-30)
		this.add.existing(mouse)

		mouse.body.setCollideWorldBounds(true)
		mouse.body.setBounce(1,0.3)
		mouse.body.setVelocity(200,0)

		this.cameras.main.startFollow(mouse.body)
		this.cameras.main.setBounds(0,0,Number.MAX_SAFE_INTEGER,height)

		this.physics.world.setBounds(0,0,Number.MAX_SAFE_INTEGER,height-30)
	}

	private wrapMouseHole(){
		const scrollX = this.cameras.main.scrollX
		const rightEdge = scrollX + this.scale.width

		if(this.mouseHole.x + this.mouseHole.width<scrollX){
			this.mouseHole.x = Phaser.Math.Between(
				rightEdge+100,
				rightEdge+1000
				)
		}
	}

	private wrapWindows(){
		const scrollX = this.cameras.main.scrollX 
		const rightEdge = scrollX + this.scale.width

		let width = this.window1.width * 2
		if(this.window1.x + width < scrollX){
			this.window1.x = Phaser.Math.Between(
				rightEdge+width,
				rightEdge+width+800
			)

			const overlap = this.bookcases.find(bc=>{
				return Math.abs(this.window1.x - bc.x)<= this.window1.width
			})

			this.window1.visible = !overlap
		}

		width = this.window2.width * 2
		if(this.window2.x + width < scrollX){
			this.window2.x = Phaser.Math.Between(
				this.window1.x+width,
				this.window1.x+width+800
			)

			const overlap = this.bookcases.find(bc=>{
				return Math.abs(this.window2.x - bc.x)<= this.window2.width
			})

			this.window2.visible = !overlap
		}
	}

	private wrapBookcases(){
		const scrollX = this.cameras.main.scrollX 
		const rightEdge = scrollX + this.scale.width

		let width = this.bookcase1.width * 2
		if(this.bookcase1.x + width < scrollX){
			this.bookcase1.x = Phaser.Math.Between(
				rightEdge+width,
				rightEdge+width+800
			)

			const overlap = this.windows.find(win=>{
				return Math.abs(this.bookcase1.x-win.x) <= win.width
			})

			this.bookcase1.visible = !overlap
		}

		width = this.bookcase2.width * 2
		if(this.bookcase2.x + width < scrollX){
			this.bookcase2.x = Phaser.Math.Between(
				this.bookcase1.x+width,
				this.bookcase1.x+width+800
			)

			const overlap = this.windows.find(win=>{
				return Math.abs(this.bookcase2.x - win.x)<= win.width
			})

			this.bookcase2.visible = !overlap
		}
	}

	update(t:number, dt:number){
		this.wrapMouseHole()
		this.wrapWindows()
		this.wrapBookcases()

		this.background.setTilePosition(this.cameras.main.scrollX)
	}
}