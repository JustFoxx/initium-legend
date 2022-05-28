let max_timer = 200 //measured in ticks(1 second is 20 ticks)[this var applies to everyone]

//runs every player tick
onEvent('player.tick', event => {
	//packs the whole code into a function with 2 variables(dim_name and stab_list)
	function StabilizerLogic(dim_name, stab_list){
		//checks if the entity is player and if they are in the correct dimension 
		if (event.entity.type == "minecraft:player" && dim_name) {
			//checks if the variable stab_timer is less than 1, if it is, makes it one, if it isn't adds 1 and a random number between 0 and 5
			if (event.player.persistentData.stab_timer < 1) {
				event.player.persistentData.stab_timer = 1
			} else {
				event.player.persistentData.stab_timer += 1 + (Math.random() * 5)
			}
			if (event.player.persistentData.tp_count < 1) {
				event.player.persistentData.tp_count = 1
			}
			//checks if stab_timer is greater than max_timer
			if (event.player.persistentData.stab_timer >= max_timer) {
				//gives player slowness effect with a random time and creates a variable 'i'
				event.server.runCommandSilent('effect give '+ event.player.name +' minecraft:slowness '+ Math.round(Math.random() * 20 + 5) +' 2 true')
				event.player.persistentData.i = 0
				//loops 16 times, or 'i' is greater than 15. Adds 1 for every step
				for (; event.player.persistentData.i < 15; event.player.persistentData.i++) {
					//Creates an unstable variant of player's coordinate 'x'. Has 50% to add a number between 0 and 4, and 50% to subtract a number between 0 and 4
					if (Math.random() >= 0.5) {
						event.player.persistentData.unstable_x = event.player.x + (Math.random() * 4)
					} else {
						event.player.persistentData.unstable_x = event.player.x - (Math.random() * 4)
					}
					//Creates an unstable variant of player's coordinate 'y'. Has 50% to add a number between 0 and 1, and 50% to subtract a number between 0 and 1
					if (Math.random() >= 0.5) {
						event.player.persistentData.unstable_y = event.player.y + Math.random()
					} else {
						event.player.persistentData.unstable_y = event.player.y - Math.random()
					}
					//Creates an unstable variant of player's coordinate 'z'. Has 50% to add a number between 0 and 4, and 50% to subtract a number between 0 and 4
					if (Math.random() >= 0.5) {
						event.player.persistentData.unstable_z = event.player.z + (Math.random() * 4)
					} else {
						event.player.persistentData.unstable_z = event.player.z - (Math.random() * 4)
					}
					//checks if unstable coordinates are:
					//air block
					//air block
					//not an air block
					if (event.level.getBlock(event.player.persistentData.unstable_x, event.player.persistentData.unstable_y, event.player.persistentData.unstable_z) != "minecraft:air" && event.level.getBlock(event.player.persistentData.unstable_x, (event.player.persistentData.unstable_y + 1), event.player.persistentData.unstable_z) == "minecraft:air" && event.level.getBlock(event.player.persistentData.unstable_x, (event.player.persistentData.unstable_y + 2), event.player.persistentData.unstable_z) == "minecraft:air") {
						//teleports player to unstable coords with sounds and particles
						event.server.runCommandSilent('execute as '+ event.player.name +' at '+ event.player.name +' run particle minecraft:reverse_portal ~ ~ ~ 1 1 1 0.01 250 normal')
						event.server.runCommandSilent('execute as '+ event.player.name +' at '+ event.player.name +' run tp '+ event.player.name +' '+ event.player.persistentData.unstable_x +' '+ (Math.ceil(event.player.persistentData.unstable_y)) +' '+ event.player.persistentData.unstable_z)
						event.server.runCommandSilent('execute as '+ event.player.name +' at '+ event.player.name +' run playsound minecraft:block.respawn_anchor.deplete player '+ event.player.name +' ~ ~ ~')
						//makes stab_timer to 0, adds 1 to tp_count and makes i 15.
						event.player.persistentData.stab_timer = 0
						event.player.persistentData.tp_count += 1
						event.player.persistentData.i = 15
					}
				}
			}
			//checks if the tp_count is equal or greater than 6
			if (event.player.persistentData.tp_count >= 6) {
				//teleports player to the void with sounds and particles
				event.server.runCommandSilent('execute as '+ event.player.name +' at '+ event.player.name +' run particle minecraft:squid_ink ~ ~ ~ 1 1 1 0.01 250 normal')
				event.server.runCommandSilent('execute as '+ event.player.name +' at '+ event.player.name +' run tp '+ event.player.name +' ~ -64 ~')
				event.server.runCommandSilent('execute as '+ event.player.name +' at '+ event.player.name +' run playsound minecraft:block.end_portal.spawn player '+ event.player.name +' ~ ~ ~')
				//makes stab_timer to 0 and tp_count to 0
				event.player.persistentData.stab_timer = 0
				event.player.persistentData.tp_count = 0
			}
		}
		//checks if the player is in the correct dimension and has one of the correct stabilizers
		if (event.entity.type == "minecraft:player" && dim_name && stab_list) {
			//sets stab_timer to 0
			event.player.persistentData.stab_timer = 0
			event.player.persistentData.tp_count = 0
		}
	}

	//bumblezone(function version)
	StabilizerLogic(event.level.dimension == "the_bumblezone:the_bumblezone", (event.player.inventory.count('kubejs:stabilizer_overworld') != 0 || event.player.inventory.count('kubejs:stabilizer_bumblezone') != 0 || event.player.inventory.count('kubejs:stabilizer_nether') != 0 || event.player.inventory.count('kubejs:stabilizer_doors') != 0 || event.player.inventory.count('kubejs:stabilizer_aether') != 0 || event.player.inventory.count('kubejs:stabilizer_end') != 0))
	
	//nether (function version)
	StabilizerLogic(event.level.dimension == "minecraft:the_nether", (event.player.inventory.count('kubejs:stabilizer_bumblezone') != 0 || event.player.inventory.count('kubejs:stabilizer_nether') != 0 || event.player.inventory.count('kubejs:stabilizer_doors') != 0 || event.player.inventory.count('kubejs:stabilizer_aether') != 0 || event.player.inventory.count('kubejs:stabilizer_end') != 0))
	
	//doors (function version)
	StabilizerLogic((event.level.dimension == "dimdoors:dungeon_pockets" || event.level.dimension == "dimdoors:public_pockets" || event.level.dimension == "dimdoors:personal_pockets" || event.level.dimension == "dimdoors:limbo"), (event.player.inventory.count('kubejs:stabilizer_nether') != 0 || event.player.inventory.count('kubejs:stabilizer_doors') != 0 || event.player.inventory.count('kubejs:stabilizer_aether') != 0 || event.player.inventory.count('kubejs:stabilizer_end') != 0))
	
	//aether (function version)
	StabilizerLogic(event.level.dimension == "the_aether:the_aether", (event.player.inventory.count('kubejs:stabilizer_doors') != 0 || event.player.inventory.count('kubejs:stabilizer_aether') != 0 || event.player.inventory.count('kubejs:stabilizer_end') != 0))
	
	//end (function version)
	StabilizerLogic(event.level.dimension == "minecraft:the_end", (event.player.inventory.count('kubejs:stabilizer_aether') != 0 || event.player.inventory.count('kubejs:stabilizer_end') != 0))
	
})