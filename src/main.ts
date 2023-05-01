import Phaser from 'phaser'
import Game from './scenes/Game'
import Preloader from './scenes/Preloader'
import SceneKeys from './consts/SceneKeys'
import GameOver from './scenes/GameOver'

const config : Phaser.Types.Core.GameConfig = {
	type:Phaser.AUTO,
	width:800,
	height:640,
	backgroundColor:'#252525', 
	physics:{
		default:'arcade',
		arcade:{
			gravity : { y:500},
			// debug:true
		},

	},
	// scene:[Preloader,Game]
}

var game = new Phaser.Game(config)

game.scene.add(SceneKeys.Game,Game)
game.scene.add(SceneKeys.Preloader,Preloader)
game.scene.add(SceneKeys.GameOver,GameOver)
game.scene.start('preloader')

